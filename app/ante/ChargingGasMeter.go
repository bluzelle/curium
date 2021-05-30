package ante

import (
	"fmt"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

type chargingGasMeter struct {
	limit       storetypes.Gas
	consumed    storetypes.Gas
	payerAccount sdk.AccAddress
}

func NewChargingGasMeter(limit storetypes.Gas, payerAccount sdk.AccAddress) storetypes.GasMeter {
	return &chargingGasMeter{
		limit:       limit,
		consumed:    0,
		payerAccount: payerAccount,
	}
}

func (g *chargingGasMeter) GasConsumed() storetypes.Gas {
	return g.consumed
}

func (g *chargingGasMeter) Limit() storetypes.Gas {
	return g.limit
}

func (g *chargingGasMeter) GasConsumedToLimit() storetypes.Gas {
	if g.IsPastLimit() {
		return g.limit
	}
	return g.consumed
}

func (g *chargingGasMeter) ConsumeGas(amount storetypes.Gas, descriptor string) {
	var overflow bool
	// TODO: Should we set the consumed field after overflow checking?
	g.consumed, overflow = addUint64Overflow(g.consumed, amount)
	if overflow && g.limit != 0 {
		panic(storetypes.ErrorGasOverflow{descriptor})
	}

	if g.consumed > g.limit && g.limit != 0 {
		panic(storetypes.ErrorOutOfGas{descriptor})
	}

}

func (g *chargingGasMeter) IsPastLimit() bool {
	return g.consumed > g.limit && g.limit != 0
}

func (g *chargingGasMeter) IsOutOfGas() bool {
	return g.consumed >= g.limit
}

func (g *chargingGasMeter) String() string {
	return fmt.Sprintf("BluzelleGasMeter:\n  limit: %d\n  consumed: %d", g.limit, g.consumed)
}

func (g *chargingGasMeter) Charge(ctx *sdk.Context, bankKeeper authtypes.BankKeeper, accountKeeper authante.AccountKeeper) error {
	gasFee := calculateGasFee(ctx, g)

	acc := accountKeeper.GetAccount(*ctx, g.payerAccount)

	err := deductFees(ctx, bankKeeper, acc, gasFee)

	if err != nil {
		return err
	}

	return nil

}

func deductFees(ctx *sdk.Context, bankKeeper authtypes.BankKeeper, acc authtypes.AccountI, fees sdk.Coins) error {

	if !fees.IsValid() {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "invalid fee amount: %s", fees)
	}

	err := bankKeeper.SendCoinsFromAccountToModule(*ctx, acc.GetAddress(), authtypes.FeeCollectorName, fees)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
	}

	return nil
}

func calculateGasFee(ctx *sdk.Context, gm *chargingGasMeter) sdk.Coins {
	var gasPrices sdk.Dec
	gasPrices = ctx.MinGasPrices().AmountOf("ubnt")

	if gasPrices.IsZero() {
		gasPrice := 0.002
		gasPrices, _ = sdk.NewDecFromStr(fmt.Sprintf("%f", gasPrice))
	}

	gasConsumed := gm.GasConsumed()
	gasFee := gasPrices.MulInt64(int64(gasConsumed)).RoundInt64()
	return sdk.NewCoins(sdk.NewCoin("ubnt", sdk.NewInt(gasFee)))
}