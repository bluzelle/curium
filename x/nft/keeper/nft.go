package keeper

import (
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// AppendNft appends a nft in the store with a new id and update the count
func (k Keeper) AppendNft(
	ctx sdk.Context,
	creator string,
	id string,
	hash string,
	vendor string,
	userId string,
	meta string,
	mime string,
	size uint64,
) {
	// Create the nft
	var nft = types.Nft{
		Creator: creator,
		Id:      id,
		Vendor: vendor,
		UserId: userId,
		Hash:    hash,
		Meta:    meta,
		Mime:    mime,
		Size:    size,
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	value := k.Cdc.MustMarshalBinaryBare(&nft)
	store.Set(GetNftHashBytes(nft.Hash), value)
}

// SetNft set a specific nft in the store
func (k Keeper) SetNft(ctx sdk.Context, nft types.Nft) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	b := k.Cdc.MustMarshalBinaryBare(&nft)
	store.Set(GetNftHashBytes(nft.Hash), b)
}

func (k Keeper) GetNft(ctx sdk.Context, hash string) types.Nft {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	var nft types.Nft
	k.Cdc.MustUnmarshalBinaryBare(store.Get(GetNftHashBytes(hash)), &nft)
	return nft
}

// HasNft checks if the nft exists in the store
func (k Keeper) HasNft(ctx sdk.Context, hash string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	return store.Has(GetNftHashBytes(hash))
}

// GetNftOwner returns the creator of the nft
func (k Keeper) GetNftOwner(ctx sdk.Context, hash string) string {
	return k.GetNft(ctx, hash).Creator
}

// RemoveNft removes a nft from the store
func (k Keeper) RemoveNft(ctx sdk.Context, hash string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	store.Delete(GetNftHashBytes(hash))
}

// GetAllNft returns all nft
func (k Keeper) GetAllNft(ctx sdk.Context) (list []types.Nft) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Nft
		k.Cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

func GetNftHashBytes(hash string) []byte {
	return []byte(hash)
}

