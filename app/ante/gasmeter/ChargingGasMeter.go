package gasmeter

import (
	"fmt"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

type ChargingGasMeter struct {
	limit         storetypes.Gas
	consumed      storetypes.Gas
	PayerAccount  sdk.AccAddress
	gasPrice      sdk.DecCoins
	supplyKeeper  banktypes.SupplyKeeper
	accountKeeper acctypes.AccountKeeper
}

func NewChargingGasMeter(supplyKeeper banktypes.SupplyKeeper, accountKeeper acctypes.AccountKeeper, limit storetypes.Gas, payerAccount sdk.AccAddress, gasPrice sdk.DecCoins) storetypes.GasMeter {
	return &ChargingGasMeter{
		limit:         limit,
		consumed:      0,
		PayerAccount:  payerAccount,
		gasPrice:      gasPrice,
		supplyKeeper:  supplyKeeper,
		accountKeeper: accountKeeper,
	}
}

func (g *ChargingGasMeter) GasConsumed() storetypes.Gas {
	return g.consumed
}

func (g *ChargingGasMeter) Limit() storetypes.Gas {
	return g.limit
}

func (g *ChargingGasMeter) GasConsumedToLimit() storetypes.Gas {
	if g.IsPastLimit() {
		return g.limit
	}
	return g.consumed
}

func (g *ChargingGasMeter) ConsumeGas(amount storetypes.Gas, descriptor string) {
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

func (g *ChargingGasMeter) IsPastLimit() bool {
	return g.consumed > g.limit && g.limit != 0
}

func (g *ChargingGasMeter) IsOutOfGas() bool {
	return g.consumed >= g.limit
}

func (g *ChargingGasMeter) String() string {
	return fmt.Sprintf("BluzelleGasMeter:\n  limit: %d\n  consumed: %d", g.limit, g.consumed)
}

func (g *ChargingGasMeter) Charge(ctx sdk.Context) error {
	gasFee := calculateGasFee(g)

	acc := g.accountKeeper.GetAccount(ctx, g.PayerAccount)

	addr := acc.GetAddress()
	err := deductFees(&ctx, g.supplyKeeper, addr, gasFee)
	if err != nil {
		return err
	}

	return nil

}

func (g *ChargingGasMeter) GetGasPrice() sdk.DecCoins {
	return g.gasPrice
}

func deductFees(ctx *sdk.Context, bankKeeper banktypes.SupplyKeeper, addr sdk.AccAddress, fees sdk.Coins) error {

	if !fees.IsValid() {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "invalid fee amount: %s", fees)
	}

	err := bankKeeper.SendCoinsFromAccountToModule(*ctx, addr, banktypes.FeeCollectorName, fees)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
	}

	return nil
}

func calculateGasFee(gm *ChargingGasMeter) sdk.Coins {

	gasPrice := gm.gasPrice

	gasPriceAmount := gasPrice.AmountOf("ubnt")

	gasConsumed := gm.GasConsumed()

	gasFee := gasPriceAmount.MulInt64(int64(gasConsumed)).RoundInt64()
	return sdk.NewCoins(sdk.NewCoin("ubnt", sdk.NewInt(gasFee)))
}
