package ante

import (
	"fmt"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"math"
)

type bluzelleGasMeter struct {
	limit       storetypes.Gas
	consumed    storetypes.Gas
	billableGas storetypes.Gas
}

func NewBluzelleGasMeter(limit storetypes.Gas) storetypes.GasMeter {
	return &bluzelleGasMeter{
		limit:       limit,
		consumed:    0,
		billableGas: 0,
	}
}

func (g *bluzelleGasMeter) GasConsumed() storetypes.Gas {
	return g.consumed
}

func (g *bluzelleGasMeter) Limit() storetypes.Gas {
	return g.limit
}

func (g *bluzelleGasMeter) GasConsumedToLimit() storetypes.Gas {
	if g.IsPastLimit() {
		return 0
	}
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

func (g *bluzelleGasMeter) ConsumeGas(amount storetypes.Gas, descriptor string) {
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

func (g *bluzelleGasMeter) ConsumeBillableGas(amount storetypes.Gas, descriptor string) {
	var overflow bool
	// TODO: Should we set the consumed field after overflow checking?
	g.billableGas, overflow = addUint64Overflow(g.billableGas, amount)

	if overflow && g.limit != 0 {
		panic(storetypes.ErrorGasOverflow{descriptor})
	}

	if g.billableGas > g.limit && g.limit != 0 {
		panic(storetypes.ErrorOutOfGas{descriptor})
	}

}

func (g *bluzelleGasMeter) BillableGasConsumed() storetypes.Gas {
	return g.billableGas
}

func (g *bluzelleGasMeter) IsPastLimit() bool {
	return g.consumed > g.limit && g.limit != 0
}

func (g *bluzelleGasMeter) IsOutOfGas() bool {
	return g.consumed >= g.limit
}

func (g *bluzelleGasMeter) String() string {
	return fmt.Sprintf("BluzelleGasMeter:\n  limit: %d\n  consumed: %d", g.limit, g.consumed)
}
