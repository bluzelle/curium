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
	"github.com/bluzelle/curium/x/crud/mocks"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/cachekv"
	"github.com/cosmos/cosmos-sdk/store/dbadapter"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	abci "github.com/tendermint/tendermint/abci/types"
	dbm "github.com/tendermint/tm-db"
	"reflect"
	"testing"
)

func initKeeperTest(t *testing.T) (sdk.Context, sdk.KVStore, []byte, *codec.Codec) {
	return sdk.NewContext(nil, abci.Header{}, false, nil),
		cachekv.NewStore(dbadapter.Store{dbm.NewMemDB()}),
		[]byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
		codec.New()
}

func Test_makeMetaKey(t *testing.T) {
	uuid := "uuid"
	key := "key"
	accepted := "uuid\x00key"

	assert.Equal(t, MakeMetaKey(uuid, key), accepted)
}

func TestKeeper_SetBLZValue(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)

	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	acceptedValue := types.BLZValue{
		Value: "value",
		Owner: owner,
	}

	keeper.SetBLZValue(ctx, testStore, "uuid", "key", acceptedValue)

	result := testStore.Get([]byte(MakeMetaKey("uuid", "key")))

	var value types.BLZValue
	cdc.MustUnmarshalBinaryBare(result, &value)

	assert.True(t, reflect.DeepEqual(acceptedValue, value))
}

func TestKeeper_GetBLZValue(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	// test value not found
	result := keeper.GetBLZValue(ctx, testStore, "uuid", "key")

	assert.True(t, reflect.DeepEqual(types.NewBLZValue(), result))

	acceptedValue := types.BLZValue{
		Value: "value",
		Owner: owner,
	}

	// set the value and test that it is found\
	keeper.SetBLZValue(ctx, testStore, "uuid", "key", acceptedValue)
	result = keeper.GetBLZValue(ctx, testStore, "uuid", "key")

	assert.True(t, reflect.DeepEqual(acceptedValue, result))
}

func TestKeeper_DeleteBLZValue(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetBLZValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "value",
		Owner: owner,
	})
	keeper.DeleteBLZValue(ctx, testStore, "uuid", "key")

	result := keeper.GetBLZValue(ctx, testStore, "uuid", "key")

	assert.True(t, reflect.DeepEqual(types.NewBLZValue(), result))
}

func TestKeeper_IsKeyPresent(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	assert.False(t, keeper.IsKeyPresent(ctx, testStore, "uuid", "key"))

	keeper.SetBLZValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "value",
		Owner: owner,
	})

	assert.True(t, keeper.IsKeyPresent(ctx, testStore, "uuid", "key"))
}

func TestKeeper_GetValuesIterator(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	result := keeper.GetValuesIterator(ctx, testStore)

	assert.False(t, result.Valid())

	keeper.SetBLZValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "value",
		Owner: owner,
	})

	result = keeper.GetValuesIterator(ctx, testStore)

	assert.True(t, result.Valid())

	result.Next()

	assert.False(t, result.Valid())
}

func TestKeeper_GetKeys(t *testing.T) {
	// TODO: ensure that we only get keys associated with the owner
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 1024})

	keys := keeper.GetKeys(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", keys.UUID)
	assert.Empty(t, keys.Keys)

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid0", "key0", types.BLZValue{Value: "value", Owner: owner})

	keys = keeper.GetKeys(ctx, testStore, "uuid", owner)

	assert.Equal(t, "uuid", keys.UUID)
	assert.Len(t, keys.Keys, 4)

	assert.Equal(t, keys.Keys[0], "key0")
	assert.Equal(t, keys.Keys[1], "key1")
	assert.Equal(t, keys.Keys[2], "key2")
	assert.Equal(t, keys.Keys[3], "key3")

	keys = keeper.GetKeys(ctx, testStore, "uuid0", nil)

	assert.Equal(t, "uuid0", keys.UUID)
	assert.Len(t, keys.Keys, 1)
}

func TestKeeper_GetKeys_no_owner_for_query_usage(t *testing.T) {
	// TODO: ensure that we only get keys associated with the owner
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 1024})

	keys := keeper.GetKeys(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", keys.UUID)
	assert.Empty(t, keys.Keys)

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid0", "key0", types.BLZValue{Value: "value", Owner: owner})

	keys = keeper.GetKeys(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", keys.UUID)
	assert.Len(t, keys.Keys, 4)

	assert.Equal(t, keys.Keys[0], "key0")
	assert.Equal(t, keys.Keys[1], "key1")
	assert.Equal(t, keys.Keys[2], "key2")
	assert.Equal(t, keys.Keys[3], "key3")

	keys = keeper.GetKeys(ctx, testStore, "uuid0", nil)

	assert.Equal(t, "uuid0", keys.UUID)
	assert.Len(t, keys.Keys, 1)
}

func TestKeeper_GetKeys_MaxSize(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)

	// test max keys size
	{
		keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 9})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})

		keys := keeper.GetKeys(ctx, testStore, "uuid", nil)

		assert.Len(t, keys.Keys, 2)
	}

	// test out of gas
	{
		mockCtrl := gomock.NewController(t)
		mockGasMeter := mocks.NewMockGasMeter(mockCtrl)
		keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 1024})
		mockGasMeter.EXPECT().IsPastLimit().Return(true)
		keys := keeper.GetKeys(ctx.WithGasMeter(mockGasMeter), testStore, "uuid", nil)

		assert.Len(t, keys.Keys, 0)
	}
}

func TestKeeper_GetOwner(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})

	actual := keeper.GetOwner(ctx, testStore, "uuid", "key0")

	assert.True(t, reflect.DeepEqual([]byte(actual), owner))
	assert.Empty(t, keeper.GetOwner(ctx, testStore, "notauuid", "notakey"))
}

func TestKeeper_RenameBLZKey(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)

	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetBLZValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "a value",
		Owner: owner,
	})

	assert.False(t, keeper.RenameBLZKey(ctx, testStore, "uuid", "badkey", "newkey"))

	assert.True(t, keeper.RenameBLZKey(ctx, testStore, "uuid", "key", "newkey"))

	assert.True(t, reflect.DeepEqual(keeper.GetBLZValue(ctx, testStore, "uuid", "newkey"), types.BLZValue{
		Value: "a value",
		Owner: owner,
	}))
}

func TestKeeper_GetKeyValues(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 1024})

	kvs := keeper.GetKeyValues(ctx, testStore, "uuid", owner)

	assert.Equal(t, "uuid", kvs.UUID)
	assert.Empty(t, kvs.KeyValues)

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value0", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value1", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value2", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value3"})

	kvs = keeper.GetKeyValues(ctx, testStore, "uuid", owner)
	assert.Equal(t, "uuid", kvs.UUID)
	assert.Len(t, kvs.KeyValues, 3)

	assert.Equal(t, types.KeyValue{Key: "key0", Value: "value0"}, kvs.KeyValues[0])
	assert.Equal(t, types.KeyValue{Key: "key1", Value: "value1"}, kvs.KeyValues[1])
	assert.Equal(t, types.KeyValue{Key: "key2", Value: "value2"}, kvs.KeyValues[2])
}

func TestKeeper_GetKeyValues_no_owner_for_query_usage(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 1024})

	kvs := keeper.GetKeyValues(ctx, testStore, "uuid", owner)

	assert.Equal(t, "uuid", kvs.UUID)
	assert.Empty(t, kvs.KeyValues)

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value0", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value1", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value2", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value3",
		Owner: []byte("bluzelle1rnnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wq")})

	kvs = keeper.GetKeyValues(ctx, testStore, "uuid", nil)
	assert.Equal(t, "uuid", kvs.UUID)
	assert.Len(t, kvs.KeyValues, 4)

	assert.Equal(t, kvs.KeyValues[0], types.KeyValue{Key: "key0", Value: "value0"})
	assert.Equal(t, kvs.KeyValues[1], types.KeyValue{Key: "key1", Value: "value1"})
	assert.Equal(t, kvs.KeyValues[2], types.KeyValue{Key: "key2", Value: "value2"})
	assert.Equal(t, kvs.KeyValues[3], types.KeyValue{Key: "key3", Value: "value3"})
}

func TestKeeper_GetKeyValues_MaxSize(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)

	// test max keys size
	{
		keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 19})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})

		keyValues := keeper.GetKeyValues(ctx, testStore, "uuid", owner)

		assert.Len(t, keyValues.KeyValues, 2)
	}

	// test out of gas
	{
		mockCtrl := gomock.NewController(t)
		mockGasMeter := mocks.NewMockGasMeter(mockCtrl)
		keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 1024})
		mockGasMeter.EXPECT().IsPastLimit().Return(true)
		keyValues := keeper.GetKeyValues(ctx.WithGasMeter(mockGasMeter), testStore, "uuid", owner)

		assert.Len(t, keyValues.KeyValues, 0)
	}
}

func TestKeeper_GetCount(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	count := keeper.GetCount(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(0), count.Count)

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid0", "key0", types.BLZValue{Value: "value", Owner: owner})

	count = keeper.GetCount(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(4), count.Count)

	count = keeper.GetCount(ctx, testStore, "uuid0", owner)

	assert.Equal(t, "uuid0", count.UUID)
	assert.Equal(t, uint64(1), count.Count)
}

func TestKeeper_GetCount_no_owner_for_query_usage(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	count := keeper.GetCount(ctx, testStore, "uuid", nil)
	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(0), count.Count)

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value",
		Owner: []byte("bluzelle1rnnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wq")})

	count = keeper.GetCount(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(4), count.Count)
}

func TestKeeper_DeleteAll(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest(t)
	keeper := NewKeeper(nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetBLZValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetBLZValue(ctx, testStore, "uuid", "key", types.BLZValue{Value: "value", Owner: []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")})

	keeper.DeleteAll(ctx, testStore, "uuid", owner)

	count := keeper.GetCount(ctx, testStore, "uuid", owner)
	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(0), count.Count)

	count = keeper.GetCount(ctx, testStore, "uuid", []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr"))
	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(1), count.Count)
}
