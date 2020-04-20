// Copyright (C) 2020 Bluzelle
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License, version 3,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

package utilityfee

import (
	"encoding/json"
	"fmt"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/exported"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	"github.com/gorilla/mux"
	"github.com/spf13/cobra"
	abci "github.com/tendermint/tendermint/abci/types"
	"strconv"
)

var (
	ModuleName                       = "utilityfee"
	_          module.AppModule      = AppModule{}
	_          module.AppModuleBasic = AppModuleBasic{}
	_          FeeTx                 = (*types.StdTx)(nil) // assert StdTx implements FeeTx
)

const FeeDenom = "ubnt"

type UtilityFee struct {
	Tax           string `json:"tax"`
	AccountNumber string `json:"account_number"`
}

// FeeTx defines the interface to be implemented by Tx to use the FeeDecorators
type FeeTx interface {
	sdk.Tx
	GetGas() uint64
	GetFee() sdk.Coins
	FeePayer() sdk.AccAddress
}

// DeductFeeDecorator deducts fees from the first signer of the tx
// If the first signer does not have the funds to pay for the fees, return with InsufficientFunds error
// Call next AnteHandler if fees successfully deducted
// CONTRACT: Tx must implement FeeTx interface to use DeductFeeDecorator
type DeductFeeDecorator struct {
	bk           bank.Keeper
	ak           keeper.AccountKeeper
	supplyKeeper types.SupplyKeeper
	utilityAddr  sdk.AccAddress
	tax          float64
}

type AppModuleBasic struct{}

func (AppModuleBasic) Name() string {
	return ModuleName
}

func (AppModuleBasic) RegisterCodec(cdc *codec.Codec) {
}

func (AppModuleBasic) DefaultGenesis() json.RawMessage {
	return codec.New().MustMarshalJSON(UtilityFee{
		Tax:           "0.5",
		AccountNumber: "1",
	})
}

func (AppModuleBasic) ValidateGenesis(bz json.RawMessage) error {
	return nil
}

func (AppModuleBasic) RegisterRESTRoutes(ctx context.CLIContext, rtr *mux.Router) {
}

func (AppModuleBasic) GetQueryCmd(cdc *codec.Codec) *cobra.Command {
	return nil
}

func (AppModuleBasic) GetTxCmd(cdc *codec.Codec) *cobra.Command {
	return nil
}

type AppModule struct {
	AppModuleBasic
}

func NewAppModule() AppModule {
	return AppModule{
		AppModuleBasic: AppModuleBasic{},
	}
}

func (AppModule) Name() string {
	return ModuleName
}

func (am AppModule) RegisterInvariants(_ sdk.InvariantRegistry) {}

func (am AppModule) Route() string {
	return ModuleName
}

func (am AppModule) NewHandler() sdk.Handler {
	return nil
}

func (am AppModule) QuerierRoute() string {
	return ModuleName
}

func (am AppModule) NewQuerierHandler() sdk.Querier {
	return nil
}

func (am AppModule) BeginBlock(_ sdk.Context, _ abci.RequestBeginBlock) {}

func (am AppModule) EndBlock(sdk.Context, abci.RequestEndBlock) []abci.ValidatorUpdate {
	return []abci.ValidatorUpdate{}
}

func (am AppModule) InitGenesis(ctx sdk.Context, data json.RawMessage) []abci.ValidatorUpdate {
	return nil
}

func (am AppModule) ExportGenesis(ctx sdk.Context) json.RawMessage {
	return nil
}

func getUtilityTax(genFile string) (float64, sdk.AccAddress) {
	cdc := codec.New()
	appState, _, err := genutil.GenesisStateFromGenFile(cdc, genFile)
	if err != nil {
		panic(fmt.Sprintf("%s does not exist, run `init` first", genFile))
	}

	var ut UtilityFee
	if err := json.Unmarshal([]byte(appState["utilityfee"]), &ut); err != nil {
		panic(err.Error())
	}

	tax, err := strconv.ParseFloat(ut.Tax, 64)
	if err != nil {
		panic(err.Error())
	}

	accountNumber, err := strconv.ParseUint(ut.AccountNumber, 10, 64)
	if err != nil {
		panic(err.Error())
	}

	// find address...
	auth.RegisterCodec(cdc)
	authGenState := auth.GetGenesisStateFromAppState(cdc, appState)

	var ac sdk.AccAddress
	for i := range authGenState.Accounts[:] {
		if authGenState.Accounts[i].GetAccountNumber() == accountNumber {
			ac = authGenState.Accounts[i].GetAddress()
		}
	}

	if ac == nil {
		panic(fmt.Sprintf("genesis account number %d does not exist", accountNumber))
	}

	return tax, ac
}

///////////////////////////////////////////////////////////////////////////////

func NewDeductFeeDecorator(bk bank.Keeper, ak keeper.AccountKeeper, sk types.SupplyKeeper, genFile string) DeductFeeDecorator {
	tax, ua := getUtilityTax(genFile)
	return DeductFeeDecorator{
		bk:           bk,
		ak:           ak,
		supplyKeeper: sk,
		utilityAddr:  ua,
		tax:          tax,
	}
}

func (dfd DeductFeeDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	feeTx, ok := tx.(FeeTx)
	if !ok {
		return ctx, sdkerrors.Wrap(sdkerrors.ErrTxDecode, "Tx must be a FeeTx")
	}

	feePayer := feeTx.FeePayer()
	feePayerAcc := dfd.ak.GetAccount(ctx, feePayer)

	if feePayerAcc == nil {
		return ctx, sdkerrors.Wrapf(sdkerrors.ErrUnknownAddress, "fee payer address: %s does not exist", feePayer)
	}

	// deduct the fees
	if !feeTx.GetFee().IsZero() {
		err = DeductFees(dfd.supplyKeeper, dfd.bk, ctx, feePayerAcc, dfd.utilityAddr, feeTx.GetFee(), dfd.tax)
		if err != nil {
			return ctx, err
		}
	}

	return next(ctx, tx, simulate)
}

// DeductFees deducts fees from the given account.
func DeductFees(supplyKeeper types.SupplyKeeper, bk bank.Keeper, ctx sdk.Context, acc exported.Account, toAcc sdk.AccAddress, fees sdk.Coins, tax float64) error {
	blockTime := ctx.BlockHeader().Time
	coins := acc.GetCoins()

	if !fees.IsValid() {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "invalid fee amount: %s", fees)
	}

	// verify the account has enough funds to pay for fees
	_, hasNeg := coins.SafeSub(fees)
	if hasNeg {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds,
			"insufficient funds to pay for fees; %s < %s", coins, fees)
	}

	// Validate the account has enough "spendable" coins...
	spendableCoins := acc.SpendableCoins(blockTime)

	utilityFee := int64(tax * 0.01 * float64(fees.AmountOf(FeeDenom).Int64()))
	utilityCoins := sdk.NewCoins(sdk.NewCoin(FeeDenom, sdk.NewInt(utilityFee)))

	if _, hasNeg := spendableCoins.SafeSub(utilityCoins); hasNeg {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds,
			"insufficient funds to pay for utility fees; %s < %s", spendableCoins, utilityCoins)
	}

	err := bk.SendCoins(ctx, acc.GetAddress(), toAcc, utilityCoins)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
	}

	return nil
}
