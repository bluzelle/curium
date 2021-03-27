package keeper

import (
	"github.com/bluzelle/curium/x/oracle/types"
	storeIterator "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) RegisterValueUpdatedListener(listener types.ValueUpdateListener) {
	valueUpdateListeners = append(valueUpdateListeners, listener)
}

func filterOutZeroValueVotes(votes []types.Vote) []types.Vote {
	var out = make([]types.Vote, 0)
	for _, v := range votes {
		if !v.Value.IsZero() {
			out = append(out, v)
		}
	}
	return out
}

func (k Keeper) UpdateSourceValue(ctx sdk.Context, batch string, sourceName string, owner sdk.AccAddress) {
	votes := k.SearchVotes(ctx, makeSearchVotePrefix(batch, sourceName))
	average := calculateAverageFromVotes(filterOutZeroValueVotes(votes))
	store := k.GetStore(ctx)

	var weight int64
	source, err := k.GetSource(ctx, votes[0].SourceName)
	if err != nil {
		logger.Info("Can not find source, setting default weight to source value", "err", err)
		weight = 50
	} else {
		weight = source.Weight
	}

	key := types.ValueStoreKey.MakeKey(batch, sourceName)

	sourceValue := types.SourceValue{
		SourceName: sourceName,
		Batch:      batch,
		Value:      average,
		Owner:      owner,
		Height:     ctx.BlockHeight(),
		Count:		int64(len(votes)),
		Weight:     weight,
	}
	store.Set(key, k.cdc.MustMarshalBinaryBare(sourceValue))

	for _, listener := range valueUpdateListeners {
		listener(ctx, sourceValue)
	}
}




func calculateAverageFromVotes(votes []types.Vote) sdk.Dec {
	if len(votes) == 0 {
		return sdk.NewDecFromInt(sdk.NewInt(0))
	}

	sum := sdk.NewDecFromInt(sdk.NewInt(0))
	totalWeight := sdk.NewDecFromInt(sdk.NewInt(0))

	for _, vote := range votes  {
		totalWeight = totalWeight.Add(vote.Weight)
		sum = sum.Add(vote.Value.Mul(vote.Weight))
	}

	return sum.Quo(totalWeight)
}

func (k Keeper) SearchSourceValues(ctx sdk.Context, prefix string, page uint, limit uint, reverse bool) []types.SourceValue {
	var iterator sdk.Iterator
	if reverse {
		iterator = storeIterator.KVStoreReversePrefixIteratorPaginated(k.GetStore(ctx), types.ValueStoreKey.MakeKey(prefix), page, limit)
	} else {
		iterator = storeIterator.KVStorePrefixIteratorPaginated(k.GetStore(ctx), types.ValueStoreKey.MakeKey(prefix), page, limit)
	}
	defer iterator.Close()
	values  := make([]types.SourceValue, 0)

	for ;iterator.Valid(); iterator.Next() {
		if ctx.GasMeter().IsPastLimit() {
			break
		}

		var v types.SourceValue
		value := iterator.Value()
		k.cdc.MustUnmarshalBinaryBare(value, &v)
		values = append(values, v)
	}
	return values
}

func (k Keeper) DumpSourceValues(ctx sdk.Context) map[string] types.SourceValue {
	store := k.GetStore(ctx)
	var results = make(map[string]types.SourceValue)
	iterator := sdk.KVStorePrefixIterator(store, types.ValueStoreKey.Prefix)
	for ; iterator.Valid(); iterator.Next() {
		var value types.SourceValue
		k.cdc.UnmarshalBinaryBare(iterator.Value(), &value)
		results[string(iterator.Key())] = value
	}
	return results
}





