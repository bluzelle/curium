package ante

import (
	"fmt"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
)

type crudGasMeter struct {
	limit       storetypes.Gas
	consumed    storetypes.Gas
	billableGas storetypes.Gas
}

func NewCrudGasMeter(limit storetypes.Gas) ChargingGasMeterInterface {
	return &crudGasMeter{
		limit:       limit,
		consumed:    0,
		billableGas: 0,
	}
}

func (g *crudGasMeter) GasConsumed() storetypes.Gas {
	return g.consumed
}

func (g *crudGasMeter) Limit() storetypes.Gas {
	return g.limit
}

func (g *crudGasMeter) GasConsumedToLimit() storetypes.Gas {
	if g.IsPastLimit() {
		return 0
	}
	return 0
}

func (g *crudGasMeter) ConsumeGas(amount storetypes.Gas, descriptor string) {
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

func (g *crudGasMeter) ConsumeBillableGas(amount storetypes.Gas, descriptor string) {
	var overflow bool
	// TODO: Should we set the consumed field after overflow checking?
	g.consumed, overflow = addUint64Overflow(g.consumed, amount)

	if overflow && g.limit != 0 {
		panic(storetypes.ErrorGasOverflow{descriptor})
	}

	if g.consumed > g.limit && g.limit != 0 {
		panic(storetypes.ErrorOutOfGas{descriptor})
	}

	g.billableGas, _ = addUint64Overflow(g.billableGas, amount)
}

func (g *crudGasMeter) BillableGasConsumed() storetypes.Gas {
	return g.billableGas
}

func (g *crudGasMeter) IsPastLimit() bool {
	return g.consumed > g.limit && g.limit != 0
}

func (g *crudGasMeter) IsOutOfGas() bool {
	return g.consumed >= g.limit
}

func (g *crudGasMeter) String() string {
	return fmt.Sprintf("BluzelleGasMeter:\n  limit: %d\n  consumed: %d", g.limit, g.consumed)
}

func (g *crudGasMeter) Charge() {

}
