package keeper

import (
	"encoding/binary"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k Keeper) NewCrudValue(
	creator string,
	uuid string,
	key string,
	value []byte,
	lease *types.Lease,
	height int64) *types.CrudValue {

	return &types.CrudValue{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Value:   value,
		Lease:   lease,
		Height:  height,
	}
}

// AppendCrudValue appends a CrudValue in the store with a new id and update the count
func (k Keeper) AppendCrudValue(
	ctx sdk.Context,
	creator string,
	uuid string,
	key string,
	value []byte,
	lease *types.Lease,
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
func (k Keeper) SetCrudValue(ctx *sdk.Context, CrudValue types.CrudValue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))

	b := k.cdc.MustMarshalBinaryBare(&CrudValue)
	store.Set(MakeCrudValueKey(CrudValue.Uuid, CrudValue.Key), b)
}

// GetCrudValue returns a CrudValue from its id
func (k Keeper) GetCrudValue(ctx *sdk.Context, uuid string, key string) types.CrudValue {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	var CrudValue types.CrudValue
	k.cdc.MustUnmarshalBinaryBare(store.Get(MakeCrudValueKey(uuid, key)), &CrudValue)
	return CrudValue
}

func (k Keeper) GetCrudValuePointer(ctx *sdk.Context, uuid string, key string) *types.CrudValue {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	var CrudValue *types.CrudValue
	k.cdc.MustUnmarshalBinaryBare(store.Get(MakeCrudValueKey(uuid, key)), CrudValue)
	return CrudValue
}

// HasCrudValue checks if the CrudValue exists in the store
func (k Keeper) HasCrudValue(ctx *sdk.Context, uuid, key string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	return store.Has(MakeCrudValueKey(uuid, key))
}

// GetOwner returns the creator of the CrudValue
func (k Keeper) GetOwner(ctx *sdk.Context, uuid, key string) string {
	return k.GetCrudValue(ctx, uuid, key).Creator
}

// RemoveCrudValue removes a CrudValue from the store
func (k Keeper) RemoveCrudValue(ctx *sdk.Context, uuid, key string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	store.Delete(MakeCrudValueKey(uuid, key))
}

// GetAllCrudValue returns all CrudValue
func (k Keeper) GetAllCrudValue(ctx *sdk.Context) (list []types.CrudValue) {
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

func (k Keeper) GetOwnedKeys(ctx *sdk.Context, owner string, uuid string, pagination *types.PagingRequest) ([]string, *types.PagingResponse, error) {
	ownerUuidPrefix := owner + "\x00" + uuid + "\x00"
	store := ctx.KVStore(k.storeKey)
	ownerStore := prefix.NewStore(store, types.OwnerPrefix(types.OwnerValueKey, ownerUuidPrefix))

	keys := make([]string, 0)
	keysSize := uint64(0)
	pageRes, _ := k.Paginate(ownerStore, pagination, func(key []byte, value []byte) error {

		keysSize = uint64(len(key)) + keysSize

		if keysSize > k.mks.MaxKeysSize {
			return sdkerrors.New("crud", 2, "exceeded max key size")
		}
		keys = append(keys, string(key))
		return nil
	})

	return keys, pageRes, nil
}


func (k Keeper) GetKeysUnderUuid(ctx *sdk.Context, uuid string) ([]string, error) {

	store := ctx.KVStore(k.storeKey)
	crudValueStore := prefix.NewStore(store, types.UuidPrefix(types.CrudValueKey, uuid + "\x00"))

	iterator := crudValueStore.Iterator(nil, nil)
	defer iterator.Close()
	var keys []string

	keysSize := uint64(0)
	for ; iterator.Valid(); iterator.Next() {
		key := string(iterator.Key())
		keysSize = uint64(len(key)) + keysSize

		if keysSize < k.mks.MaxKeysSize {
			keys = append(keys, key)
		} else {
			return keys, nil
		}
	}
	return keys, nil
}


func (k Keeper) GetNumKeysOwned(ctx *sdk.Context, uuid string, owner string) (int, error) {
	uuidPrefix := "\x00" + uuid + "\x00"
	store := ctx.KVStore(k.storeKey)
	OwnerStore := prefix.NewStore(store, types.OwnerPrefix(types.OwnerValueKey, owner+uuidPrefix))

	iterator := OwnerStore.Iterator(nil, nil)
	defer iterator.Close()
	numKeys := 0

	for ; iterator.Valid(); iterator.Next() {
		numKeys += 1
	}

	return numKeys, nil
}

func (k Keeper) GetAllKeyValues(ctx *sdk.Context, uuid string, pagination *types.PagingRequest, searchKey string) ([]*types.KeyValue, *types.PagingResponse, error) {

	var list []*types.KeyValue

	store := ctx.KVStore(k.storeKey)
	CrudValueStore := prefix.NewStore(store, types.SearchCrudValuePrefix(types.CrudValueKey, MakeCrudValueKey(uuid, searchKey)))

	pageRes, err := k.Paginate(CrudValueStore, pagination, func(key []byte, value []byte) error {
		var val types.CrudValue
		k.cdc.MustUnmarshalBinaryBare(value, &val)
		kv := &types.KeyValue{
			Key:   val.Key,
			Value: val.Value,
		}
		list = append(list, kv)
		return nil
	})

	if err != nil {
		return nil, nil, err
	}

	return list, pageRes, nil
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
