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

	mockKeeper.EXPECT().GetBLZValue(ctx, nil, "uuid", "key").
		Return(types.BLZValue{
			Value: expectedValue,
			Owner: expectedOwner,
		})

	result, err := queryRead(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)
	assert.Nil(t, err)

	json_result := types.BLZValue{}
	json.Unmarshal(result, &json_result)

	assert.Equal(t, json_result.Value, expectedValue)

	// item does not exist.
	mockKeeper.EXPECT().GetBLZValue(ctx, nil, "uuid", "key")
	result, err = queryRead(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

	assert.NotNil(t, err)
}

func Test_queryHas(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)

	// always return nil for a store...
	mockKeeper.EXPECT().GetKVStore(ctx).AnyTimes().Return(nil)

	mockKeeper.EXPECT().IsKeyPresent(ctx, nil, "uuid", "key").Return(true)

	result, err := queryHas(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

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

	mockKeeper.EXPECT().GetKeys(ctx, nil, "uuid").Return(types.QueryResultKeys{
		UUID: "uuid",
		Keys: acceptedKeys,
	})

	result, err := queryKeys(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

	assert.Nil(t, err)

	json_result := types.QueryResultKeys{}
	json.Unmarshal(result, &json_result)

	assert.True(t, reflect.DeepEqual(acceptedKeys, json_result.Keys))
}
