package ante

import (
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
)

type BluzelleGasMeterInterface interface {
	GasConsumed() storetypes.Gas
	GasConsumedToLimit() storetypes.Gas
	ConsumeBillableGas(amount storetypes.Gas, descriptor string)
	BillableGasConsumed() storetypes.Gas
	Limit() storetypes.Gas
	ConsumeGas(amount storetypes.Gas, descriptor string)
	IsPastLimit() bool
	IsOutOfGas() bool
	String() string
}
