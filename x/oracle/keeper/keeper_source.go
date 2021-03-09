package keeper

import (
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) GetSourceStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.sourceStoreKey)
}

func (k Keeper) AddSource(ctx sdk.Context, name string, source types.Source) {
	store := k.GetSourceStore(ctx)
	store.Set([]byte(name), k.cdc.MustMarshalBinaryLengthPrefixed(source))
}

func (k Keeper) GetSource(ctx sdk.Context, name string) (types.Source, error) {
	store := k.GetSourceStore(ctx)
	var source types.Source
	err := k.cdc.UnmarshalBinaryLengthPrefixed(store.Get([]byte(name)), &source)
	return source, err
}

func (k Keeper) DeleteSource(ctx sdk.Context, name string) error {
	store := k.GetSourceStore(ctx)
	store.Delete([]byte(name))
	return nil
}

func (k Keeper) ListSources(ctx sdk.Context) ([]types.Source, error) {
	store := k.GetSourceStore(ctx)
	iterator := store.Iterator(nil, nil)
	defer iterator.Close()
	var sources = make([]types.Source, 0)
	for ; iterator.Valid(); iterator.Next() {
		var source types.Source
		value := iterator.Value()
		k.cdc.UnmarshalBinaryLengthPrefixed(value, &source)
		sources = append(sources, source)
	}
	return sources, nil
}
