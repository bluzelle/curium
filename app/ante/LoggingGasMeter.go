package ante

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"math"
)

type LoggingGasMeter struct {
	limit    sdk.Gas
	consumed sdk.Gas
}

// NewLoggingGasMeter returns a reference to a new LoggingGasMeter.
func NewLoggingGasMeter(limit sdk.Gas) sdk.GasMeter {
	fmt.Println("********* new gas meter")
	return &LoggingGasMeter{
		limit:    limit,
		consumed: 0,
	}
}

func (g *LoggingGasMeter) GasConsumed() sdk.Gas {
	return g.consumed
}

func (g *LoggingGasMeter) Limit() sdk.Gas {
	return g.limit
}

func (g *LoggingGasMeter) GasConsumedToLimit() sdk.Gas {
	if g.IsPastLimit() {
		return g.limit
	}
	return g.consumed
}

// addUint64Overflow performs the addition operation on two uint64 integers and
// returns a boolean on whether or not the result overflows.
func addUint64Overflow(a, b uint64) (uint64, bool) {
	if math.MaxUint64-a < b {
		return 0, true
	}

	return a + b, false
}

func (g *LoggingGasMeter) ConsumeGas(amount sdk.Gas, descriptor string) {
	fmt.Println("*********", amount, descriptor)
	var overflow bool
	// TODO: Should we set the consumed field after overflow checking?
	g.consumed, overflow = addUint64Overflow(g.consumed, amount)
	if overflow {
		panic(sdk.ErrorGasOverflow{descriptor})
	}

	if g.consumed > g.limit {
		panic(sdk.ErrorOutOfGas{descriptor})
	}

}

func (g *LoggingGasMeter) IsPastLimit() bool {
	return g.consumed > g.limit
}

func (g *LoggingGasMeter) IsOutOfGas() bool {
	return g.consumed >= g.limit
}
