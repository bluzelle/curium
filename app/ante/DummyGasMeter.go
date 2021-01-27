package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type dummyGasMeter struct {
	consumed sdk.Gas
}

// NewDummyGasMeter returns a reference to a new dummyGasMeter.
func NewDummyGasMeter() sdk.GasMeter {
	return &dummyGasMeter{
		consumed: 0,
	}
}

func (g *dummyGasMeter) GasConsumed() sdk.Gas {
	return 0
}

func (g *dummyGasMeter) GasConsumedToLimit() sdk.Gas {
	return 0
}

func (g *dummyGasMeter) Limit() sdk.Gas {
	return 0
}

func (g *dummyGasMeter) ConsumeGas(amount sdk.Gas, descriptor string) {
}

func (g *dummyGasMeter) IsPastLimit() bool {
	return false
}

func (g *dummyGasMeter) IsOutOfGas() bool {
	return false
}

func (g *dummyGasMeter) String() string {
	return "Dummy gas meter"
}
