package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

type GasMeterKeeper struct {
	gasMeters []*sdk.GasMeter
	minGasPrices sdk.DecCoins
}

func NewGasMeterKeeper (minGasPrices sdk.DecCoins) *GasMeterKeeper {
	return &GasMeterKeeper{
		gasMeters: make([]*sdk.GasMeter, 0),
		minGasPrices: minGasPrices,
	}
}

func (gk *GasMeterKeeper) ChargeAll (ctx *sdk.Context, bankKeeper bankkeeper.Keeper, accountKeeper authkeeper.AccountKeeper) {
	if len(gk.gasMeters) == 0 {
		return
	}
	for _,gasMeter := range gk.gasMeters {
		gm := *gasMeter
		chargingGm := gm.(ChargingGasMeterInterface)
		err := chargingGm.Charge(ctx, bankKeeper, accountKeeper, gk.minGasPrices)
		_ = err

	}
}

func (gk *GasMeterKeeper) AddGasMeter (gasMeter *sdk.GasMeter) {
	gk.gasMeters = append(gk.gasMeters, gasMeter)
}

func (gk *GasMeterKeeper) ClearAll () {
	gk.gasMeters = make([]*sdk.GasMeter, 0)
}
