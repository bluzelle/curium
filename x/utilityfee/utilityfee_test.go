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
	bluzellechain "github.com/bluzelle/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"testing"
)

func initTest() {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(bluzellechain.Bech32PrefixAccAddr, bluzellechain.Bech32PrefixAccPub)
}

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
	initTest()

	// valid config...
	tax, ac := getUtilityTax("genesis.json")
	assert.Equal(t, 0.5, tax)
	assert.Equal(t, "bluzelle1tfqzcch3dx9ly72nwtvqcn222a5d7yn65xdzkk", ac.String())
}

func TestAppModule_getUtilityTaxMissingGenesis(t *testing.T) {
	initTest()
	defer func() {
		if r := recover(); r != nil {
			assert.Equal(t, "missing-genesis.json does not exist, run `init` first", r)
		}
	}()

	getUtilityTax("missing-genesis.json")
}

func TestAppModule_getUtilityTaxNoAppState(t *testing.T) {
	initTest()
	defer func() {
		if r := recover(); r != nil {
			assert.Equal(t, "unexpected end of JSON input", r)
		}
	}()

	getUtilityTax("genesis-no-appstate.json")
}

func TestAppModule_getUtilityTaxBadTaxFormat(t *testing.T) {
	initTest()
	defer func() {
		if r := recover(); r != nil {
			assert.Equal(t, "strconv.ParseFloat: parsing \"asdf\": invalid syntax", r)
		}
	}()

	getUtilityTax("genesis-bad-tax.json")
}

func TestAppModule_getUtilityTaxBadAccountFormat(t *testing.T) {
	initTest()
	defer func() {
		if r := recover(); r != nil {
			assert.Equal(t, "strconv.ParseUint: parsing \"-1\": invalid syntax", r)
		}
	}()

	getUtilityTax("genesis-bad-account.json")
}

func TestAppModule_getUtilityTaxMissingAccount(t *testing.T) {
	initTest()
	defer func() {
		if r := recover(); r != nil {
			assert.Equal(t, "genesis account number 2 does not exist", r)
		}
	}()

	getUtilityTax("genesis-missing-account.json")
}

func TestDeductFeeDecorator_AnteHandle(t *testing.T) {

}

func TestDeductFees(t *testing.T) {

}
