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

type BadMsg struct {
}

func (msg BadMsg) Route() string                { return RouterKey }
func (msg BadMsg) Type() string                 { return "badMsg" }
func (msg BadMsg) ValidateBasic() sdk.Error     { return nil }
func (msg BadMsg) GetSignBytes() []byte         { return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg)) }
func (msg BadMsg) GetSigners() []sdk.AccAddress { return []sdk.AccAddress{} }

func Test_handleMsgBLZCreate(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple Unit
	{
		createMsg := types.MsgBLZCreate{
			UUID:  "uuid",
			Key:   "key",
			Value: "value",
			Owner: owner,
		}

		assert.Equal(t, createMsg.Type(), "create")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		// testing key already exists
		mockKeeper.EXPECT().GetBLZValue(ctx, nil, createMsg.UUID, createMsg.Key).Return(types.BLZValue{Value: createMsg.Value, Owner: owner})

		result := NewHandler(mockKeeper)(ctx, createMsg)

		assert.False(t, result.IsOK(), result.Log)

		// test valid create message
		mockKeeper.EXPECT().GetBLZValue(ctx, nil, createMsg.UUID, createMsg.Key)
		mockKeeper.EXPECT().SetBLZValue(ctx, nil, createMsg.UUID, createMsg.Key, types.BLZValue{Value: createMsg.Value, Owner: createMsg.Owner})

		result = NewHandler(mockKeeper)(ctx, createMsg)

		assert.True(t, result.IsOK())

		// test bad message
		result = NewHandler(mockKeeper)(ctx, BadMsg{})
		assert.False(t, result.IsOK())
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
		readMsg := types.MsgBLZRead{
			UUID:  "uuid",
			Key:   "key",
			Owner: owner,
		}
		assert.Equal(t, readMsg.Type(), "read")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, readMsg.UUID, readMsg.Key)

		result := NewHandler(mockKeeper)(ctx, readMsg)

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
		assert.Equal(t, updateMsg.Type(), "update")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().SetBLZValue(ctx, nil, updateMsg.UUID, updateMsg.Key, types.BLZValue{
			Value: "value",
			Owner: owner,
		})

		result := NewHandler(mockKeeper)(ctx, updateMsg)
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

		assert.Equal(t, deleteMsg.Type(), "delete")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key)

		result := NewHandler(mockKeeper)(ctx, deleteMsg)
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
		assert.Equal(t, keysMsg.Type(), "keys")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		acceptedKeys := []string{"one", "two", "three"}
		mockKeeper.EXPECT().GetKeys(ctx, nil, keysMsg.UUID).Return(types.QueryResultKeys{UUID: "uuid", Keys: acceptedKeys})

		result := NewHandler(mockKeeper)(ctx, keysMsg)
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
		assert.Equal(t, hasMsg.Type(), "has")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, hasMsg.UUID, hasMsg.Key).Return(owner)

		result := NewHandler(mockKeeper)(ctx, hasMsg)
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
