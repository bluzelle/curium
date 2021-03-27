package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle/types"
	storeIterator "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) CheckAggregateValues(ctx sdk.Context) {
	store := k.GetStore(ctx)
	prefix := types.SourceValueCacheKey.MakeKey(heightToString(ctx.BlockHeight() - 3))
	iterator := storeIterator.KVStorePrefixIterator(store, prefix)

	var queueValues []types.SourceValue
	var keys [][]byte

	for ;iterator.Valid(); iterator.Next() {
		var v types.SourceValue
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &v)
		queueValues = append(queueValues, v)
		keys = append(keys, iterator.Key())
	}

	if len(queueValues) > 0 {
		k.Logger(ctx).Info("Aggregating source values", "len", len(queueValues))
	}

	for _, key := range keys {
		store.Delete(key)
	}


	// TODO: FINISH HERE!!!!!!!
}

func heightToString(height int64) string {
	return fmt.Sprintf("%020d", height)
}