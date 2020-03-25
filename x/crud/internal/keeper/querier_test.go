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
	"encoding/json"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/bluzelle/curium/x/crud/mocks"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	abci "github.com/tendermint/tendermint/abci/types"
	"reflect"
	"testing"
)

func initTest(t *testing.T) (sdk.Context, *codec.Codec, *mocks.MockIKeeper) {
	mockCtrl := gomock.NewController(t)
	ctx := sdk.Context{}
	var cdc = codec.New()
	sdk.RegisterCodec(cdc)
	codec.RegisterCrypto(cdc)
	mockKeeper := mocks.NewMockIKeeper(mockCtrl)
	return ctx, cdc, mockKeeper
}

func Test_queryRead(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)

	// simple test
	expectedValue := "value"
	expectedOwner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")

	// always return nil for a store...
	mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
	mockKeeper.EXPECT().GetValue(ctx, nil, "uuid", "key").
		Return(types.BLZValue{
			Value: expectedValue,
			Owner: expectedOwner,
		})
	mockKeeper.EXPECT().GetCdc().Return(cdc)

	result, err := NewQuerier(mockKeeper)(ctx, []string{"read", "uuid", "key"}, abci.RequestQuery{})
	assert.Nil(t, err)

	json_result := types.BLZValue{}
	json.Unmarshal(result, &json_result)

	assert.Equal(t, json_result.Value, expectedValue)

	// item does not exist.
	mockKeeper.EXPECT().GetValue(ctx, nil, "uuid", "key")
	result, err = queryRead(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

	assert.NotNil(t, err)

	// nonexistent path test
	_, err = NewQuerier(mockKeeper)(ctx, []string{"badpath", "uuid", "key"}, abci.RequestQuery{})
	assert.NotNil(t, err)
}

func Test_queryHas(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)

	// always return nil for a store...
	mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
	mockKeeper.EXPECT().IsKeyPresent(ctx, nil, "uuid", "key").Return(true)
	mockKeeper.EXPECT().GetCdc().Return(cdc)

	result, err := NewQuerier(mockKeeper)(ctx, []string{"has", "uuid", "key"}, abci.RequestQuery{})

	if err != nil {
		t.Error("Expected nil error")
	}

	json_result := types.QueryResultHas{}
	json.Unmarshal(result, &json_result)

	assert.True(t, json_result.Has)
}

func Test_queryKeys(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)
	acceptedKeys := []string{"key", "key1"}

	// always return nil for a store...
	mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
	mockKeeper.EXPECT().GetKeys(ctx, nil, "uuid", nil).Return(types.QueryResultKeys{
		UUID: "uuid",
		Keys: acceptedKeys,
	})
	mockKeeper.EXPECT().GetCdc().Return(cdc)

	result, err := NewQuerier(mockKeeper)(ctx, []string{"keys", "uuid"}, abci.RequestQuery{})

	assert.Nil(t, err)

	json_result := types.QueryResultKeys{}
	json.Unmarshal(result, &json_result)

	assert.True(t, reflect.DeepEqual(acceptedKeys, json_result.Keys))
}

func Test_queryKeyValues(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)

	var keyValues []types.KeyValue
	keyValues = append(keyValues, types.KeyValue{Key: "key0", Value: "value0"})
	keyValues = append(keyValues, types.KeyValue{Key: "key1", Value: "value1"})

	acceptedKeyValues := types.QueryResultKeyValues{UUID: "uuid", KeyValues: keyValues}

	// always return nil for a store...
	mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
	mockKeeper.EXPECT().GetKeyValues(ctx, nil, "uuid", gomock.Any()).Return(acceptedKeyValues)
	mockKeeper.EXPECT().GetCdc().Return(cdc)

	result, err := NewQuerier(mockKeeper)(ctx, []string{"keyvalues", "uuid"}, abci.RequestQuery{})
	assert.Nil(t, err)

	json_result := types.QueryResultKeyValues{}
	json.Unmarshal(result, &json_result)

	assert.True(t, reflect.DeepEqual(acceptedKeyValues, json_result))
}

func Test_queryCount(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)

	// always return nil for a store...
	mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)
	mockKeeper.EXPECT().GetCount(ctx, nil, "uuid", nil).Return(types.QueryResultCount{
		UUID:  "uuid",
		Count: 2,
	})
	mockKeeper.EXPECT().GetCdc().Return(cdc)

	result, err := NewQuerier(mockKeeper)(ctx, []string{"count", "uuid"}, abci.RequestQuery{})
	assert.Nil(t, err)

	json_result := types.QueryResultCount{}
	json.Unmarshal(result, &json_result)

	assert.Equal(t, "uuid", json_result.UUID)
	assert.Equal(t, uint64(2), json_result.Count)
}

func Test_queryVersion(t *testing.T) {
	ctx, _, mockKeeper := initTest(t)
	result, err := NewQuerier(mockKeeper)(ctx, []string{"version"}, abci.RequestQuery{})
	assert.Nil(t, err)

	json_result := version.Info{}
	json.Unmarshal(result, &json_result)

	// We can only verify that the api got called and not the data since that is set
	// only when we build the client & server processes.
	assert.Equal(t, json_result.ServerName, "<appd>")
	assert.Equal(t, json_result.ClientName, "<appcli>")
}
