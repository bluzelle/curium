package keeper

import (
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) GetNftFilesStore(ctx *sdk.Context) prefix.Store {
	return prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
}

func (k Keeper) NftFullyReplicated(ctx *sdk.Context, fileId string) bool {
	// TODO: This is temporary. Get list of nodes and check that all nodes are in the store for this NFT
	return k.countNodesWithNft(ctx, fileId) > 1
}

func (k Keeper) countNodesWithNft(ctx *sdk.Context, fileId string) uint64 {
	var count uint64
	store := k.GetNftFilesStore(ctx)
	iterator := sdk.KVStorePrefixIterator(store, []byte(fileId))
	for ; iterator.Valid(); iterator.Next() {
		count++
	}
	return count

}

func MakeNftFilesKey(fileId string, nodeId string) []byte {
	return []byte(fileId + "\x00" + nodeId)
}

func (k Keeper) MarkFileReceived(ctx *sdk.Context, fileId string, nodeId string) {
	store := k.GetNftFilesStore(ctx)
	store.Set(MakeNftFilesKey(fileId, nodeId), make([]byte, 0))
}