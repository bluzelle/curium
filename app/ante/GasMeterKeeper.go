package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/store/types"
)

type ChargingGasMeterInterface interface {
	GasConsumed() sdk.Gas
	GasConsumedToLimit() sdk.Gas
	ConsumeBillableGas(amount sdk.Gas, descriptor string)
	BillableGasConsumed() sdk.Gas
	Limit() sdk.Gas
	ConsumeGas(amount sdk.Gas, descriptor string)
	IsPastLimit() bool
	IsOutOfGas() bool
	String() string
	Charge()
}

type GasMeterKeeper struct {
	gasMeters []*ChargingGasMeterInterface
}

func NewGasMeterKeeper () *GasMeterKeeper {
	return &GasMeterKeeper{
		gasMeters: make([]*ChargingGasMeterInterface, 0),
	}
}

func (gk *GasMeterKeeper) ChargeAll () {
	if len(gk.gasMeters) == 0 {
		return
	}
	for _,gasMeter := range gk.gasMeters {
		gm := *gasMeter
		gm.Charge()
	}
}

func (gk *GasMeterKeeper) AddGasMeter (gasMeter *ChargingGasMeterInterface) {
	gk.gasMeters = append(gk.gasMeters, gasMeter)
}

func (gk *GasMeterKeeper) ClearAll () {
	gk.gasMeters = make([]*ChargingGasMeterInterface, 0)
}
