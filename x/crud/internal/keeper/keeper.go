// Copyright (C) 2020 Bluzelle
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License, version 3,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

//go:generate mockgen -destination=../../mocks/mock_keeper.go -package=mocks github.com/bluzelle/curium/x/crud/internal/keeper IKeeper
//go:generate mockgen -destination=../../mocks/mock_gas.go -package=mocks github.com/cosmos/cosmos-sdk/store/types GasMeter
package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"strconv"
)

type MaxKeeperSizes struct {
	MaxKeysSize           uint64
	MaxKeyValuesSize      uint64
	MaxDefaultLeaseBlocks int64
}

type IKeeper interface {
	SetValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string, value types.BLZValue)
	GetValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string) types.BLZValue
	DeleteValue(ctx sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, UUID string, key string)
	IsKeyPresent(ctx sdk.Context, store sdk.KVStore, UUID string, key string) bool
	GetValuesIterator(ctx sdk.Context, store sdk.KVStore) sdk.Iterator
	GetKeys(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultKeys
	GetOwner(ctx sdk.Context, store sdk.KVStore, UUID string, key string) sdk.AccAddress
	GetKVStore(ctx sdk.Context) sdk.KVStore
	GetLeaseStore(ctx sdk.Context) sdk.KVStore
	RenameKey(ctx sdk.Context, store sdk.KVStore, UUID string, key string, newkey string) bool
	GetCdc() *codec.Codec
	GetKeyValues(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultKeyValues
	GetCount(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultCount
	DeleteAll(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress)
	SetLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, lease int64)
	DeleteLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, leaseBlocks int64)
	ProcessLeasesAtBlockHeight(ctx sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, lease int64)
	GetDefaultLeaseBlocks() int64
}

type Keeper struct {
	CoinKeeper bank.Keeper
	storeKey   sdk.StoreKey
	leaseKey   sdk.StoreKey
	cdc        *codec.Codec
	mks        MaxKeeperSizes
}

// Note: MakeMetaKey is used in query.go and keeper.go
func MakeMetaKey(UUID string, key string) string {
	return UUID + "\x00" + key
}

func MakeLeaseKey(blockHeight int64, UUID string, key string) string {
	return strconv.FormatInt(blockHeight, 10) + "\x00" + MakeMetaKey(UUID, key)
}

func NewKeeper(coinKeeper bank.Keeper, storeKey sdk.StoreKey, leaseKey sdk.StoreKey, cdc *codec.Codec, mks MaxKeeperSizes) Keeper {
	return Keeper{
		CoinKeeper: coinKeeper,
		storeKey:   storeKey,
		leaseKey:   storeKey,
		cdc:        cdc,
		mks:        mks,
	}
}

func (k Keeper) GetDefaultLeaseBlocks() int64 {
	return k.mks.MaxDefaultLeaseBlocks
}

func (k Keeper) GetKVStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.storeKey)
}

func (k Keeper) GetLeaseStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.leaseKey)
}

func (k Keeper) SetValue(_ sdk.Context, store sdk.KVStore, UUID string, key string, value types.BLZValue) {
	if len(value.Value) == 0 {
		return
	}
	store.Set([]byte(MakeMetaKey(UUID, key)), k.cdc.MustMarshalBinaryBare(value))
}

func (k Keeper) GetValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string) types.BLZValue {
	metaKey := MakeMetaKey(UUID, key)
	if !k.isUUIDKeyPresent(ctx, store, metaKey) {
		return types.BLZValue{}
	}

	var bz = store.Get([]byte(metaKey))
	var value types.BLZValue
	k.cdc.MustUnmarshalBinaryBare(bz, &value)
	return value
}

func (k Keeper) DeleteValue(ctx sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, UUID string, key string) {
	metaKey := []byte(MakeMetaKey(UUID, key))
	if leaseStore != nil {
		kv := store.Get(metaKey)
		var value types.BLZValue
		k.cdc.MustUnmarshalBinaryBare(kv, &value)
		k.DeleteLease(leaseStore, UUID, key, value.Height, value.Lease)
	}
	store.Delete(metaKey)
}

func (k Keeper) IsKeyPresent(ctx sdk.Context, store sdk.KVStore, UUID string, key string) bool {
	return k.isUUIDKeyPresent(ctx, store, MakeMetaKey(UUID, key))
}

func (k Keeper) isUUIDKeyPresent(ctx sdk.Context, store sdk.KVStore, key string) bool {
	return store.Has([]byte(key))
}

func (k Keeper) GetValuesIterator(ctx sdk.Context, store sdk.KVStore) sdk.Iterator {
	return sdk.KVStorePrefixIterator(store, []byte{})
}

func (k Keeper) GetKeys(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultKeys {
	prefix := UUID + "\x00"
	iterator := sdk.KVStorePrefixIterator(store, []byte(prefix))
	defer iterator.Close()
	keys := types.QueryResultKeys{UUID: UUID, Keys: make([]string, 0)}

	keysSize := uint64(0)
	for ; iterator.Valid(); iterator.Next() {
		if (owner == nil) || func() bool {
			var bz = store.Get(iterator.Key())
			var value types.BLZValue
			k.cdc.MustUnmarshalBinaryBare(bz, &value)
			return value.Owner.Equals(owner)
		}() {
			key := string(iterator.Key())[len(prefix):]
			keysSize = uint64(len(key)) + keysSize
			if ctx.GasMeter().IsPastLimit() {
				return types.QueryResultKeys{UUID: UUID, Keys: make([]string, 0)}
			}

			if keysSize < k.mks.MaxKeysSize {
				keys.Keys = append(keys.Keys, key)
			} else {
				return keys
			}
		}
	}
	return keys
}

func (k Keeper) GetOwner(ctx sdk.Context, store sdk.KVStore, UUID string, key string) sdk.AccAddress {
	return k.GetValue(ctx, store, UUID, key).Owner
}

func (k Keeper) RenameKey(ctx sdk.Context, store sdk.KVStore, UUID string, key string, newKey string) bool {
	if k.isUUIDKeyPresent(ctx, store, MakeMetaKey(UUID, newKey)) {
		return false
	}

	value := k.GetValue(ctx, store, UUID, key)

	if value.Owner.Empty() {
		return false
	}

	k.SetValue(ctx, store, UUID, newKey, value)
	k.DeleteValue(ctx, store, nil, UUID, key)

	return true
}

func (k Keeper) GetCdc() *codec.Codec {
	return k.cdc
}

func (k Keeper) GetKeyValues(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultKeyValues {
	prefix := UUID + "\x00"
	iterator := sdk.KVStorePrefixIterator(store, []byte(prefix))
	defer iterator.Close()

	keyValues := types.QueryResultKeyValues{UUID: UUID, KeyValues: make([]types.KeyValue, 0)}

	keyValuesSize := uint64(0)
	for ; iterator.Valid(); iterator.Next() {
		var bz = store.Get(iterator.Key())
		var value types.BLZValue
		k.cdc.MustUnmarshalBinaryBare(bz, &value)

		if owner == nil || value.Owner.Equals(owner) {
			key := string(iterator.Key())[len(prefix):]
			keyValuesSize = keyValuesSize + uint64(len(key)) + uint64(len(value.Value))

			if ctx.GasMeter().IsPastLimit() {
				return types.QueryResultKeyValues{UUID: UUID, KeyValues: make([]types.KeyValue, 0)}
			}

			if keyValuesSize < k.mks.MaxKeyValuesSize {
				keyValues.KeyValues = append(keyValues.KeyValues, types.KeyValue{
					Key:   key,
					Value: value.Value,
				})
			} else {
				return keyValues
			}
		}
	}
	return keyValues
}

func (k Keeper) GetCount(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultCount {
	prefix := UUID + "\x00"
	iterator := sdk.KVStorePrefixIterator(store, []byte(prefix))
	defer iterator.Close()
	count := types.QueryResultCount{UUID: UUID}

	for ; iterator.Valid(); iterator.Next() {
		if (owner == nil) || func() bool {
			var bz = store.Get(iterator.Key())
			var value types.BLZValue
			k.cdc.MustUnmarshalBinaryBare(bz, &value)
			return value.Owner.Equals(owner)
		}() {
			count.Count += 1
		}
	}
	return count
}

func (k Keeper) DeleteAll(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) {
	prefix := UUID + "\x00"
	iterator := sdk.KVStorePrefixIterator(store, []byte(prefix))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		if func() bool {
			var bz = store.Get(iterator.Key())
			var value types.BLZValue
			k.cdc.MustUnmarshalBinaryBare(bz, &value)
			return value.Owner.Equals(owner)
		}() {
			store.Delete(iterator.Key())
		}
	}
}

func (k Keeper) SetLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, leaseBlocks int64) {
	if leaseBlocks == 0 {
		leaseBlocks = k.mks.MaxDefaultLeaseBlocks
	}

	leaseStore.Set([]byte(MakeLeaseKey(blockHeight+leaseBlocks, UUID, key)), make([]byte, 0))
}

func (k Keeper) DeleteLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, leaseBlocks int64) {
	leaseStore.Delete([]byte(MakeLeaseKey(blockHeight+leaseBlocks, UUID, key)))
}

func (k Keeper) ProcessLeasesAtBlockHeight(ctx sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, lease int64) {
	prefix := strconv.FormatInt(lease, 10) + "\x00"
	iterator := sdk.KVStorePrefixIterator(leaseStore, []byte(prefix))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		fmt.Printf("\n\tdeleting %s, %s\n", prefix, string(iterator.Key()))
		store.Delete(iterator.Key()[len(prefix):])
		leaseStore.Delete(iterator.Key())
	}
}
