package aggregator

import (
	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var aggregators = []Aggregator{
	TokenAggregator{},
}

func GetAggregators() []Aggregator {
	return aggregators
}


type Aggregator interface {
	AggregateSourceValues(ctx sdk.Context, cdc codec.Codec, store sdk.KVStore, values []types.SourceValue)
}


