package aggregator

import (
	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

var aggregators = []Aggregator{
	TokenAggregator{},
}

func SourceValueUpdated(ctx sdk.Context, cdc codec.Codec, store sdk.KVStore, values []types.SourceValue) {
	for _, agg := range aggregators {
		agg.AggregateSourceValues(ctx, cdc, store, values)
	}
}

func findAggregator(name string) Aggregator{
	for _, agg := range aggregators {
		if agg.GetName() == name {
			return agg
		}
	}
	return nil
}

type Aggregator interface {
	AggregateSourceValues(ctx sdk.Context, cdc codec.Codec, store sdk.KVStore, values []types.SourceValue)
	Queriers(ctx sdk.Context, cmd string, req abci.RequestQuery, cdc codec.Codec, store sdk.KVStore) (bool, []byte, error)
	GetName() string
}

func Queriers(ctx sdk.Context, path []string, req abci.RequestQuery, cdc codec.Codec,store sdk.KVStore) (bool, []byte, error) {
	var (
		found bool = false
		result []byte
		err error
	)
	agg := findAggregator(path[1])
	if agg != nil {
		found, result, err = agg.Queriers(ctx, path[2], req, cdc, store)
	}
	return found, result, err
}