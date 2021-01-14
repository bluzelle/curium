package ante

import (
	"github.com/bluzelle/curium/x/tax"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bank "github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/gov/types"
)




type TaxDecorator struct {
	ak           keeper.AccountKeeper
	bk           bank.Keeper
	tk           tax.Keeper
	supplyKeeper types.SupplyKeeper
}

func NewTaxDecorator(ak keeper.AccountKeeper, sk types.SupplyKeeper, tk tax.Keeper, bk bank.Keeper) TaxDecorator {
	return TaxDecorator{
		ak:           ak,
		supplyKeeper: sk,
		tk:           tk,
		bk:           bk,
	}
}

// FeeTx defines the interface to be implemented by Tx to use the FeeDecorators
type FeeTx interface {
	sdk.Tx
	GetGas() uint64
	GetFee() sdk.Coins
	FeePayer() sdk.AccAddress
}

func (td TaxDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {

	if !simulate {

		feeTx, ok := tx.(FeeTx)
		if !ok {
			return ctx, sdkerrors.Wrap(sdkerrors.ErrTxDecode, "Tx must be a FeeTx")
		}

		taxInfo := td.tk.GetTaxInfo(ctx)

		feePayer := feeTx.FeePayer()
		feePayerAcc := td.ak.GetAccount(ctx, feePayer)

		if feePayerAcc == nil {
			return ctx, sdkerrors.Wrapf(sdkerrors.ErrUnknownAddress, "fee payer address: %s does not exist", feePayer)
		}

		if err := collectTransactionTax(ctx, td, tx, feeTx.GetFee(), feePayer); err != nil {
			return ctx, err
		}

		if err := collectFeeTax(ctx, td.supplyKeeper, taxInfo.Collector, feeTx.GetFee(), taxInfo.FeeBp); err != nil {
			return ctx, err
		}
	}
	return next(ctx, tx, simulate)
}


func collectTransactionTax(ctx sdk.Context, dfd TaxDecorator, tx sdk.Tx, fees sdk.Coins, feePayer sdk.AccAddress) error {

	// deduct the fees
	if !fees.IsZero() {
		taxInfo := dfd.tk.GetTaxInfo(ctx)

		// handle bank send tx fee
		msgs := tx.GetMsgs()
		for _, msg := range msgs {
			if msg.Type() == "send" {
				bankmsg := msg.(bank.MsgSend)
				trfFees := sdk.Coins{}
				for _, coin := range bankmsg.Amount {
					feeAmt := coin.Amount.Int64() * taxInfo.TransferBp / 10000
					if feeAmt > 0 {
						trfFee := sdk.NewInt64Coin(coin.Denom, feeAmt)
						trfFees = append(trfFees, trfFee)
					}
				}

				if len(trfFees) > 0 {
					if err := dfd.bk.SendCoins(ctx, feePayer, taxInfo.Collector, trfFees); err != nil {
						return err
					}
				}
			}
		}

	}
	return nil

}


func collectFeeTax( ctx sdk.Context, supplyKeeper types.SupplyKeeper, taxCollectorAcc sdk.AccAddress, fees sdk.Coins, feebp int64) error {

	if !fees.IsValid() {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "invalid fee amount: %s", fees)
	}

	taxFees := sdk.Coins{}
	for _, fee := range fees {
		feeAmt := fee.Amount.Int64() * feebp / 10000

		if feeAmt > 0 {
			taxFee := sdk.NewInt64Coin(fee.Denom, feeAmt)
			taxFees = append(taxFees, taxFee)
		}
	}

	if !taxFees.Empty() {
		err := supplyKeeper.SendCoinsFromModuleToAccount(ctx, authtypes.FeeCollectorName, taxCollectorAcc, taxFees)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}
	}

	return nil
}
