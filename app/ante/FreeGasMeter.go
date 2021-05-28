package ante

import (
	"fmt"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"math"
)

type freeGasMeter struct {
	limit    storetypes.Gas
	consumed storetypes.Gas
}

func NewFreeGasMeter(limit storetypes.Gas) ChargingGasMeterInterface {
	return &freeGasMeter{
		limit:    limit,
		consumed: 0,
	}
}

func (g *freeGasMeter) GasConsumed() storetypes.Gas {
	return 0
}

func (g *freeGasMeter) Limit() storetypes.Gas {
	return g.limit
}

func (g *freeGasMeter) GasConsumedToLimit() storetypes.Gas {
	if g.IsPastLimit() {
		return 0
	}
	return 0
}

func (g *freeGasMeter) ConsumeBillableGas(amount storetypes.Gas, descriptor string)  {
}

func (g *freeGasMeter) BillableGasConsumed() storetypes.Gas {
	return 0
}

// addUint64Overflow performs the addition operation on two uint64 integers and
// returns a boolean on whether or not the result overflows.
func addUint64Overflow(a, b uint64) (uint64, bool) {
	if math.MaxUint64-a < b {
		return 0, true
	}

	return a + b, false
}

func (g *freeGasMeter) ConsumeGas(amount storetypes.Gas, descriptor string) {
	var overflow bool
	// TODO: Should we set the consumed field after overflow checking?
	g.consumed, overflow = addUint64Overflow(g.consumed, amount)
	if overflow && g.limit != 0 {
		panic(storetypes.ErrorGasOverflow{descriptor})
	}

	if g.consumed > g.limit  && g.limit != 0 {
		panic(storetypes.ErrorOutOfGas{descriptor})
	}

}

func (g *freeGasMeter) IsPastLimit() bool {
	return g.consumed > g.limit && g.limit != 0
}

func (g *freeGasMeter) IsOutOfGas() bool {
	return g.consumed >= g.limit
}

func (g *freeGasMeter) String() string {
	return fmt.Sprintf("FreeGasMeter:\n  limit: %d\n  consumed: %d", g.limit, g.consumed)
}

func (g *freeGasMeter) Charge () {}