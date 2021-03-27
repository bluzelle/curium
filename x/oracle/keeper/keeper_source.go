package keeper

import (
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) AddSource(ctx sdk.Context, name string, source types.Source) {
	store := k.GetStore(ctx)
	store.Set(types.SourceStoreKey.MakeKey(name), k.cdc.MustMarshalBinaryBare(source))
}

func (k Keeper) GetSource(ctx sdk.Context, name string) (types.Source, error) {
	store := k.GetStore(ctx)
	var source types.Source
	err := k.cdc.UnmarshalBinaryBare(store.Get(types.SourceStoreKey.MakeKey(name)), &source)
	return source, err
}

func (k Keeper) DeleteSource(ctx sdk.Context, name string) error {
	store := k.GetStore(ctx)
	store.Delete(types.SourceStoreKey.MakeKey(name))
	return nil
}

func (k Keeper) ListSources(ctx sdk.Context) ([]types.Source, error) {
	store := k.GetStore(ctx)
	iterator := sdk.KVStorePrefixIterator(store, types.SourceStoreKey.Prefix)
	defer iterator.Close()
	var sources = make([]types.Source, 0)
	for ; iterator.Valid(); iterator.Next() {
		var source types.Source
		value := iterator.Value()
		k.cdc.UnmarshalBinaryBare(value, &source)
		sources = append(sources, source)
	}
	return sources, nil
}

func (k Keeper) DumpSources(ctx sdk.Context) map[string] types.Source {
	store := k.GetStore(ctx)
	var results = make(map[string]types.Source)
	iterator := sdk.KVStorePrefixIterator(store, types.SourceStoreKey.Prefix)
	for ; iterator.Valid(); iterator.Next() {
		var source types.Source
		k.cdc.UnmarshalBinaryBare(iterator.Value(), &source)
		results[string(iterator.Key())] = source
	}
	return results
}
