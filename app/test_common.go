package app

import (
	tmdb "github.com/tendermint/tm-db"

	"github.com/tendermint/tendermint/libs/log"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/distribution"
	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/cosmos/cosmos-sdk/x/params"
	"github.com/cosmos/cosmos-sdk/x/slashing"
	"github.com/cosmos/cosmos-sdk/x/staking"
	"github.com/cosmos/cosmos-sdk/x/supply"

	bluzellechain "github.com/bluzelle/curium/types"
	"github.com/bluzelle/curium/x/tax"
)

// TestApp is a simple wrapper around an App. It exposes internal keepers for use in integration tests.
// This file also contains test helpers. Ideally they would be in separate package.
// Basic Usage:
// 	Create a test app with NewTestApp, then all keepers and their methods can be accessed for test setup and execution.
// Advanced Usage:
// 	Some tests call for an app to be initialized with some state. This can be achieved through keeper method calls (ie keeper.SetParams(...)).
// 	However this leads to a lot of duplicated logic similar to InitGenesis methods.
// 	So TestApp.InitializeFromGenesisStates() will call InitGenesis with the default genesis state.
//	and TestApp.InitializeFromGenesisStates(authState, cdpState) will do the same but overwrite the auth and cdp sections of the default genesis state
// 	Creating the genesis states can be combersome, but helper methods can make it easier such as NewAuthGenStateFromAccounts below.
type TestApp struct {
	CRUDApp
}

func NewTestApp() TestApp {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(bluzellechain.Bech32PrefixAccAddr, bluzellechain.Bech32PrefixAccPub)
	config.SetBech32PrefixForValidator(bluzellechain.Bech32PrefixValAddr, bluzellechain.Bech32PrefixValPub)
	config.SetBech32PrefixForConsensusNode(bluzellechain.Bech32PrefixConsAddr, bluzellechain.Bech32PrefixConsPub)

	db := tmdb.NewMemDB()
	app := NewCRUDApp(log.NewNopLogger(), db)
	return TestApp{CRUDApp: *app}
}

// nolint
func (tApp TestApp) GetAccountKeeper() auth.AccountKeeper { return tApp.accountKeeper }
func (tApp TestApp) GetBankKeeper() bank.Keeper           { return tApp.bankKeeper }
func (tApp TestApp) GetSupplyKeeper() supply.Keeper       { return tApp.supplyKeeper }
func (tApp TestApp) GetStakingKeeper() staking.Keeper     { return tApp.stakingKeeper }
func (tApp TestApp) GetSlashingKeeper() slashing.Keeper   { return tApp.slashingKeeper }
func (tApp TestApp) GetDistrKeeper() distribution.Keeper  { return tApp.distrKeeper }
func (tApp TestApp) GetGovKeeper() gov.Keeper             { return tApp.govKeeper }
func (tApp TestApp) GetParamsKeeper() params.Keeper       { return tApp.paramsKeeper }
func (tApp TestApp) GetTaxKeeper() tax.Keeper             { return tApp.taxKeeper }
