package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/cosmos/cosmos-sdk/x/auth/exported"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/gov/types"
)

func NewAnteHandler(bk bank.Keeper, ak keeper.AccountKeeper, supplyKeeper types.SupplyKeeper, sigGasConsumer ante.SignatureVerificationGasConsumer) sdk.AnteHandler {
	return sdk.ChainAnteDecorators(
		ante.NewSetUpContextDecorator(), // outermost AnteDecorator. SetUpContext must be called first
		ante.NewMempoolFeeDecorator(),
		ante.NewValidateBasicDecorator(),
		ante.NewValidateMemoDecorator(ak),
		ante.NewConsumeGasForTxSizeDecorator(ak),
		ante.NewSetPubKeyDecorator(ak), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(ak),
		ante.NewDeductFeeDecorator(ak, supplyKeeper),
		NewDeductFeeDecorator(bk, ak, supplyKeeper),
		ante.NewSigGasConsumeDecorator(ak, sigGasConsumer),
		ante.NewSigVerificationDecorator(ak),
		ante.NewIncrementSequenceDecorator(ak), // innermost AnteDecorator
	)
}

type DeductFeeDecorator struct {
	bk           bank.Keeper
	ak           keeper.AccountKeeper
	supplyKeeper types.SupplyKeeper
	utilityAddr  sdk.AccAddress
	tax          float64
}

func NewDeductFeeDecorator(bk bank.Keeper, ak keeper.AccountKeeper, sk types.SupplyKeeper) DeductFeeDecorator {
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
		err = deductFees(dfd.supplyKeeper, dfd.bk, ctx, feePayerAcc, dfd.utilityAddr, feeTx.GetFee(), dfd.tax)
		if err != nil {
			return ctx, err
		}
	}

	return next(ctx, tx, simulate)
}

func deductFees(supplyKeeper types.SupplyKeeper, bk bank.Keeper, ctx sdk.Context, acc exported.Account, toAcc sdk.AccAddress, fees sdk.Coins, tax float64) error {
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
