package gasmeter

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type GasMeterKeeper struct {
	gasMeters []*sdk.GasMeter
}

func NewGasMeterKeeper () *GasMeterKeeper {
	return &GasMeterKeeper{
		gasMeters: make([]*sdk.GasMeter, 0),
	}
}

func (gk *GasMeterKeeper) ChargeAll (ctx sdk.Context) []error {
	errors := make([]error, 0)
	for _,gasMeter := range gk.gasMeters {
		gm := *gasMeter
		chargingGm := gm.(ChargingGasMeterInterface)
		err := chargingGm.Charge(ctx)
		if err != nil {
			errors = append(errors, err)
		}
	}
	return errors
}

func (gk *GasMeterKeeper) GetAllGasMeters () []*sdk.GasMeter {
	return gk.gasMeters
}

func (gk *GasMeterKeeper) AddGasMeter (gasMeter *sdk.GasMeter) {
	gk.gasMeters = append(gk.gasMeters, gasMeter)
}

func (gk *GasMeterKeeper) ClearAll () {
	gk.gasMeters = make([]*sdk.GasMeter, 0)
}
