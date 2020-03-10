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
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
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
func (msg BadMsg) ValidateBasic() error         { return nil }
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

		_, err := NewHandler(mockKeeper)(ctx, createMsg)
		assert.NotNil(t, err)

		// test valid create message
		mockKeeper.EXPECT().GetBLZValue(ctx, nil, createMsg.UUID, createMsg.Key)
		mockKeeper.EXPECT().SetBLZValue(ctx, nil, createMsg.UUID, createMsg.Key, types.BLZValue{Value: createMsg.Value, Owner: createMsg.Owner})

		_, err = NewHandler(mockKeeper)(ctx, createMsg)
		assert.Nil(t, err)

		// test bad message
		_, err = NewHandler(mockKeeper)(ctx, BadMsg{})
		assert.NotNil(t, err)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgBLZCreate(ctx, mockKeeper, types.MsgBLZCreate{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
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

		_, err := NewHandler(mockKeeper)(ctx, readMsg)

		assert.NotNil(t, err)
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

		result, err := handleMsgBLZRead(ctx, mockKeeper, read_msg)

		assert.Nil(t, err)
		assert.NotEmpty(t, result.Data)

		json_result := types.BLZValue{}
		json.Unmarshal(result.Data, &json_result)

		assert.Equal(t, json_result.Value, "utest")
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgBLZRead(ctx, mockKeeper, types.MsgBLZRead{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
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

		_, err := NewHandler(mockKeeper)(ctx, updateMsg)
		assert.Nil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key)
		_, err = handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		updateMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		_, err = handleMsgBLZUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgBLZUpdate(ctx, mockKeeper, types.MsgBLZUpdate{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
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

		_, err := NewHandler(mockKeeper)(ctx, deleteMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key).Return(
			[]byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr"))

		_, err = handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key).Return(owner)
		mockKeeper.EXPECT().DeleteBLZValue(ctx, nil, deleteMsg.UUID, deleteMsg.Key)
		_, err = handleMsgBLZDelete(ctx, mockKeeper, deleteMsg)
		assert.Nil(t, err)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgBLZDelete(ctx, mockKeeper, types.MsgBLZDelete{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
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
		mockKeeper.EXPECT().GetKeys(ctx, nil, keysMsg.UUID, gomock.Any()).Return(types.QueryResultKeys{UUID: "uuid", Keys: acceptedKeys})

		result, err := NewHandler(mockKeeper)(ctx, keysMsg)
		assert.Nil(t, err)
		assert.NotEmpty(t, result.Data)

		json_result := types.QueryResultKeys{}
		json.Unmarshal(result.Data, &json_result)

		assert.True(t, reflect.DeepEqual(json_result.Keys, acceptedKeys))
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZKeys(ctx, mockKeeper, types.MsgBLZKeys{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZKeys(ctx, mockKeeper, types.MsgBLZKeys{UUID: "uuid"})
		assert.NotNil(t, err)
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

		result, err := NewHandler(mockKeeper)(ctx, hasMsg)
		assert.Nil(t, err)

		json_result := types.QueryResultHas{}
		json.Unmarshal(result.Data, &json_result)

		assert.True(t, json_result.Has)
		assert.Equal(t, json_result.UUID, hasMsg.UUID)
		assert.Equal(t, json_result.Key, hasMsg.Key)

		mockKeeper.EXPECT().GetOwner(ctx, nil, hasMsg.UUID, hasMsg.Key)

		result, err = handleMsgBLZHas(ctx, mockKeeper, hasMsg)
		assert.Nil(t, err)

		json_result = types.QueryResultHas{}
		json.Unmarshal(result.Data, &json_result)
		assert.False(t, json_result.Has)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZHas(ctx, mockKeeper, types.MsgBLZHas{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZHas(ctx, mockKeeper, types.MsgBLZHas{UUID: "uuid"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgBLZRename(t *testing.T) {
	// check for new key
	// check for new key size
	// ensure the owners match
	//
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple Rename test
	{
		renameMsg := types.MsgBLZRename{
			UUID:   "uuid",
			Key:    "key",
			NewKey: "newkey",
			Owner:  owner,
		}
		assert.Equal(t, renameMsg.Type(), "rename")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key).Return(owner)
		mockKeeper.EXPECT().RenameBLZKey(ctx, gomock.Any(), renameMsg.UUID, renameMsg.Key, renameMsg.NewKey).Return(true)

		_, err := NewHandler(mockKeeper)(ctx, renameMsg)
		assert.Nil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key).Return(owner)
		renameMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		_, err = handleMsgBLZRename(ctx, mockKeeper, renameMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key)
		_, err = handleMsgBLZRename(ctx, mockKeeper, renameMsg)
		assert.NotNil(t, err)

		// Rename failed
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key).Return(renameMsg.Owner)
		mockKeeper.EXPECT().RenameBLZKey(ctx, gomock.Any(), renameMsg.UUID, renameMsg.Key, renameMsg.NewKey).Return(false)

		_, err = NewHandler(mockKeeper)(ctx, renameMsg)
		assert.NotNil(t, err)
		assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Rename failed").Error(), err.Error())
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZRename(ctx, mockKeeper, types.MsgBLZRename{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZRename(ctx, mockKeeper, types.MsgBLZRename{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)

		_, err = handleMsgBLZRename(ctx, mockKeeper, types.MsgBLZRename{UUID: "uuid", Key: "key", NewKey: "newkey"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgBLZKeyValues(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple keys test key does not exist
	{
		keyValuesMsg := types.MsgBLZKeyValues{
			UUID:  "uuid",
			Owner: owner,
		}
		assert.Equal(t, keyValuesMsg.Type(), "keyvalues")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		keyValues := []types.KeyValue{}
		keyValues = append(keyValues, types.KeyValue{Key: "key0", Value: "value0"})
		keyValues = append(keyValues, types.KeyValue{Key: "key1", Value: "value1"})

		acceptedKeyValues := types.QueryResultKeyValues{UUID: "uuid", KeyValues: keyValues}

		mockKeeper.EXPECT().GetKeyValues(ctx, nil, keyValuesMsg.UUID, gomock.Any()).Return(acceptedKeyValues)

		result, err := NewHandler(mockKeeper)(ctx, keyValuesMsg)
		assert.Nil(t, err)
		assert.NotEmpty(t, result.Data)

		json_result := types.QueryResultKeyValues{}
		json.Unmarshal(result.Data, &json_result)

		assert.True(t, reflect.DeepEqual(json_result, acceptedKeyValues))
	}

	// Test for empty message parameters
	{
		_, err := handleMsgBLZKeyValues(ctx, mockKeeper, types.MsgBLZKeyValues{})
		assert.NotNil(t, err)

		_, err = handleMsgBLZKeyValues(ctx, mockKeeper, types.MsgBLZKeyValues{UUID: "uuid"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgCount(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple keys test key does not exist
	{
		countMsg := types.MsgCount{
			UUID:  "uuid",
			Owner: owner,
		}
		assert.Equal(t, countMsg.Type(), "count")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetCount(ctx, nil, "uuid", gomock.Any()).Return(types.QueryResultCount{UUID: "uuid", Count: uint64(123)})
		result, err := NewHandler(mockKeeper)(ctx, countMsg)
		assert.Nil(t, err)

		json_result := types.QueryResultCount{}
		json.Unmarshal(result.Data, &json_result)

		assert.Equal(t, countMsg.UUID, json_result.UUID)
		assert.Equal(t, uint64(123), json_result.Count)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgCount(ctx, mockKeeper, types.MsgCount{})
		assert.NotNil(t, err)

		_, err = handleMsgCount(ctx, mockKeeper, types.MsgCount{UUID: "uuid"})
		assert.NotNil(t, err)
	}
}
