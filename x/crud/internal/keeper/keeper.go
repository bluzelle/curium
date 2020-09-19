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
	"sort"
	"strconv"
	cosmosTypes "github.com/cosmos/cosmos-sdk/store/types"
)

type MaxKeeperSizes struct {
	MaxKeysSize           uint64
	MaxKeyValuesSize      uint64
	MaxDefaultLeaseBlocks int64
}

type IKeeper interface {
	DeleteAll(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress)
	DeleteLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, leaseBlocks int64)
	DeleteValue(ctx sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, UUID string, key string)
	GetCdc() *codec.Codec
	GetCount(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultCount
	GetDefaultLeaseBlocks() int64
	GetKVStore(ctx sdk.Context) sdk.KVStore
	Search(ctx sdk.Context, store sdk.KVStore, UUID string, prefix string, page, limit uint, direction string, owner sdk.AccAddress) types.QueryResultKeyValues
	GetKeyValues(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultKeyValues
	GetKeys(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultKeys
	GetLeaseStore(ctx sdk.Context) sdk.KVStore
	GetNShortestLeases(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress, n uint64) types.QueryResultNShortestLeaseKeys
	GetOwner(ctx sdk.Context, store sdk.KVStore, UUID string, key string) sdk.AccAddress
	GetValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string) types.BLZValue
	GetValuesIterator(ctx sdk.Context, store sdk.KVStore) sdk.Iterator
	IsKeyPresent(ctx sdk.Context, store sdk.KVStore, UUID string, key string) bool
	ProcessLeasesAtBlockHeight(ctx sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, lease int64)
	RenameKey(ctx sdk.Context, store sdk.KVStore, UUID string, key string, newkey string) bool
	SetLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, lease int64)
	SetValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string, value types.BLZValue)
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
		leaseKey:   leaseKey,
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

func (k Keeper) GetValue(_ sdk.Context, store sdk.KVStore, UUID string, key string) types.BLZValue {
	metaKey := MakeMetaKey(UUID, key)
	if !k.isUUIDKeyPresent(store, metaKey) {
		return types.BLZValue{}
	}

	var bz = store.Get([]byte(metaKey))
	var value types.BLZValue
	k.cdc.MustUnmarshalBinaryBare(bz, &value)
	return value
}

func (k Keeper) DeleteValue(_ sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, UUID string, key string) {
	metaKey := []byte(MakeMetaKey(UUID, key))
	if leaseStore != nil {
		kv := store.Get(metaKey)
		var value types.BLZValue
		k.cdc.MustUnmarshalBinaryBare(kv, &value)
		k.DeleteLease(leaseStore, UUID, key, value.Height, value.Lease)
	}
	store.Delete(metaKey)
}

func (k Keeper) IsKeyPresent(_ sdk.Context, store sdk.KVStore, UUID string, key string) bool {
	return k.isUUIDKeyPresent(store, MakeMetaKey(UUID, key))
}

func (k Keeper) isUUIDKeyPresent(store sdk.KVStore, key string) bool {
	return store.Has([]byte(key))
}

func (k Keeper) GetValuesIterator(_ sdk.Context, store sdk.KVStore) sdk.Iterator {
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
	if k.isUUIDKeyPresent(store, MakeMetaKey(UUID, newKey)) {
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

func (k Keeper) Search(ctx sdk.Context, store sdk.KVStore, UUID string, searchPrefix string, page, limit uint, direction string, owner sdk.AccAddress) types.QueryResultKeyValues {
	prefix := UUID + "\x00" + searchPrefix
	var iterator sdk.Iterator

	if direction == "desc" {
		// TODO: change this to be sdk instead of cosmosTypes after cosmos-sdk is fixed
		iterator = cosmosTypes.KVStoreReversePrefixIteratorPaginated(store, []byte(prefix), page, limit)
	} else {
		iterator = sdk.KVStorePrefixIteratorPaginated(store, []byte(prefix), page, limit)
	}
	defer iterator.Close()

	keyValues := types.QueryResultKeyValues{UUID: UUID, KeyValues: make([]types.KeyValue, 0)}

	keyValuesSize := uint64(0)

	for ; iterator.Valid(); iterator.Next() {
		var bz = store.Get(iterator.Key())
		var value types.BLZValue
		k.cdc.MustUnmarshalBinaryBare(bz, &value)

		if owner == nil || value.Owner.Equals(owner) {
			key := string(iterator.Key())[len(UUID) + 1:]
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

func (k Keeper) GetCount(_ sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) types.QueryResultCount {
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

func (k Keeper) DeleteAll(_ sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress) {
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

func (k Keeper) ProcessLeasesAtBlockHeight(_ sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, lease int64) {
	prefix := strconv.FormatInt(lease, 10) + "\x00"
	iterator := sdk.KVStorePrefixIterator(leaseStore, []byte(prefix))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		fmt.Printf("\n\tdeleting %s, %s\n", prefix, string(iterator.Key()))
		store.Delete(iterator.Key()[len(prefix):])
		leaseStore.Delete(iterator.Key())
	}
}

func (k Keeper) GetNShortestLeases(ctx sdk.Context, store sdk.KVStore, UUID string, owner sdk.AccAddress, n uint64) types.QueryResultNShortestLeaseKeys {
	keys := k.GetKeys(ctx, store, UUID, owner)

	if len(keys.Keys) == 0 {
		return types.QueryResultNShortestLeaseKeys{UUID: UUID, KeyLeases: make([]types.KeyLease, 0)}
	}

	var keyLeases []types.KeyLease
	for i := range keys.Keys {
		value := k.GetValue(ctx, store, UUID, keys.Keys[i])
		keyLeases = append(keyLeases, types.KeyLease{Key: keys.Keys[i], Lease: value.Lease + value.Height - ctx.BlockHeight()})
	}

	sort.Sort(types.KeyLeases(keyLeases))

	if len(keyLeases) < int(n) {
		return types.QueryResultNShortestLeaseKeys{UUID: UUID, KeyLeases: keyLeases}
	}
	return types.QueryResultNShortestLeaseKeys{UUID: UUID, KeyLeases: keyLeases[:n]}
}
