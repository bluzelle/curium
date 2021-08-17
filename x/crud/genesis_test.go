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
	"github.com/stretchr/testify/assert"
	"testing"
)


func TestValidateGenesis(t *testing.T) {
	var blzValues []types.BLZValue

	genesisState := NewGenesisState(blzValues)

	assert.Nil(t, ValidateGenesis(genesisState))

	blzValues = append(blzValues, types.BLZValue{Value: "test", Owner: []byte("notnilowner")})

	assert.Nil(t, ValidateGenesis(genesisState))

	blzValues = append(blzValues, types.BLZValue{Value: "test"})

	assert.Nil(t, ValidateGenesis(genesisState))
}

