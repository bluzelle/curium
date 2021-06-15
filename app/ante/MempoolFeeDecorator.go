package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

type MempoolFeeDecorator struct{}

func NewMempoolFeeDecorator() MempoolFeeDecorator {
	return MempoolFeeDecorator{}
}

func (mfd MempoolFeeDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	feeTx, ok := tx.(sdk.FeeTx)
	if !ok {
		return ctx, sdkerrors.Wrap(sdkerrors.ErrTxDecode, "Tx must be a FeeTx")
	}

	feeCoins := feeTx.GetFee()
	gas := feeTx.GetGas()

	// Ensure that the provided fees meet a minimum threshold for the validator,
	// if this is a CheckTx. This is only for local mempool purposes, and thus
	// is only ran on check tx.
	if ctx.IsCheckTx() && !simulate {
		specifiedGasPrice := sdk.NewDecCoinsFromCoins(feeCoins[0]).QuoDec(sdk.NewDec(int64(gas)))[0]
		minGasPrice := ctx.MinGasPrices()[0]

		if specifiedGasPrice.IsLT(minGasPrice) {
			return ctx, sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "gas price too low; got: %s required: %s", specifiedGasPrice, minGasPrice)
		}

		if gas == 0 {
			return ctx, sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "max gas cannot be 0")
		}

	}

	return next(ctx, tx, simulate)
}
