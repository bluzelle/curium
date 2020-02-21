package keeper

import (
	"encoding/json"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/bluzelle/curium/x/crud/mocks"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/golang/mock/gomock"
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

	mockKeeper.EXPECT().GetBLZValue(ctx, "uuid", "key").
		Return(types.BLZValue{
			Value: expectedValue,
			Owner: expectedOwner,
		})

	result, err := queryRead(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

	if err != nil {
		t.Error("Expected nil error")
	}

	json_result := types.BLZValue{}
	json.Unmarshal(result, &json_result)
	if json_result.Value != expectedValue {
		t.Errorf("Expected value is [%s], actual value is %s", expectedValue, json_result.Value)
	}

	// item does not exist.
	mockKeeper.EXPECT().GetBLZValue(ctx, "uuid", "key")
	result, err = queryRead(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

	if err == nil {
		t.Error("Expected an error")
	}
}

func Test_queryHas(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)

	mockKeeper.EXPECT().IsKeyPresent(ctx, "uuid", "key").Return(true)

	result, err := queryHas(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

	if err != nil {
		t.Error("Expected nil error")
	}

	json_result := types.QueryResultHas{}
	json.Unmarshal(result, &json_result)
	if !json_result.Has {
		t.Error("Expected value is true")
	}
}

func Test_queryKeys(t *testing.T) {
	ctx, cdc, mockKeeper := initTest(t)
	acceptedKeys := []string{"key", "key1"}

	mockKeeper.EXPECT().GetKeys(ctx, "uuid").Return(types.QueryResultKeys{
		UUID: "uuid",
		Keys: acceptedKeys,
	})

	result, err := queryKeys(ctx, []string{"uuid", "key"}, abci.RequestQuery{}, mockKeeper, cdc)

	if err != nil {
		t.Error("Expected nil error")
	}

	json_result := types.QueryResultKeys{}
	json.Unmarshal(result, &json_result)

	if !reflect.DeepEqual(acceptedKeys, json_result.Keys) {
		t.Error("Expected value not returned")
	}
}
