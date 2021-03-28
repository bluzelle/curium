package aggregator

import (
	tokenAggregator "github.com/bluzelle/curium/x/oracle/aggregator/token"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var aggregators = []Aggregator{
	tokenAggregator.TokenAggregator{},
}

func GetAggregators() []Aggregator {
	return aggregators
}


type Aggregator interface {
	AggregateSourceValues(ctx sdk.Context, store sdk.KVStore, values []types.SourceValue)
}


