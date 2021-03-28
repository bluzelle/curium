package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle/aggregator"
	"github.com/bluzelle/curium/x/oracle/types"
	storeIterator "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) CheckAggregateValues(ctx sdk.Context) {

	store := k.GetStore(ctx)
	prefix := types.SourceValueCacheKey.MakeKey(heightToString(ctx.BlockHeight() - 3))
	iterator := storeIterator.KVStorePrefixIterator(store, prefix)

	var queueValues = make(map[string][]types.SourceValue)
	var keys [][]byte

	for ; iterator.Valid(); iterator.Next() {
		var v types.SourceValue
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &v)
		queueValues[v.Batch] = append(queueValues[v.Batch], v)
		keys = append(keys, iterator.Key())
	}

	for _, key := range keys {
		store.Delete(key)
	}

	if len(queueValues) > 0 {
		for _, values := range queueValues {
			logger.Info("Aggregating source values", "len", len(queueValues))
			for _, agg := range aggregator.GetAggregators() {
				agg.AggregateSourceValues(ctx, store, values)
			}
		}
	}
}

func heightToString(height int64) string {
	return fmt.Sprintf("%020d", height)
}
