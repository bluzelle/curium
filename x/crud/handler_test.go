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

const DefaultLeaseBlockHeight = int64(10 * 86400 / 5) // (10 days of blocks * seconds/day) / 5

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

func Test_handleMsgCreate(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	mockKeeper.EXPECT().GetDefaultLeaseBlocks().AnyTimes().Return(DefaultLeaseBlockHeight)

	// Simple Unit
	{
		createMsg := types.MsgCreate{
			UUID:  "uuid",
			Key:   "key",
			Value: "value",
			Lease: 0,
			Owner: owner,
		}

		assert.Equal(t, createMsg.Type(), "create")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetLeaseStore(gomock.Any()).AnyTimes().Return(nil)

		// testing key already exists
		mockKeeper.EXPECT().GetValue(ctx, nil, createMsg.UUID, createMsg.Key).Return(types.BLZValue{Value: createMsg.Value, Owner: owner})

		_, err := NewHandler(mockKeeper)(ctx, createMsg)
		assert.NotNil(t, err)

		// test valid create message
		mockKeeper.EXPECT().GetValue(ctx, nil, createMsg.UUID, createMsg.Key)
		mockKeeper.EXPECT().SetValue(ctx, nil, createMsg.UUID, createMsg.Key, types.BLZValue{Value: createMsg.Value, Owner: createMsg.Owner, Lease: DefaultLeaseBlockHeight})
		mockKeeper.EXPECT().SetLease(nil, createMsg.UUID, createMsg.Key, int64(0), DefaultLeaseBlockHeight)

		_, err = NewHandler(mockKeeper)(ctx, createMsg)
		assert.Nil(t, err)

		// test bad message
		_, err = NewHandler(mockKeeper)(ctx, BadMsg{})
		assert.NotNil(t, err)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgCreate(ctx, mockKeeper, types.MsgCreate{})
		assert.NotNil(t, err)

		_, err = handleMsgCreate(ctx, mockKeeper, types.MsgCreate{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgCreate(ctx, mockKeeper, types.MsgCreate{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgRead(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Key not found test
	{
		readMsg := types.MsgRead{
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
		read_msg := types.MsgRead{
			UUID:  "uuid",
			Key:   "key",
			Owner: owner,
		}
		mockKeeper.EXPECT().GetOwner(ctx, nil, read_msg.UUID, read_msg.Key).Return(owner)
		mockKeeper.EXPECT().GetValue(ctx, nil, read_msg.UUID, read_msg.Key).Return(types.BLZValue{Value: "utest", Owner: owner})

		result, err := handleMsgRead(ctx, mockKeeper, read_msg)

		assert.Nil(t, err)
		assert.NotEmpty(t, result.Data)

		json_result := types.BLZValue{}
		json.Unmarshal(result.Data, &json_result)

		assert.Equal(t, json_result.Value, "utest")
	}

	// Test for empty message parameters
	{
		_, err := handleMsgRead(ctx, mockKeeper, types.MsgRead{})
		assert.NotNil(t, err)

		_, err = handleMsgRead(ctx, mockKeeper, types.MsgRead{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgRead(ctx, mockKeeper, types.MsgRead{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgUpdate(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	mockKeeper.EXPECT().GetDefaultLeaseBlocks().AnyTimes().Return(DefaultLeaseBlockHeight)

	// zero new lease must fail
	{
		updateMsg := types.MsgUpdate{
			UUID:  "uuid",
			Key:   "key",
			Lease: -100,
			Value: "value",
			Owner: owner,
		}
		assert.Equal(t, updateMsg.Type(), "update")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().GetValue(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(types.BLZValue{
			Value: "value",
			Lease: 100,
			Owner: owner,
		})

		_, err := NewHandler(mockKeeper)(ctx, updateMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key)
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		updateMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)
	}

	// Negative new lease must fail
	{
		updateMsg := types.MsgUpdate{
			UUID:  "uuid",
			Key:   "key",
			Lease: -100,
			Value: "value",
			Owner: owner,
		}
		assert.Equal(t, updateMsg.Type(), "update")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().GetValue(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(types.BLZValue{
			Value: "value",
			Lease: 0,
			Owner: owner,
		})

		_, err := NewHandler(mockKeeper)(ctx, updateMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key)
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		updateMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)
	}

	// reducing lease should not take us below current height
	{
		updateMsg := types.MsgUpdate{
			UUID:  "uuid",
			Key:   "key",
			Lease: -16,
			Value: "value",
			Owner: owner,
		}
		assert.Equal(t, updateMsg.Type(), "update")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(gomock.Any()).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(gomock.Any(), nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().GetValue(gomock.Any(), nil, updateMsg.UUID, updateMsg.Key).Return(types.BLZValue{
			Value:  "value",
			Lease:  20,
			Owner:  owner,
			Height: 110,
		})

		newCtx := ctx.WithBlockHeight(115)
		_, err := NewHandler(mockKeeper)(newCtx, updateMsg)
		assert.NotNil(t, err)
	}

	// Simple Update test
	{
		updateMsg := types.MsgUpdate{
			UUID:  "uuid",
			Key:   "key",
			Lease: 0,
			Value: "value",
			Owner: owner,
		}
		assert.Equal(t, updateMsg.Type(), "update")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().GetValue(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(types.BLZValue{
			Value: "value",
			Lease: 0,
			Owner: owner,
		})
		mockKeeper.EXPECT().SetValue(ctx, nil, updateMsg.UUID, updateMsg.Key, types.BLZValue{
			Value: "value",
			Lease: 0,
			Owner: owner,
		})

		_, err := NewHandler(mockKeeper)(ctx, updateMsg)
		assert.Nil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key)
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		updateMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)
	}

	{
		updateMsg := types.MsgUpdate{
			UUID:  "uuid",
			Key:   "key",
			Lease: 2000,
			Value: "value",
			Owner: owner,
		}
		assert.Equal(t, updateMsg.Type(), "update")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetLeaseStore(gomock.Any()).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		mockKeeper.EXPECT().GetValue(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(types.BLZValue{
			Value: "value",
			Lease: 4000,
			Owner: owner,
		})
		mockKeeper.EXPECT().SetValue(ctx, nil, updateMsg.UUID, updateMsg.Key, types.BLZValue{
			Value: "value",
			Lease: 6000,
			Owner: owner,
		})

		mockKeeper.EXPECT().DeleteLease(nil, updateMsg.UUID, updateMsg.Key, int64(0), int64(4000))
		mockKeeper.EXPECT().SetLease(nil, updateMsg.UUID, updateMsg.Key, int64(0), int64(6000))

		_, err := NewHandler(mockKeeper)(ctx, updateMsg)
		assert.Nil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key)
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, updateMsg.UUID, updateMsg.Key).Return(owner)
		updateMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		_, err = handleMsgUpdate(ctx, mockKeeper, updateMsg)
		assert.NotNil(t, err)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgUpdate(ctx, mockKeeper, types.MsgUpdate{})
		assert.NotNil(t, err)

		_, err = handleMsgUpdate(ctx, mockKeeper, types.MsgUpdate{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgUpdate(ctx, mockKeeper, types.MsgUpdate{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgDelete(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple delete test key does not exist
	{
		deleteMsg := types.MsgDelete{UUID: "uuid", Key: "key", Owner: owner}

		assert.Equal(t, deleteMsg.Type(), "delete")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetLeaseStore(gomock.Any()).AnyTimes().Return(nil)

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key)

		_, err := NewHandler(mockKeeper)(ctx, deleteMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key).Return(
			[]byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr"))

		_, err = handleMsgDelete(ctx, mockKeeper, deleteMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, deleteMsg.UUID, deleteMsg.Key).Return(owner)
		mockKeeper.EXPECT().DeleteValue(ctx, nil, nil, deleteMsg.UUID, deleteMsg.Key)
		_, err = handleMsgDelete(ctx, mockKeeper, deleteMsg)
		assert.Nil(t, err)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgDelete(ctx, mockKeeper, types.MsgDelete{})
		assert.NotNil(t, err)

		_, err = handleMsgDelete(ctx, mockKeeper, types.MsgDelete{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgDelete(ctx, mockKeeper, types.MsgDelete{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgKeys(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple keys test key does not exist
	{
		keysMsg := types.MsgKeys{
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
		_, err := handleMsgKeys(ctx, mockKeeper, types.MsgKeys{})
		assert.NotNil(t, err)

		_, err = handleMsgKeys(ctx, mockKeeper, types.MsgKeys{UUID: "uuid"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgHas(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple keys test key does not exist
	{
		hasMsg := types.MsgHas{
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

		result, err = handleMsgHas(ctx, mockKeeper, hasMsg)
		assert.Nil(t, err)

		json_result = types.QueryResultHas{}
		json.Unmarshal(result.Data, &json_result)
		assert.False(t, json_result.Has)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgHas(ctx, mockKeeper, types.MsgHas{})
		assert.NotNil(t, err)

		_, err = handleMsgHas(ctx, mockKeeper, types.MsgHas{UUID: "uuid"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgRename(t *testing.T) {
	// check for new key
	// check for new key size
	// ensure the owners match
	//
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple Rename test
	{
		renameMsg := types.MsgRename{
			UUID:   "uuid",
			Key:    "key",
			NewKey: "newkey",
			Owner:  owner,
		}
		assert.Equal(t, renameMsg.Type(), "rename")

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key).Return(owner)
		mockKeeper.EXPECT().RenameKey(ctx, gomock.Any(), renameMsg.UUID, renameMsg.Key, renameMsg.NewKey).Return(true)

		_, err := NewHandler(mockKeeper)(ctx, renameMsg)
		assert.Nil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key).Return(owner)
		renameMsg.Owner = []byte("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
		_, err = handleMsgRename(ctx, mockKeeper, renameMsg)
		assert.NotNil(t, err)

		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key)
		_, err = handleMsgRename(ctx, mockKeeper, renameMsg)
		assert.NotNil(t, err)

		// Rename failed
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(ctx, nil, renameMsg.UUID, renameMsg.Key).Return(renameMsg.Owner)
		mockKeeper.EXPECT().RenameKey(ctx, gomock.Any(), renameMsg.UUID, renameMsg.Key, renameMsg.NewKey).Return(false)

		_, err = NewHandler(mockKeeper)(ctx, renameMsg)
		assert.NotNil(t, err)
		assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Rename failed").Error(), err.Error())
	}

	// Test for empty message parameters
	{
		_, err := handleMsgRename(ctx, mockKeeper, types.MsgRename{})
		assert.NotNil(t, err)

		_, err = handleMsgRename(ctx, mockKeeper, types.MsgRename{UUID: "uuid", Key: "key"})
		assert.NotNil(t, err)

		_, err = handleMsgRename(ctx, mockKeeper, types.MsgRename{UUID: "uuid", Key: "key", NewKey: "newkey"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgKeyValues(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple keys test key does not exist
	{
		keyValuesMsg := types.MsgKeyValues{
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
		_, err := handleMsgKeyValues(ctx, mockKeeper, types.MsgKeyValues{})
		assert.NotNil(t, err)

		_, err = handleMsgKeyValues(ctx, mockKeeper, types.MsgKeyValues{UUID: "uuid"})
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

func Test_handleMsgDeleteAll(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Simple delete test key does not exist
	{
		deleteAllMsg := types.MsgDeleteAll{UUID: "uuid", Owner: owner}

		assert.Equal(t, "deleteall", deleteAllMsg.Type())

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().DeleteAll(ctx, nil, deleteAllMsg.UUID, gomock.Any())

		_, err := NewHandler(mockKeeper)(ctx, deleteAllMsg)
		assert.Nil(t, err)
	}

	// Test for empty message parameters
	{
		_, err := handleMsgDeleteAll(ctx, mockKeeper, types.MsgDeleteAll{})
		assert.NotNil(t, err)

		_, err = handleMsgDeleteAll(ctx, mockKeeper, types.MsgDeleteAll{UUID: "uuid"})
		assert.NotNil(t, err)
	}
}

func Test_handleMsgMultiUpdate(t *testing.T) {
	mockCtrl, mockKeeper, ctx, owner := initTest(t)
	defer mockCtrl.Finish()

	// Update multiple key/values
	{
		multiUpdateMsg := types.MsgMultiUpdate{UUID: "uuid", Owner: owner}
		multiUpdateMsg.KeyValues = append(multiUpdateMsg.KeyValues, types.KeyValue{Key: "key0", Value: "value1"})
		multiUpdateMsg.KeyValues = append(multiUpdateMsg.KeyValues, types.KeyValue{Key: "key1", Value: "value1"})

		assert.Equal(t, "multiupdate", multiUpdateMsg.Type())

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[0].Key).Return(owner)
		mockKeeper.EXPECT().GetOwner(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[1].Key).Return(owner)

		mockKeeper.EXPECT().SetValue(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[0].Key,
			types.BLZValue{Value: multiUpdateMsg.KeyValues[0].Value, Owner: owner})
		mockKeeper.EXPECT().SetValue(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[1].Key,
			types.BLZValue{Value: multiUpdateMsg.KeyValues[1].Value, Owner: owner})

		_, err := NewHandler(mockKeeper)(ctx, multiUpdateMsg)
		assert.Nil(t, err)
	}

	// Attempt to update key/values, but one does not exist
	{
		multiUpdateMsg := types.MsgMultiUpdate{UUID: "uuid", Owner: owner}
		multiUpdateMsg.KeyValues = append(multiUpdateMsg.KeyValues, types.KeyValue{Key: "key0", Value: "value1"})
		multiUpdateMsg.KeyValues = append(multiUpdateMsg.KeyValues, types.KeyValue{Key: "key1", Value: "value1"})

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[0].Key).Return(owner)
		mockKeeper.EXPECT().GetOwner(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[1].Key)

		_, err := NewHandler(mockKeeper)(ctx, multiUpdateMsg)
		assert.NotNil(t, err)
		assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist [1]").Error(), err.Error())
	}

	// Attempt to update key/values, but one has a different owner
	{
		multiUpdateMsg := types.MsgMultiUpdate{UUID: "uuid", Owner: owner}
		multiUpdateMsg.KeyValues = append(multiUpdateMsg.KeyValues, types.KeyValue{Key: "key0", Value: "value1"})
		multiUpdateMsg.KeyValues = append(multiUpdateMsg.KeyValues, types.KeyValue{Key: "key1", Value: "value1"})

		// always return nil for a store...
		mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
		mockKeeper.EXPECT().GetOwner(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[0].Key).Return(owner)
		mockKeeper.EXPECT().GetOwner(ctx, nil, multiUpdateMsg.UUID, multiUpdateMsg.KeyValues[1].Key).Return([]byte("bluzelle4wqrnnpyp9wr6law2u5jwa231t0ywtmrduldf6h"))

		_, err := NewHandler(mockKeeper)(ctx, multiUpdateMsg)
		assert.NotNil(t, err)
		assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Incorrect Owner [1]").Error(), err.Error())
	}

	// Test for empty message parameters
	{
		_, err := handleMsgMultiUpdate(ctx, mockKeeper, types.MsgMultiUpdate{})
		assert.NotNil(t, err)

		_, err = handleMsgMultiUpdate(ctx, mockKeeper, types.MsgMultiUpdate{UUID: "uuid"})
		assert.NotNil(t, err)

		_, err = handleMsgMultiUpdate(ctx, mockKeeper, types.MsgMultiUpdate{UUID: "uuid", KeyValues: []types.KeyValue{{Key: "key0", Value: "value1"}}})
		assert.NotNil(t, err)
	}
}
