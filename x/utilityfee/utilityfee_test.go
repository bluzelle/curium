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
	"encoding/json"
	bluzellechain "github.com/bluzelle/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/stretchr/testify/assert"
	abci "github.com/tendermint/tendermint/abci/types"
	"reflect"
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

	var bk bank.Keeper
	var ac keeper.AccountKeeper
	var sk types.SupplyKeeper

	ndfd := NewDeductFeeDecorator(bk, ac, sk, "genesis.json")
	// DeductFeeDecorator
	assert.True(t, reflect.TypeOf(ndfd) == reflect.TypeOf(DeductFeeDecorator{}))

	// valid config...
	tax, acc := getUtilityTax("genesis.json")
	assert.Equal(t, 0.5, tax)
	assert.Equal(t, "bluzelle1tfqzcch3dx9ly72nwtvqcn222a5d7yn65xdzkk", acc.String())
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

func TestAppModule_nil_methods(t *testing.T) {
	am := NewAppModule()

	assert.Nil(t, am.ValidateGenesis(json.RawMessage{}))

	assert.Nil(t, am.GetQueryCmd(nil))

	assert.Nil(t, am.GetTxCmd(nil))

	assert.Nil(t, am.NewHandler())

	assert.Nil(t, am.NewQuerierHandler())

	assert.Nil(t, am.InitGenesis(sdk.Context{}, nil))

	assert.Nil(t, am.ExportGenesis(sdk.Context{}))

	assert.True(t, reflect.TypeOf(am.EndBlock(sdk.Context{}, abci.RequestEndBlock{})) == reflect.TypeOf([]abci.ValidatorUpdate{}))
}
