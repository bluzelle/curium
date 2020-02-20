package crud

import (
	"encoding/json"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/bluzelle/curium/x/crud/mocks"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/golang/mock/gomock"
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

		// testing key already exists
		mockKeeper.EXPECT().GetBLZValue(ctx, create_msg.UUID, create_msg.Key).Return(types.BLZValue{Value: create_msg.Value, Owner: owner})

		result := handleMsgBLZCreate(ctx, mockKeeper, create_msg)

		if result.IsOK() {
			t.Errorf("handleMsgBLZCreate: %s", result.Log)
		}

		// test valid create message
		mockKeeper.EXPECT().GetBLZValue(ctx, create_msg.UUID, create_msg.Key)
		mockKeeper.EXPECT().SetBLZValue(ctx, create_msg.UUID, create_msg.Key, types.BLZValue{Value: create_msg.Value, Owner: create_msg.Owner})

		result = handleMsgBLZCreate(ctx, mockKeeper, create_msg)

		if !result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{})

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
		result = handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{UUID: "uuid"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{UUID: "uuid", Key: "key"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
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
		mockKeeper.EXPECT().GetOwner(ctx, read_msg.UUID, read_msg.Key)

		result := handleMsgBLZRead(ctx, mockKeeper, read_msg)

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == false")
		}
	}

	// key returned in result
	{
		read_msg := types.MsgBLZRead{
			UUID:  "uuid",
			Key:   "key",
			Owner: owner,
		}
		mockKeeper.EXPECT().GetOwner(ctx, read_msg.UUID, read_msg.Key).Return(owner)
		mockKeeper.EXPECT().GetBLZValue(ctx, read_msg.UUID, read_msg.Key).Return(types.BLZValue{Value: "utest", Owner: owner})

		result := handleMsgBLZRead(ctx, mockKeeper, read_msg)

		if !result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		if len(result.Data) == 0 {
			t.Error("Result data empty")
		}

		json_result := types.BLZValue{}

		json.Unmarshal(result.Data, &json_result)

		if json_result.Value != "utest" {
			t.Errorf("value != utest")
		}
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{})

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{UUID: "uuid"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{UUID: "uuid", Key: "key"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
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

		mockKeeper.EXPECT().GetOwner(ctx, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().SetBLZValue(ctx, updateMsg.UUID, updateMsg.Key, types.BLZValue{
			Value: "value",
			Owner: owner,
		})

		result := handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)
		if !result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		mockKeeper.EXPECT().GetOwner(ctx, updateMsg.UUID, updateMsg.Key)
		result = handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == false")
		}

		mockKeeper.EXPECT().GetOwner(ctx, updateMsg.UUID, updateMsg.Key).Return(owner)
		updateMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		result = handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == false")
		}

	}

	// Test for empty message parameters
	{
		result := handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{})

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{UUID: "uuid"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{UUID: "uuid", Key: "key"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
	}
}

func Test_handleMsgBLZDelete(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple delete test key does not exist
	{
		deleteMsg := types.MsgBLZDelete{UUID: "uuid", Key: "key", Owner: owner}

		mockKeeper.EXPECT().GetOwner(ctx, deleteMsg.UUID, deleteMsg.Key)

		result := handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == false")
		}

		mockKeeper.EXPECT().GetOwner(ctx, deleteMsg.UUID, deleteMsg.Key).Return(
			[]byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr"))

		result = handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == false")
		}

		mockKeeper.EXPECT().GetOwner(ctx, deleteMsg.UUID, deleteMsg.Key).Return(owner)
		mockKeeper.EXPECT().DeleteBLZValue(ctx, deleteMsg.UUID, deleteMsg.Key)
		result = handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)

		if !result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{})

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{UUID: "uuid"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{UUID: "uuid", Key: "key"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
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

		acceptedKeys := []string{"one", "two", "three"}
		mockKeeper.EXPECT().GetKeys(ctx, keysMsg.UUID).Return(types.QueryResultKeys{UUID: "uuid", Keys: acceptedKeys})

		result := handleMsgBLZKeys(ctx, mockKeeper, keysMsg)

		if !result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		if len(result.Data) == 0 {
			t.Error("Result data empty")
		}

		json_result := types.QueryResultKeys{}

		json.Unmarshal(result.Data, &json_result)

		if !reflect.DeepEqual(json_result.Keys, acceptedKeys) {
			t.Errorf("json_result != acceptedKeys")
		}
	}

	// Test for empty message parameters
	{
		result := handleMsgBLZKeys(ctx, mockKeeper, types.MsgBLZKeys{})

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZKeys(ctx, mockKeeper, types.MsgBLZKeys{UUID: "uuid"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
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

		mockKeeper.EXPECT().GetOwner(ctx, hasMsg.UUID, hasMsg.Key).Return(owner)

		result := handleMsgBLZHas(ctx, mockKeeper, hasMsg)

		if !result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		json_result := types.QueryResultHas{}

		json.Unmarshal(result.Data, &json_result)

		if !json_result.Has {
			t.Error("Expected: json_result.Has == true")
		}

		if json_result.UUID != hasMsg.UUID || json_result.Key != hasMsg.Key {
			t.Error("Expected: UUID/Key not valid")
		}

		mockKeeper.EXPECT().GetOwner(ctx, hasMsg.UUID, hasMsg.Key)

		result = handleMsgBLZHas(ctx, mockKeeper, hasMsg)

		if !result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		json_result = types.QueryResultHas{}

		json.Unmarshal(result.Data, &json_result)

		if json_result.Has {
			t.Error("Expected: json_result.Has == false")
		}

	}

	// Test for empty message parameters
	{
		result := handleMsgBLZHas(ctx, mockKeeper, types.MsgBLZHas{})

		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}

		result = handleMsgBLZHas(ctx, mockKeeper, types.MsgBLZHas{UUID: "uuid"})
		if result.IsOK() {
			t.Error("Expected: result.IsOK() == true")
		}
	}

}
