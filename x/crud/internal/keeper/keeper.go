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

package keeper

import (
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank"
)

type Keeper struct {
	CoinKeeper bank.Keeper
	storeKey   sdk.StoreKey
	cdc        *codec.Codec
}

func MakeMetaKey(UUID string, key string) string {
	return UUID + "\x00" + key
}

func (k Keeper) SetBLZValue(ctx sdk.Context, UUID string, key string, value types.BLZValue) {
	if len(value.Value) == 0 {
		return
	}
	store := ctx.KVStore(k.storeKey)
	store.Set([]byte(MakeMetaKey(UUID, key)), k.cdc.MustMarshalBinaryBare(value))
}

func (k Keeper) GetBLZValue(ctx sdk.Context, UUID string, key string) types.BLZValue {
	BLZKey := MakeMetaKey(UUID, key)
	store := ctx.KVStore(k.storeKey)
	if !k.IsUUIDKeyPresent(ctx, BLZKey) {
		return types.NewBLZValue()
	}

	var bz = store.Get([]byte(BLZKey))
	var value types.BLZValue
	k.cdc.MustUnmarshalBinaryBare(bz, &value)
	return value
}

func (k Keeper) DeleteBLZValue(ctx sdk.Context, UUID string, key string) {
	store := ctx.KVStore(k.storeKey)
	store.Delete([]byte(MakeMetaKey(UUID, key)))
}

func (k Keeper) IsKeyPresent(ctx sdk.Context, UUID string, key string) bool {
	return k.IsUUIDKeyPresent(ctx, MakeMetaKey(UUID, key))
}

func (k Keeper) IsUUIDKeyPresent(ctx sdk.Context, key string) bool {
	store := ctx.KVStore(k.storeKey)
	return store.Has([]byte(key))
}

func (k Keeper) GetValuesIterator(ctx sdk.Context) sdk.Iterator {
	store := ctx.KVStore(k.storeKey)
	return sdk.KVStorePrefixIterator(store, []byte{})
}

func (k Keeper) GetKeys(ctx sdk.Context, UUID string) types.QueryResultKeys {
	store := ctx.KVStore(k.storeKey)
	prefix := UUID + "\x00"
	iterator := sdk.KVStorePrefixIterator(store, []byte(prefix))
	keys := types.QueryResultKeys{UUID: UUID}

	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		keys.Keys = append(keys.Keys, string(iterator.Key())[len(prefix):])
	}
	return keys
}

func NewKeeper(coinKeeper bank.Keeper, storeKey sdk.StoreKey, cdc *codec.Codec) Keeper {
	return Keeper{
		CoinKeeper: coinKeeper,
		storeKey:   storeKey,
		cdc:        cdc,
	}
}

func (k Keeper) GetOwner(ctx sdk.Context, UUID string, key string) sdk.AccAddress {
	return k.GetBLZValue(ctx, UUID, key).Owner
}
