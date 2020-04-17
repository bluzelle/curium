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

package utilityfee

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestAppModuleBasic_Name(t *testing.T) {
	sut := AppModuleBasic{}
	assert.Equal(t, "utilityfee", sut.Name())
}

func TestAppModuleBasic_DefaultGenesis(t *testing.T) {
	genesis := AppModuleBasic{}.DefaultGenesis()
	assert.NotNil(t, genesis)

	// Note: see crud/genesis.go func DefaultGenesisState() GenesisState
	assert.Equal(t, "{\"tax\":\"0.5\",\"account_number\":\"1\"}", string(genesis))
}

func TestAppModule_Name(t *testing.T) {
	sut := NewAppModule()
	assert.Equal(t, "utilityfee", sut.Name())
}

func TestAppModule_Route(t *testing.T) {
	sut := AppModule{}
	assert.Equal(t, "utilityfee", sut.Route())
}

func TestAppModule_QuerierRoute(t *testing.T) {
	sut := AppModule{}
	assert.Equal(t, "utilityfee", sut.QuerierRoute())
}

func TestAppModule_EndBlock(t *testing.T) {
}

func TestAppModule_getUtilityTax(t *testing.T) {
}

func TestDeductFeeDecorator_AnteHandle(t *testing.T) {

}

func TestDeductFees(t *testing.T) {

}
