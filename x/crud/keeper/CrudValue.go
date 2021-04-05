package keeper

import (
	"encoding/binary"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"strconv"
)

// GetCrudValueCount get the total number of CrudValue
func (k Keeper) GetCrudValueCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueCountKey))
	byteKey := types.KeyPrefix(types.CrudValueCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	count, err := strconv.ParseUint(string(bz), 10, 64)
	if err != nil {
		// Panic because the count should be always formattable to iint64
		panic("cannot decode count")
	}

	return count
}

// SetCrudValueCount set the total number of CrudValue
func (k Keeper) SetCrudValueCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueCountKey))
	byteKey := types.KeyPrefix(types.CrudValueCountKey)
	bz := []byte(strconv.FormatUint(count, 10))
	store.Set(byteKey, bz)
}

// AppendCrudValue appends a CrudValue in the store with a new id and update the count
func (k Keeper) AppendCrudValue(
	ctx sdk.Context,
	creator string,
	uuid string,
	key string,
	value string,
	lease int64,
	height int64,
) {
	// Create the CrudValue
	var CrudValue = types.CrudValue{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Value:   value,
		Lease:   lease,
		Height:  height,
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	v := k.cdc.MustMarshalBinaryBare(&CrudValue)
	store.Set(MakeCrudValueKey(uuid, key), v)

}

// SetCrudValue set a specific CrudValue in the store
func (k Keeper) SetCrudValue(ctx sdk.Context, CrudValue types.CrudValue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	b := k.cdc.MustMarshalBinaryBare(&CrudValue)
	store.Set(MakeCrudValueKey(CrudValue.Uuid, CrudValue.Key), b)
}

// GetCrudValue returns a CrudValue from its id
func (k Keeper) GetCrudValue(ctx sdk.Context, uuid, key string) types.CrudValue {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	var CrudValue types.CrudValue
	k.cdc.MustUnmarshalBinaryBare(store.Get(MakeCrudValueKey(uuid, key)), &CrudValue)
	return CrudValue
}

// HasCrudValue checks if the CrudValue exists in the store
func (k Keeper) HasCrudValue(ctx sdk.Context, uuid, key string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	return store.Has(MakeCrudValueKey(uuid, key))
}

// GetCrudValueOwner returns the creator of the CrudValue
func (k Keeper) GetCrudValueOwner(ctx sdk.Context, uuid, key string) string {
	return k.GetCrudValue(ctx, uuid, key).Creator
}

// RemoveCrudValue removes a CrudValue from the store
func (k Keeper) RemoveCrudValue(ctx sdk.Context, uuid, key string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	store.Delete(MakeCrudValueKey(uuid, key))
}

// GetAllCrudValue returns all CrudValue
func (k Keeper) GetAllCrudValue(ctx sdk.Context) (list []types.CrudValue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.CrudValue
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetCrudValueIDBytes returns the byte representation of the ID
func GetCrudValueIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetCrudValueIDFromBytes returns ID in uint64 format from a byte array
func GetCrudValueIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
