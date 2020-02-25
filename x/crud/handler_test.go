package crud

import (
	"encoding/json"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/bluzelle/curium/x/crud/mocks"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"reflect"
	"testing"
)

func initTest(t *testing.T) (*gomock.Controller, *mocks.MockIKeeper, sdk.Context, []byte) {
	mockCtrl := gomock.NewController(t)
	return mockCtrl, mocks.NewMockIKeeper(mockCtrl), sdk.Context{}, []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
}

func Test_handleMsgBLZCreate(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple Unit
	{
		create_msg := types.MsgBLZCreate{
			UUID:  "uuid",
			Key:   "key",
			Value: "value",
			Owner: owner,
		}

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		// testing key already exists
		mockKeeper.EXPECT().GetBLZValue(ctx, nil, create_msg.UUID, create_msg.Key).Return(types.BLZValue{Value: create_msg.Value, Owner: owner})

		result := handleMsgBLZCreate(ctx, mockKeeper, create_msg)

		assert.False(t, result.IsOK(), result.Log)

		// test valid create message
		mockKeeper.EXPECT().GetBLZValue(ctx, nil, create_msg.UUID, create_msg.Key)
		mockKeeper.EXPECT().SetBLZValue(ctx, nil, create_msg.UUID, create_msg.Key, types.BLZValue{Value: create_msg.Value, Owner: create_msg.Owner})

		result = handleMsgBLZCreate(ctx, mockKeeper, create_msg)

		assert.True(t, result.IsOK())
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{})
		assert.False(t, result.IsOK())

		result = handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{UUID: "uuid"})
		assert.False(t, result.IsOK())

		result = handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{UUID: "uuid", Key: "key"})
		assert.False(t, result.IsOK())
	}
}

func Test_handleMsgBLZRead(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Key not found test
	{
		read_msg := types.MsgBLZRead{
			UUID:  "uuid",
			Key:   "key",
			Owner: owner,
		}

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, read_msg.UUID, read_msg.Key)

		result := handleMsgBLZRead(ctx, mockKeeper, read_msg)

		assert.False(t, result.IsOK())
	}

	// key returned in result
	{
		read_msg := types.MsgBLZRead{
			UUID:  "uuid",
			Key:   "key",
			Owner: owner,
		}
		mockKeeper.EXPECT().GetOwner(ctx, nil, read_msg.UUID, read_msg.Key).Return(owner)
		mockKeeper.EXPECT().GetBLZValue(ctx, nil, read_msg.UUID, read_msg.Key).Return(types.BLZValue{Value: "utest", Owner: owner})

		result := handleMsgBLZRead(ctx, mockKeeper, read_msg)

		assert.True(t, result.IsOK())
		assert.NotEmpty(t, result.Data)

		json_result := types.BLZValue{}
		json.Unmarshal(result.Data, &json_result)

		assert.Equal(t, json_result.Value, "utest")
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{})
		assert.False(t, result.IsOK())

		result = handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{UUID: "uuid"})
		assert.False(t, result.IsOK())

		result = handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{UUID: "uuid", Key: "key"})
		assert.False(t, result.IsOK())
	}
}

func Test_handleMsgBLZUpdate(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple Update test
	{
		updateMsg := types.MsgBLZUpdate{
			UUID:  "uuid",
			Key:   "key",
			Value: "value",
			Owner: owner,
		}

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().SetBLZValue(ctx, nil, updateMsg.UUID, updateMsg.Key, types.BLZValue{
			Value: "value",
			Owner: owner,
		})

		result := handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)
		assert.True(t, result.IsOK())

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key)
		result = handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)
		assert.False(t, result.IsOK())

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		updateMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		result = handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)
		assert.False(t, result.IsOK())
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{})
		assert.False(t, result.IsOK())

		result = handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{UUID: "uuid"})
		assert.False(t, result.IsOK())

		result = handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{UUID: "uuid", Key: "key"})
		assert.False(t, result.IsOK())
	}
}

func Test_handleMsgBLZDelete(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple delete test key does not exist
	{
		deleteMsg := types.MsgBLZDelete{UUID: "uuid", Key: "key", Owner: owner}

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key)

		result := handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)
		assert.False(t, result.IsOK())

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key).Return(
			[]byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr"))

		result = handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)
		assert.False(t, result.IsOK())

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key).Return(owner)
		mockKeeper.EXPECT().DeleteBLZValue(ctx, nil, deleteMsg.UUID, deleteMsg.Key)
		result = handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)

		assert.True(t, result.IsOK())
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{})
		assert.False(t, result.IsOK())

		result = handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{UUID: "uuid"})
		assert.False(t, result.IsOK())

		result = handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{UUID: "uuid", Key: "key"})
		assert.False(t, result.IsOK())
	}
}

func Test_handleMsgBLZKeys(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple keys test key does not exist
	{
		keysMsg := types.MsgBLZKeys{
			UUID:  "uuid",
			Owner: owner,
		}

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		acceptedKeys := []string{"one", "two", "three"}
		mockKeeper.EXPECT().GetKeys(ctx, nil, keysMsg.UUID).Return(types.QueryResultKeys{UUID: "uuid", Keys: acceptedKeys})

		result := handleMsgBLZKeys(ctx, mockKeeper, keysMsg)
		assert.True(t, result.IsOK())
		assert.NotEmpty(t, result.Data)

		json_result := types.QueryResultKeys{}
		json.Unmarshal(result.Data, &json_result)

		assert.True(t, reflect.DeepEqual(json_result.Keys, acceptedKeys))
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZKeys(ctx, mockKeeper, types.MsgBLZKeys{})
		assert.False(t, result.IsOK())

		result = handleMsgBLZKeys(ctx, mockKeeper, types.MsgBLZKeys{UUID: "uuid"})
		assert.False(t, result.IsOK())
	}
}

func Test_handleMsgBLZHas(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple keys test key does not exist
	{
		hasMsg := types.MsgBLZHas{
			UUID:  "uuid",
			Key:   "key",
			Owner: owner,
		}
		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, hasMsg.UUID, hasMsg.Key).Return(owner)

		result := handleMsgBLZHas(ctx, mockKeeper, hasMsg)
		assert.True(t, result.IsOK())

		json_result := types.QueryResultHas{}
		json.Unmarshal(result.Data, &json_result)

		assert.True(t, json_result.Has)
		assert.Equal(t, json_result.UUID, hasMsg.UUID)
		assert.Equal(t, json_result.Key, hasMsg.Key)

		mockKeeper.EXPECT().GetOwner(ctx, nil, hasMsg.UUID, hasMsg.Key)

		result = handleMsgBLZHas(ctx, mockKeeper, hasMsg)
		assert.True(t, result.IsOK())

		json_result = types.QueryResultHas{}
		json.Unmarshal(result.Data, &json_result)
		assert.False(t, json_result.Has)
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZHas(ctx, mockKeeper, types.MsgBLZHas{})
		assert.False(t, result.IsOK())

		result = handleMsgBLZHas(ctx, mockKeeper, types.MsgBLZHas{UUID: "uuid"})
		assert.False(t, result.IsOK())
	}
}
