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
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank"
)

type MaxKeeperSizes struct {
	MaxKeysSize uint64
}

type IKeeper interface {
	SetBLZValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string, value types.BLZValue)
	GetBLZValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string) types.BLZValue
	DeleteBLZValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string)
	IsKeyPresent(ctx sdk.Context, store sdk.KVStore, UUID string, key string) bool
	GetValuesIterator(ctx sdk.Context, store sdk.KVStore) sdk.Iterator
	GetKeys(ctx sdk.Context, store sdk.KVStore, UUID string) types.QueryResultKeys
	GetOwner(ctx sdk.Context, store sdk.KVStore, UUID string, key string) sdk.AccAddress
	GetKVStore(ctx sdk.Context) sdk.KVStore
	RenameBLZKey(ctx sdk.Context, store sdk.KVStore, UUID string, key string, newkey string) bool
}

type Keeper struct {
	CoinKeeper bank.Keeper
	storeKey   sdk.StoreKey
	cdc        *codec.Codec
	mks        MaxKeeperSizes
}

// Note: MakeMetaKey is used in query.go and keeper.go
func MakeMetaKey(UUID string, key string) string {
	return UUID + "\x00" + key
}

func NewKeeper(coinKeeper bank.Keeper, storeKey sdk.StoreKey, cdc *codec.Codec, mks MaxKeeperSizes) Keeper {
	return Keeper{
		CoinKeeper: coinKeeper,
		storeKey:   storeKey,
		cdc:        cdc,
		mks:        mks,
	}
}

func (k Keeper) GetKVStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.storeKey)
}

func (k Keeper) SetBLZValue(_ sdk.Context, store sdk.KVStore, UUID string, key string, value types.BLZValue) {
	if len(value.Value) == 0 {
		return
	}
	store.Set([]byte(MakeMetaKey(UUID, key)), k.cdc.MustMarshalBinaryBare(value))
}

func (k Keeper) GetBLZValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string) types.BLZValue {
	BLZKey := MakeMetaKey(UUID, key)
	if !k.isUUIDKeyPresent(ctx, store, BLZKey) {
		return types.NewBLZValue()
	}

	var bz = store.Get([]byte(BLZKey))
	var value types.BLZValue
	k.cdc.MustUnmarshalBinaryBare(bz, &value)
	return value
}

func (k Keeper) DeleteBLZValue(ctx sdk.Context, store sdk.KVStore, UUID string, key string) {
	store.Delete([]byte(MakeMetaKey(UUID, key)))
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

func (k Keeper) GetKeys(ctx sdk.Context, store sdk.KVStore, UUID string) types.QueryResultKeys {
	prefix := UUID + "\x00"
	iterator := sdk.KVStorePrefixIterator(store, []byte(prefix))
	keys := types.QueryResultKeys{UUID: UUID, Keys: make([]string, 0)}
	defer iterator.Close()

	keysSize := uint64(0)
	for ; iterator.Valid(); iterator.Next() {
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
	return keys
}

func (k Keeper) GetOwner(ctx sdk.Context, store sdk.KVStore, UUID string, key string) sdk.AccAddress {
	return k.GetBLZValue(ctx, store, UUID, key).Owner
}

func (k Keeper) RenameBLZKey(ctx sdk.Context, store sdk.KVStore, UUID string, key string, newKey string) bool {
	BLZNewKey := MakeMetaKey(UUID, newKey)
	if k.isUUIDKeyPresent(ctx, store, BLZNewKey) {
		return false
	}

	value := k.GetBLZValue(ctx, store, UUID, key)

	if value.Owner.Empty() {
		return false
	}

	k.SetBLZValue(ctx, store, UUID, newKey, value)
	k.DeleteBLZValue(ctx, store, UUID, key)

	return true
}
