package keeper

import (
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func MakeOwnerKey(owner string, uuid string, key string) []byte {
	return []byte(owner + "\x00" + uuid + "\x00" + key)
}

func (k Keeper) SetOwner(ctx *sdk.Context, uuid string, key string, owner string) {

	ownerStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerValueKey))

	ownerStore.Set(MakeOwnerKey(owner, uuid, key), make([]byte, 0))
}

func (k Keeper) OwnsUuid(ctx *sdk.Context, uuid string, owner string) bool {

	crudStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.UuidPrefix(types.CrudValueKey, uuid))
	var val types.CrudValue
	iterator := crudStore.Iterator(nil, nil)

	if !iterator.Valid() {
		return true
	}

	k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)

	return val.Creator == owner

}

func (k Keeper) IsOwner(ctx *sdk.Context, owner string, uuid string, key string) bool {
	return k.GetOwner(ctx, uuid, key) == owner
}

func (k Keeper) DeleteOwner(ctx *sdk.Context, owner string, uuid string, key string) {

	ownerStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerValueKey))

	ownerStore.Delete(MakeOwnerKey(owner, uuid, key))
}
