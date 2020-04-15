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
	"fmt"
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
	"strconv"
	"testing"
)

const DefaultLeaseBlockHeight = int64(10 * 86400 / 5) // (10 days of blocks * seconds/day) / 5

func initKeeperTest() (sdk.Context, sdk.KVStore, []byte, *codec.Codec) {
	return sdk.NewContext(nil, abci.Header{}, false, nil),
		cachekv.NewStore(dbadapter.Store{DB: dbm.NewMemDB()}),
		[]byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
		codec.New()
}

func Test_MakeMetaKey(t *testing.T) {
	uuid := "uuid"
	key := "key"
	accepted := "uuid\x00key"

	assert.Equal(t, MakeMetaKey(uuid, key), accepted)
}

func Test_MakeLeaseKey(t *testing.T) {
	uuid := "uuid"
	key := "key"
	accepted := "123\x00uuid\x00key"
	assert.Equal(t, MakeLeaseKey(123, uuid, key), accepted)
}

func TestKeeper_SetValue(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()

	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	acceptedValue := types.BLZValue{
		Value: "value",
		Owner: owner,
	}

	keeper.SetValue(ctx, testStore, "uuid", "key", acceptedValue)

	result := testStore.Get([]byte(MakeMetaKey("uuid", "key")))

	var value types.BLZValue
	cdc.MustUnmarshalBinaryBare(result, &value)

	assert.True(t, reflect.DeepEqual(acceptedValue, value))

	acceptedValue = types.BLZValue{
		Owner: owner,
	}

	keeper.SetValue(ctx, testStore, "uuid", "key00", acceptedValue)
	assert.False(t, testStore.Has([]byte(MakeMetaKey("uuid", "key00"))))
}

func TestKeeper_GetValue(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	// test value not found
	result := keeper.GetValue(ctx, testStore, "uuid", "key")

	assert.True(t, reflect.DeepEqual(types.BLZValue{}, result))

	acceptedValue := types.BLZValue{
		Value: "value",
		Owner: owner,
	}

	// set the value and test that it is found\
	keeper.SetValue(ctx, testStore, "uuid", "key", acceptedValue)
	result = keeper.GetValue(ctx, testStore, "uuid", "key")

	assert.True(t, reflect.DeepEqual(acceptedValue, result))
}

func TestKeeper_DeleteValue(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "value",
		Owner: owner,
	})
	keeper.SetLease(testStore, "uuid", "key", 0, 0)

	assert.True(t, testStore.Has([]byte(MakeLeaseKey(0, "uuid", "key"))))

	keeper.DeleteValue(ctx, testStore, testStore, "uuid", "key")

	assert.False(t, testStore.Has([]byte(MakeLeaseKey(0, "uuid", "key"))))

	result := keeper.GetValue(ctx, testStore, "uuid", "key")

	assert.True(t, reflect.DeepEqual(types.BLZValue{}, result))
}

func TestKeeper_IsKeyPresent(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	assert.False(t, keeper.IsKeyPresent(ctx, testStore, "uuid", "key"))

	keeper.SetValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "value",
		Owner: owner,
	})

	assert.True(t, keeper.IsKeyPresent(ctx, testStore, "uuid", "key"))
}

func TestKeeper_GetValuesIterator(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	result := keeper.GetValuesIterator(ctx, testStore)

	assert.False(t, result.Valid())

	keeper.SetValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "value",
		Owner: owner,
	})

	result = keeper.GetValuesIterator(ctx, testStore)

	assert.True(t, result.Valid())

	result.Next()

	assert.False(t, result.Valid())
}

func TestKeeper_GetKeys(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 1024})

	keys := keeper.GetKeys(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", keys.UUID)
	assert.Empty(t, keys.Keys)

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid0", "key0", types.BLZValue{Value: "value", Owner: owner})

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
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 1024})

	keys := keeper.GetKeys(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", keys.UUID)
	assert.Empty(t, keys.Keys)

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid0", "key0", types.BLZValue{Value: "value", Owner: owner})

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
	ctx, testStore, owner, cdc := initKeeperTest()

	// test max keys size
	{
		keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 9})
		keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})

		keys := keeper.GetKeys(ctx, testStore, "uuid", nil)

		assert.Len(t, keys.Keys, 2)
	}

	// test out of gas
	{
		mockCtrl := gomock.NewController(t)
		mockGasMeter := mocks.NewMockGasMeter(mockCtrl)
		keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 1024})
		mockGasMeter.EXPECT().IsPastLimit().Return(true)
		keys := keeper.GetKeys(ctx.WithGasMeter(mockGasMeter), testStore, "uuid", nil)

		assert.Len(t, keys.Keys, 0)
	}
}

func TestKeeper_GetOwner(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})

	actual := keeper.GetOwner(ctx, testStore, "uuid", "key0")

	assert.True(t, reflect.DeepEqual([]byte(actual), owner))
	assert.Empty(t, keeper.GetOwner(ctx, testStore, "notauuid", "notakey"))
}

func TestKeeper_RenameKey(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()

	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetValue(ctx, testStore, "uuid", "key", types.BLZValue{
		Value: "a value",
		Owner: owner,
	})

	assert.False(t, keeper.RenameKey(ctx, testStore, "uuid", "badkey", "newkey"))

	assert.True(t, keeper.RenameKey(ctx, testStore, "uuid", "key", "newkey"))

	assert.False(t, keeper.RenameKey(ctx, testStore, "uuid", "key", "newkey"))

	assert.True(t, reflect.DeepEqual(keeper.GetValue(ctx, testStore, "uuid", "newkey"), types.BLZValue{
		Value: "a value",
		Owner: owner,
	}))

}

func TestKeeper_GetKeyValues(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 1024})

	kvs := keeper.GetKeyValues(ctx, testStore, "uuid", owner)

	assert.Equal(t, "uuid", kvs.UUID)
	assert.Empty(t, kvs.KeyValues)

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value0", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value1", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value2", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value3"})

	kvs = keeper.GetKeyValues(ctx, testStore, "uuid", owner)
	assert.Equal(t, "uuid", kvs.UUID)
	assert.Len(t, kvs.KeyValues, 3)

	assert.Equal(t, types.KeyValue{Key: "key0", Value: "value0"}, kvs.KeyValues[0])
	assert.Equal(t, types.KeyValue{Key: "key1", Value: "value1"}, kvs.KeyValues[1])
	assert.Equal(t, types.KeyValue{Key: "key2", Value: "value2"}, kvs.KeyValues[2])
}

func TestKeeper_GetKeyValues_no_owner_for_query_usage(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 1024})

	kvs := keeper.GetKeyValues(ctx, testStore, "uuid", owner)

	assert.Equal(t, "uuid", kvs.UUID)
	assert.Empty(t, kvs.KeyValues)

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value0", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value1", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value2", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value3",
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
	ctx, testStore, owner, cdc := initKeeperTest()

	// test max keys size
	{
		keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 19})
		keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
		keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})

		keyValues := keeper.GetKeyValues(ctx, testStore, "uuid", owner)

		assert.Len(t, keyValues.KeyValues, 2)
	}

	// test out of gas
	{
		mockCtrl := gomock.NewController(t)
		mockGasMeter := mocks.NewMockGasMeter(mockCtrl)
		keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeyValuesSize: 1024})
		mockGasMeter.EXPECT().IsPastLimit().Return(true)
		keyValues := keeper.GetKeyValues(ctx.WithGasMeter(mockGasMeter), testStore, "uuid", owner)

		assert.Len(t, keyValues.KeyValues, 0)
	}
}

func TestKeeper_GetCount(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	count := keeper.GetCount(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(0), count.Count)

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid0", "key0", types.BLZValue{Value: "value", Owner: owner})

	count = keeper.GetCount(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(4), count.Count)

	count = keeper.GetCount(ctx, testStore, "uuid0", owner)

	assert.Equal(t, "uuid0", count.UUID)
	assert.Equal(t, uint64(1), count.Count)
}

func TestKeeper_GetCount_no_owner_for_query_usage(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	count := keeper.GetCount(ctx, testStore, "uuid", nil)
	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(0), count.Count)

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value",
		Owner: []byte("bluzelle1rnnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wq")})

	count = keeper.GetCount(ctx, testStore, "uuid", nil)

	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(4), count.Count)
}

func TestKeeper_DeleteAll(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{})

	keeper.SetValue(ctx, testStore, "uuid", "key0", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key1", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key2", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key3", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetValue(ctx, testStore, "uuid", "key", types.BLZValue{Value: "value", Owner: []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")})

	keeper.DeleteAll(ctx, testStore, "uuid", owner)

	count := keeper.GetCount(ctx, testStore, "uuid", owner)
	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(0), count.Count)

	count = keeper.GetCount(ctx, testStore, "uuid", []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr"))
	assert.Equal(t, "uuid", count.UUID)
	assert.Equal(t, uint64(1), count.Count)
}

func TestKeeper_SetLease(t *testing.T) {
	ctx, testStore, _, cdc := initKeeperTest()
	ctx = ctx.WithBlockHeight(2000)
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxDefaultLeaseBlocks: DefaultLeaseBlockHeight})
	keeper.SetLease(testStore, "uuid", "key", ctx.BlockHeight(), 0)
	leaseKey := strconv.FormatInt(ctx.BlockHeight()+DefaultLeaseBlockHeight, 10) + "\x00" + MakeMetaKey("uuid", "key")

	assert.True(t, testStore.Has([]byte(leaseKey)))

	keeper.SetLease(testStore, "uuid00", "key00", ctx.BlockHeight(), 600000)
	leaseKey = strconv.FormatInt(ctx.BlockHeight()+int64(600000), 10) + "\x00" + MakeMetaKey("uuid00", "key00")
	assert.True(t, testStore.Has([]byte(leaseKey)))
}

func TestKeeper_DeleteLease(t *testing.T) {
	ctx, testStore, _, cdc := initKeeperTest()
	ctx = ctx.WithBlockHeight(2000)

	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxDefaultLeaseBlocks: DefaultLeaseBlockHeight})
	keeper.SetLease(testStore, "uuid", "key", ctx.BlockHeight(), 0)

	leaseKey := strconv.FormatInt(ctx.BlockHeight()+DefaultLeaseBlockHeight, 10) + "\x00" + MakeMetaKey("uuid", "key")
	assert.True(t, testStore.Has([]byte(leaseKey)))

	keeper.DeleteLease(testStore, "uuid", "key", ctx.BlockHeight(), DefaultLeaseBlockHeight)
	assert.False(t, testStore.Has([]byte(leaseKey)))
}

func TestKeeper_ProcessLeasesAtBlockHeight(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()

	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxDefaultLeaseBlocks: DefaultLeaseBlockHeight})

	keeper.SetValue(ctx, testStore, "uuid", "key00", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetLease(testStore, "uuid", "key00", 0, 1)

	keeper.SetValue(ctx, testStore, "uuid", "key01", types.BLZValue{Value: "value", Owner: owner})
	keeper.SetLease(testStore, "uuid", "key01", 0, 2000)

	keeper.ProcessLeasesAtBlockHeight(ctx, testStore, testStore, 2000)

	assert.True(t, testStore.Has([]byte(MakeLeaseKey(1, "uuid", "key00"))))
	assert.False(t, testStore.Has([]byte(MakeLeaseKey(2000, "uuid", "key01"))))

	keeper.ProcessLeasesAtBlockHeight(ctx, testStore, testStore, 1)
	assert.False(t, testStore.Has([]byte(MakeLeaseKey(1, "uuid", "key00"))))
}

func TestKeeper_GetDefaultLeaseBlocks(t *testing.T) {
	_, _, _, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxDefaultLeaseBlocks: DefaultLeaseBlockHeight})
	assert.Equal(t, DefaultLeaseBlockHeight, keeper.GetDefaultLeaseBlocks())
}

func TestKeeper_GetCdc(t *testing.T) {
	_, _, _, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxDefaultLeaseBlocks: DefaultLeaseBlockHeight})

	assert.Equal(t, cdc, keeper.GetCdc())
}

func TestKeeper_GetNShortestLeases(t *testing.T) {
	ctx, testStore, owner, cdc := initKeeperTest()
	keeper := NewKeeper(nil, nil, nil, cdc, MaxKeeperSizes{MaxKeysSize: 1024})

	currentBlockHeight := int64(1)

	for i := 0; i < 10; i++ {
		l := int64(10000 - 10*i)
		value := types.BLZValue{
			Value:  "value",
			Lease:  l,
			Height: 1000,
			Owner:  owner,
		}
		testStore.Set([]byte(MakeMetaKey("uuid", fmt.Sprintf("key%d", l))), cdc.MustMarshalBinaryBare(value))
	}

	// there are at least 10 keys
	newCtx := ctx.WithBlockHeight(currentBlockHeight)
	response := keeper.GetNShortestLeases(newCtx, testStore, "uuid", owner, 5)

	assert.Equal(t, "uuid", response.UUID)
	assert.Equal(t, 5, len(response.KeyLeases))

	assert.Equal(t, "key9910", response.KeyLeases[0].Key)
	assert.Equal(t, 9910+1000-currentBlockHeight, response.KeyLeases[0].Lease)

	response = keeper.GetNShortestLeases(newCtx, testStore, "wronguuid", owner, 5)
	assert.Equal(t, "wronguuid", response.UUID)
	assert.Equal(t, 0, len(response.KeyLeases))

	response = keeper.GetNShortestLeases(newCtx, testStore, "uuid", owner, 11)
	assert.Equal(t, "uuid", response.UUID)
	assert.Equal(t, 10, len(response.KeyLeases))

}
