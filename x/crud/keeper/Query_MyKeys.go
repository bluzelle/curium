package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) MyKeys(goCtx context.Context, req *types.QueryMyKeysRequest) (*types.QueryMyKeysResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	uuidPrefix := "\x00" + req.Uuid + "\x00"
	store := ctx.KVStore(k.storeKey)
	OwnerStore := prefix.NewStore(store, types.OwnerPrefix(types.OwnerValueKey, req.Address))

	iterator := sdk.KVStorePrefixIterator(OwnerStore, []byte(uuidPrefix))
	defer iterator.Close()
	keys := &types.QueryMyKeysResponse{Key: make([]string, 0)}

	keysSize := uint64(0)
	for ; iterator.Valid(); iterator.Next() {
		key := string(iterator.Key()[len(uuidPrefix):])
		keysSize = uint64(len(key)) + keysSize

		if keysSize < k.mks.MaxKeysSize {
			keys.Key = append(keys.Key, key)
		} else {
			return keys, nil
		}
	}
	return keys, nil
}
