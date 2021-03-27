package aggregator

import (
	"fmt"
	tokenAggregator "github.com/bluzelle/curium/x/oracle/aggregators/token"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var aggregators = []Aggregator{
	tokenAggregator.NewTokenAggregator(),
}

func NotifyAggregators(ctx sdk.Context,  value types.SourceValue, updateFn func(prefix []byte, key []byte, value interface{})) {
	for _, aggregator := range aggregators {
		aggregator.SourceValueUpdated(ctx, value, updateFn)
	}
}


type Aggregator interface {
	SourceValueUpdated(ctx sdk.Context, value types.SourceValue, updateFn func(prefix []byte, key []byte, value interface{}))
}

func CheckAggregateValues(ctx sdk.Context) {
	_ = ctx
	fmt.Println("FINISH HERE!!!")
}

