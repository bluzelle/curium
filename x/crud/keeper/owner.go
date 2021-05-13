package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	)

func MakeOwnerKey (owner string, uuid string, key string) []byte {
	return []byte(owner + "\x00" + uuid + "\x00" + key)
}

func (k Keeper) SetOwnerInLeaseStore (ctx *sdk.Context, uuid string, key string, owner string) {

	ownerStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerValueKey))

	ownerStore.Set(MakeOwnerKey(owner, uuid, key), make([]byte, 0))
}


func (k Keeper) IsOwner (ctx *sdk.Context, owner string, uuid string, key string) bool {
	return k.GetOwner(ctx, uuid, key) == owner
}

