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
	"testing"
)

func initKeeperTest(t *testing.T) (sdk.Context, sdk.KVStore, []byte, *codec.Codec) {

	return sdk.NewContext(nil, abci.Header{}, false, nil),
		cachekv.NewStore(dbadapter.Store{dbm.NewMemDB()}),
		[]byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
		codec.New()
}

func TestNewGenesisState(t *testing.T) {
	assert.Empty(t, NewGenesisState(nil).BlzValues)
}

func TestValidateGenesis(t *testing.T) {
	blzValues := []types.BLZValue{}

	genesisState := NewGenesisState(blzValues)

	assert.Nil(t, ValidateGenesis(genesisState))

	blzValues = append(blzValues, types.BLZValue{"test", []byte("notnilowner")})

	assert.Nil(t, ValidateGenesis(genesisState))

	blzValues = append(blzValues, types.BLZValue{"test", nil})

	assert.Nil(t, ValidateGenesis(genesisState))
}

func TestInitGenesis(t *testing.T) {
	mockCtrl := gomock.NewController(t)
	mockKeeper := mocks.NewMockIKeeper(mockCtrl)
	data := DefaultGenesisState()
	ctx := sdk.Context{}
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	data.BlzValues = append(data.BlzValues, types.BLZValue{Value: "test", Owner: owner})

	mockKeeper.EXPECT().
		SetBLZValue(ctx, nil, "UUID-Genesis", "Key-Genesis",
			types.BLZValue{Value: "test", Owner: owner})

	mockKeeper.EXPECT().
		GetKVStore(ctx).Return(nil)

	InitGenesis(ctx, mockKeeper, data)
}
