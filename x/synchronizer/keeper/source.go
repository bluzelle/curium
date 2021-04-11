package keeper

import (
	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// AppendSource appends a source in the store with a new id and update the count
func (k Keeper) AppendSource(
	ctx sdk.Context,
	creator string,
	name string,
	url string,
) {
	// Create the source
	var source = types.Source{
		Creator: creator,
		Name:    name,
		Url:     url,
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SourceKey))
	value := k.cdc.MustMarshalBinaryBare(&source)
	store.Set([]byte(source.Name), value)
}

func (k Keeper) GetSourceStore(ctx sdk.Context) prefix.Store {
	return prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SourceKey))
}

// SetSource set a specific source in the store
func (k Keeper) SetSource(ctx sdk.Context, source types.Source) {
	store := k.GetSourceStore(ctx)
	b := k.cdc.MustMarshalBinaryBare(&source)
	store.Set([]byte(source.Name), b)
}

// GetSource returns a source from its id
func (k Keeper) GetSource(ctx sdk.Context, name string) types.Source {
	store := k.GetSourceStore(ctx)
	var source types.Source
	k.cdc.MustUnmarshalBinaryBare(store.Get([]byte(name)), &source)
	return source
}

// HasSource checks if the source exists in the store
func (k Keeper) HasSource(ctx sdk.Context, name string) bool {
	store := k.GetSourceStore(ctx)
	return store.Has([]byte(name))
}

// GetSourceOwner returns the creator of the source
func (k Keeper) GetSourceOwner(ctx sdk.Context, name string) string {
	return k.GetSource(ctx, name).Creator
}

// RemoveSource removes a source from the store
func (k Keeper) RemoveSource(ctx sdk.Context, name string) {
	store := k.GetSourceStore(ctx)
	store.Delete([]byte(name))
}

// GetAllSource returns all source
func (k Keeper) GetAllSource(ctx sdk.Context) (list []types.Source) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SourceKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Source
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
