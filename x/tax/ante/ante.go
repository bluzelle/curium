package ante

import (
	"github.com/bluzelle/curium/x/tax"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/cosmos/cosmos-sdk/x/auth/exported"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/gov/types"
)

func NewAnteHandler(
	ak keeper.AccountKeeper,
	supplyKeeper types.SupplyKeeper,
	tk tax.Keeper,
	sigGasConsumer ante.SignatureVerificationGasConsumer,
) sdk.AnteHandler {
	return sdk.ChainAnteDecorators(
		ante.NewSetUpContextDecorator(), // outermost AnteDecorator. SetUpContext must be called first
		ante.NewMempoolFeeDecorator(),
		ante.NewValidateBasicDecorator(),
		ante.NewValidateMemoDecorator(ak),
		ante.NewConsumeGasForTxSizeDecorator(ak),
		ante.NewSetPubKeyDecorator(ak), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(ak),
		ante.NewDeductFeeDecorator(ak, supplyKeeper),
		NewDeductFeeDecorator(ak, supplyKeeper, tk),
		ante.NewSigGasConsumeDecorator(ak, sigGasConsumer),
		ante.NewSigVerificationDecorator(ak),
		ante.NewIncrementSequenceDecorator(ak), // innermost AnteDecorator
	)
}

type DeductFeeDecorator struct {
	ak           keeper.AccountKeeper
	tk           tax.Keeper
	supplyKeeper types.SupplyKeeper
}

func NewDeductFeeDecorator(ak keeper.AccountKeeper, sk types.SupplyKeeper, tk tax.Keeper) DeductFeeDecorator {
	return DeductFeeDecorator{
		ak:           ak,
		supplyKeeper: sk,
		tk:           tk,
	}
}

// FeeTx defines the interface to be implemented by Tx to use the FeeDecorators
type FeeTx interface {
	sdk.Tx
	GetGas() uint64
	GetFee() sdk.Coins
	FeePayer() sdk.AccAddress
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
		taxInfo := dfd.tk.GetTaxInfo(ctx)
		err = deductFees(dfd.supplyKeeper, ctx, feePayerAcc, taxInfo.Collector, feeTx.GetFee(), taxInfo.FeeBp)
		if err != nil {
			return ctx, err
		}
	}

	return next(ctx, tx, simulate)
}

func deductFees(supplyKeeper types.SupplyKeeper, ctx sdk.Context, acc exported.Account, toAcc sdk.AccAddress, fees sdk.Coins, tax int64) error {
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

	taxFees := sdk.Coins{}
	for _, fee := range fees {
		taxFee := sdk.NewInt64Coin(fee.Denom, fee.Amount.Int64()*tax/10000)
		taxFees = append(taxFees, taxFee)
	}

	if _, hasNeg := spendableCoins.SafeSub(taxFees); hasNeg {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds,
			"insufficient funds to pay for utility fees; %s < %s", spendableCoins, taxFees)
	}

	err := supplyKeeper.SendCoinsFromAccountToModule(ctx, acc.GetAddress(), authtypes.FeeCollectorName, fees)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
	}

	err = supplyKeeper.SendCoinsFromModuleToAccount(ctx, authtypes.FeeCollectorName, toAcc, taxFees)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
	}

	return nil
}
