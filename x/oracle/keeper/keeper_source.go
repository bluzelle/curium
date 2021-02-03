package keeper

import (
	types2 "github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) GetSourceStore(ctx types.Context) types.KVStore {
	return ctx.KVStore(k.sourceStoreKey)
}

func (k Keeper) AddSource(ctx types.Context, name string, source types2.Source) {
	store := k.GetSourceStore(ctx)
	store.Set([]byte(name), []byte(k.cdc.MustMarshalBinaryLengthPrefixed(source)))
}

func (k Keeper) GetSource(ctx types.Context, name string) (types2.Source, error) {
	store := k.GetSourceStore(ctx)
	var source types2.Source
	err := k.cdc.UnmarshalBinaryLengthPrefixed(store.Get([]byte(name)), &source)
	return source, err
}

func (k Keeper) DeleteSource(ctx types.Context, name string) error {
	store := k.GetSourceStore(ctx)
	store.Delete([]byte(name))
	return nil
}

func (k Keeper) ListSources(ctx types.Context) ([]types2.Source, error) {
	store := k.GetSourceStore(ctx)
	iterator := store.Iterator(nil, nil)
	defer iterator.Close()
	var sources = make([]types2.Source, 0)
	for ; iterator.Valid(); iterator.Next() {
		var source types2.Source
		value := iterator.Value()
		k.cdc.UnmarshalBinaryLengthPrefixed(value, &source)
		sources = append(sources, source)
	}
	return sources, nil
}
