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
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNewGenesisState(t *testing.T) {
	assert.Empty(t, NewGenesisState(nil).BlzValues)
}

func TestValidateGenesis(t *testing.T) {
	var blzValues []types.BLZValue

	genesisState := NewGenesisState(blzValues)

	assert.Nil(t, ValidateGenesis(genesisState))

	blzValues = append(blzValues, types.BLZValue{Value: "test", Owner: []byte("notnilowner")})

	assert.Nil(t, ValidateGenesis(genesisState))

	blzValues = append(blzValues, types.BLZValue{Value: "test"})

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
		SetValue(ctx, nil, "UUID-Genesis", "Key-Genesis",
			types.BLZValue{Value: "test", Owner: owner})

	mockKeeper.EXPECT().
		GetKVStore(ctx).Return(nil)

	InitGenesis(ctx, mockKeeper, data)
}
