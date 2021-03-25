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

package app

import (
	"encoding/json"
	"github.com/bluzelle/curium/x/aggregator"
	"github.com/bluzelle/curium/x/oracle"
	"math"
	"os"
	"time"

	appAnte "github.com/bluzelle/curium/app/ante"
	bluzellechain "github.com/bluzelle/curium/types"
	"github.com/bluzelle/curium/x/crud"
	"github.com/bluzelle/curium/x/tax"
	bam "github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/bank"
	distr "github.com/cosmos/cosmos-sdk/x/distribution"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/cosmos/cosmos-sdk/x/params"
	paramsclient "github.com/cosmos/cosmos-sdk/x/params/client"
	"github.com/cosmos/cosmos-sdk/x/slashing"
	"github.com/cosmos/cosmos-sdk/x/staking"
	"github.com/cosmos/cosmos-sdk/x/supply"
	"github.com/cosmos/modules/incubator/faucet"
	"github.com/spf13/viper"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/log"
	tmos "github.com/tendermint/tendermint/libs/os"
	tmtypes "github.com/tendermint/tendermint/types"
	dbm "github.com/tendermint/tm-db"
)

var (
	crudModuleEntry         = "bluzelle_crud"
	maxKeysSize             = uint64(102400)
	maxKeyValuesSize        = uint64(102400)
	DefaultLeaseBlockHeight = int64(math.Floor(10 * 86400 / 5.5)) // (10 days of blocks * seconds/day) / seconds per block
)

// constants
var (
	// default home directories for the application CLI
	DefaultCLIHome = os.ExpandEnv("$HOME/.blzcli")

	// DefaultNodeHome sets the folder where the application data and configuration will be stored
	DefaultNodeHome = os.ExpandEnv("$HOME/.blzd")

	// ModuleBasicManager is in charge of setting up basic module elements
	ModuleBasics = module.NewBasicManager(
		genutil.AppModuleBasic{},
		auth.AppModuleBasic{},
		bank.AppModuleBasic{},
		staking.AppModuleBasic{},
		distr.AppModuleBasic{},
		gov.NewAppModuleBasic(paramsclient.ProposalHandler, distr.ProposalHandler),
		params.AppModuleBasic{},
		slashing.AppModuleBasic{},
		supply.AppModuleBasic{},
		crud.AppModuleBasic{},
		tax.AppModuleBasic{},
		faucet.AppModuleBasic{},
		oracle.AppModuleBasic{},
		aggregator.AppModuleBasic{},
	)

	// account permissions
	maccPerms = map[string][]string{
		auth.FeeCollectorName:     nil,
		distr.ModuleName:          nil,
		staking.BondedPoolName:    {supply.Burner, supply.Staking},
		staking.NotBondedPoolName: {supply.Burner, supply.Staking},
		faucet.ModuleName:         {supply.Minter}, // add permissions for faucet
		gov.ModuleName:            {supply.Burner},
	}
)

func IsCrudEnabled(nodeHome string) bool {
	enabled := true

	viper.SetConfigName("app")
	viper.SetConfigType("toml")
	viper.AddConfigPath(nodeHome + "/config/")

	if viper.ReadInConfig() == nil {
		if viper.IsSet(crudModuleEntry) {
			enabled = viper.GetBool(crudModuleEntry)
		}
	}
	return enabled
}

func MakeCodec() *codec.Codec {
	var cdc = codec.New()
	ModuleBasics.RegisterCodec(cdc)
	sdk.RegisterCodec(cdc)
	codec.RegisterCrypto(cdc)
	return cdc
}

type CRUDApp struct {
	*bam.BaseApp
	cdc *codec.Codec

	// keys to access the substores
	keys  map[string]*sdk.KVStoreKey
	tkeys map[string]*sdk.TransientStoreKey

	// Keepers
	accountKeeper  auth.AccountKeeper
	bankKeeper     bank.Keeper
	stakingKeeper  staking.Keeper
	slashingKeeper slashing.Keeper
	distrKeeper    distr.Keeper
	govKeeper      gov.Keeper
	supplyKeeper   supply.Keeper
	paramsKeeper   params.Keeper
	crudKeeper     crud.Keeper
	taxKeeper      tax.Keeper
	oracleKeeper   oracle.Keeper
	faucetKeeper   faucet.Keeper
	aggKeeper      aggregator.Keeper

	// Module Manager
	mm *module.Manager
}

func NewCRUDApp(
	logger log.Logger,
	db dbm.DB,
	baseAppOptions ...func(*bam.BaseApp),
) *CRUDApp {

	// First define the top level codec that will be shared by the different modules
	cdc := MakeCodec()

	// BaseApp handles interactions with Tendermint through the ABCI protocol
	bApp := bam.NewBaseApp(bluzellechain.AppName, logger, db, auth.DefaultTxDecoder(cdc), baseAppOptions...)

	bApp.SetAppVersion(version.Version)

	keys := sdk.NewKVStoreKeys(
		bam.MainStoreKey, auth.StoreKey, staking.StoreKey,
		supply.StoreKey, distr.StoreKey, slashing.StoreKey,
		gov.StoreKey, params.StoreKey, crud.StoreKey,
		tax.StoreKey,
		faucet.StoreKey, crud.LeaseKey, crud.OwnerKey, oracle.SourceStoreKey, oracle.ConfigStoreKey,
		oracle.ProofStoreKey, oracle.VoteStoreKey, oracle.ValueStoreKey, oracle.ConfigStoreKey,
		aggregator.StoreKey,
	)

	tkeys := sdk.NewTransientStoreKeys(staking.TStoreKey, params.TStoreKey)

	// Here you initialize your application with the store keys it requires
	var app = &CRUDApp{
		BaseApp: bApp,
		cdc:     cdc,
		keys:    keys,
		tkeys:   tkeys,
	}

	// The ParamsKeeper handles parameter storage for the application
	app.paramsKeeper = params.NewKeeper(app.cdc, keys[params.StoreKey], tkeys[params.TStoreKey])
	// Set specific supspaces
	authSubspace := app.paramsKeeper.Subspace(auth.DefaultParamspace)
	bankSubspace := app.paramsKeeper.Subspace(bank.DefaultParamspace)
	stakingSubspace := app.paramsKeeper.Subspace(staking.DefaultParamspace)
	distrSubspace := app.paramsKeeper.Subspace(distr.DefaultParamspace)
	slashingSubspace := app.paramsKeeper.Subspace(slashing.DefaultParamspace)
	govSubspace := app.paramsKeeper.Subspace(gov.DefaultParamspace).WithKeyTable(gov.ParamKeyTable())

	// The AccountKeeper handles address -> account lookups
	app.accountKeeper = auth.NewAccountKeeper(
		app.cdc,
		keys[auth.StoreKey],
		authSubspace,
		auth.ProtoBaseAccount,
	)

	// The BankKeeper allows you perform sdk.Coins interactions
	app.bankKeeper = bank.NewBaseKeeper(
		app.accountKeeper,
		bankSubspace,
		app.ModuleAccountAddrs(),
	)

	// The SupplyKeeper collects transaction fees and renders them to the fee distribution module
	app.supplyKeeper = supply.NewKeeper(
		app.cdc,
		keys[supply.StoreKey],
		app.accountKeeper,
		app.bankKeeper,
		maccPerms,
	)

	// The staking keeper
	stakingKeeper := staking.NewKeeper(
		app.cdc,
		keys[staking.StoreKey],
		app.supplyKeeper,
		stakingSubspace,
	)

	app.distrKeeper = distr.NewKeeper(
		app.cdc,
		keys[distr.StoreKey],
		distrSubspace,
		&stakingKeeper,
		app.supplyKeeper,
		auth.FeeCollectorName,
		app.ModuleAccountAddrs(),
	)

	app.slashingKeeper = slashing.NewKeeper(
		app.cdc,
		keys[slashing.StoreKey],
		&stakingKeeper,
		slashingSubspace,
	)

	govRouter := gov.NewRouter()
	govRouter.AddRoute(gov.RouterKey, gov.ProposalHandler).
		AddRoute(distr.RouterKey, distr.NewCommunityPoolSpendProposalHandler(app.distrKeeper))

	app.govKeeper = gov.NewKeeper(
		app.cdc,
		keys[gov.StoreKey],
		govSubspace,
		app.supplyKeeper,
		&stakingKeeper,
		govRouter,
	)

	// register the staking hooks
	// NOTE: stakingKeeper above is passed by reference, so that it will contain these hooks
	app.stakingKeeper = *stakingKeeper.SetHooks(
		staking.NewMultiStakingHooks(
			app.distrKeeper.Hooks(),
			app.slashingKeeper.Hooks()),
	)

	// The CrudKeeper is the Keeper from the module
	// It handles interactions with the namestore
	app.crudKeeper = crud.NewKeeper(
		app.bankKeeper,
		keys[crud.StoreKey],
		keys[crud.LeaseKey],
		keys[crud.OwnerKey],
		app.cdc,
		crud.MaxKeeperSizes{MaxKeysSize: maxKeysSize, MaxKeyValuesSize: maxKeyValuesSize, MaxDefaultLeaseBlocks: DefaultLeaseBlockHeight},
	)

	app.taxKeeper = tax.NewKeeper(
		keys[tax.StoreKey],
		app.cdc,
	)

	app.oracleKeeper = oracle.NewKeeper(
		app.cdc,
		keys[oracle.SourceStoreKey],
		keys[oracle.ConfigStoreKey],
		keys[oracle.ProofStoreKey],
		keys[oracle.VoteStoreKey],
		keys[oracle.ValueStoreKey],
		app.stakingKeeper,
		nil,
	)

	app.aggKeeper = aggregator.NewKeeper(
		app.cdc,
		app.oracleKeeper,
		keys[aggregator.StoreKey],
		nil,
	)

	app.faucetKeeper = faucet.NewKeeper(
		app.supplyKeeper,
		app.stakingKeeper,
		2000000000,
		5*time.Minute,
		keys[faucet.StoreKey],
		app.cdc)

	// check flags...
	bluzelleCrud := IsCrudEnabled(DefaultNodeHome)
	logger.Info("Module setup", crudModuleEntry, bluzelleCrud)

	app.mm = module.NewManager(
		genutil.NewAppModule(app.accountKeeper, app.stakingKeeper, app.BaseApp.DeliverTx),
		auth.NewAppModule(app.accountKeeper),
		bank.NewAppModule(app.bankKeeper, app.accountKeeper),
		crud.NewAppModule(!bluzelleCrud, app.crudKeeper, app.bankKeeper),
		tax.NewAppModule(app.taxKeeper),
		faucet.NewAppModule(app.faucetKeeper), // faucet module
		supply.NewAppModule(app.supplyKeeper, app.accountKeeper),
		gov.NewAppModule(app.govKeeper, app.accountKeeper, app.supplyKeeper),
		distr.NewAppModule(app.distrKeeper, app.accountKeeper, app.supplyKeeper, app.stakingKeeper),
		slashing.NewAppModule(app.slashingKeeper, app.accountKeeper, app.stakingKeeper),
		staking.NewAppModule(app.stakingKeeper, app.accountKeeper, app.supplyKeeper),
		oracle.NewAppModule(app.oracleKeeper),
		aggregator.NewAppModule(app.aggKeeper),
	)

	app.mm.SetOrderBeginBlockers(distr.ModuleName, slashing.ModuleName, oracle.ModuleName)
	app.mm.SetOrderEndBlockers(gov.ModuleName, staking.ModuleName, aggregator.ModuleName)

	// Sets the order of Genesis - Order matters, genutil is to always come last
	// NOTE: The genutils moodule must occur after staking so that pools are
	// properly initialized with tokens from genesis accounts.
	app.mm.SetOrderInitGenesis(
		distr.ModuleName,
		staking.ModuleName,
		auth.ModuleName,
		bank.ModuleName,
		slashing.ModuleName,
		gov.ModuleName,
		crud.ModuleName,
		tax.ModuleName,
		supply.ModuleName,
		oracle.ModuleName,
		aggregator.ModuleName,
		genutil.ModuleName,
	)

	// register all module routes and module queriers
	app.mm.RegisterRoutes(app.Router(), app.QueryRouter())

	// The initChainer handles translating the genesis.json file into initial state for the network
	app.SetInitChainer(app.InitChainer)
	app.SetBeginBlocker(app.BeginBlocker)
	app.SetEndBlocker(app.EndBlocker)

	addAnteHandler(app)

	// initialize stores
	app.MountKVStores(keys)
	app.MountTransientStores(tkeys)

	err := app.LoadLatestVersion(app.keys[bam.MainStoreKey])
	if err != nil {
		tmos.Exit(err.Error())
	}

	go oracle.StartFeeder(app.oracleKeeper, app.accountKeeper, cdc)

	return app
}

func addAnteHandler(app *CRUDApp) {

	// The AnteHandler handles signature verification and transaction pre-processing
	app.SetAnteHandler(
		appAnte.NewAnteHandler(
			app.accountKeeper,
			app.supplyKeeper,
			app.taxKeeper,
			app.bankKeeper,
			auth.DefaultSigVerificationGasConsumer,
		),
	)

}

// GenesisState represents chain state at the start of the chain. Any initial state (account balances) are stored here.
type GenesisState map[string]json.RawMessage

func NewDefaultGenesisState() GenesisState {
	return ModuleBasics.DefaultGenesis()
}

func (app *CRUDApp) InitChainer(ctx sdk.Context, req abci.RequestInitChain) abci.ResponseInitChain {
	var genesisState GenesisState

	err := app.cdc.UnmarshalJSON(req.AppStateBytes, &genesisState)
	if err != nil {
		panic(err)
	}

	return app.mm.InitGenesis(ctx, genesisState)
}

func (app *CRUDApp) BeginBlocker(ctx sdk.Context, req abci.RequestBeginBlock) abci.ResponseBeginBlock {
	return app.mm.BeginBlock(ctx, req)
}

func (app *CRUDApp) EndBlocker(ctx sdk.Context, req abci.RequestEndBlock) abci.ResponseEndBlock {
	r := app.mm.EndBlock(ctx, req)
	app.crudKeeper.ProcessLeasesAtBlockHeight(ctx, app.crudKeeper.GetKVStore(ctx), app.crudKeeper.GetLeaseStore(ctx), app.crudKeeper.GetOwnerStore(ctx), ctx.BlockHeight())
	return r
}

func (app *CRUDApp) LoadHeight(height int64) error {
	return app.LoadVersion(height, app.keys[bam.MainStoreKey])
}

// ModuleAccountAddrs returns all the app's module account addresses.
func (app *CRUDApp) ModuleAccountAddrs() map[string]bool {
	modAccAddrs := make(map[string]bool)
	for acc := range maccPerms {
		modAccAddrs[supply.NewModuleAddress(acc).String()] = true
	}

	return modAccAddrs
}

func (app *CRUDApp) ExportAppStateAndValidators(forZeroHeight bool, jailWhiteList []string, ) (appState json.RawMessage, validators []tmtypes.GenesisValidator, err error) {

	// as if they could withdraw from the start of the next block
	ctx := app.NewContext(true, abci.Header{Height: app.LastBlockHeight()})

	if forZeroHeight {
		app.prepForZeroHeightGenesis(ctx, jailWhiteList)
	}

	genState := app.mm.ExportGenesis(ctx)
	appState, err = codec.MarshalJSONIndent(app.cdc, genState)
	if err != nil {
		return nil, nil, err
	}

	validators = staking.WriteValidators(ctx, app.stakingKeeper)

	return appState, validators, nil
}

// prepare for fresh start at zero height
// NOTE zero height genesis is a temporary feature which will be deprecated
//      in favour of export at a block height
func (app *CRUDApp) prepForZeroHeightGenesis(ctx sdk.Context, jailWhiteList []string) {
	applyWhiteList := false

	//Check if there is a whitelist
	if len(jailWhiteList) > 0 {
		applyWhiteList = true
	}

	whiteListMap := make(map[string]bool)

	for _, addr := range jailWhiteList {
		_, err := sdk.ValAddressFromBech32(addr)
		if err != nil {
			panic(err)
		}
		whiteListMap[addr] = true
	}

	/* Just to be safe, assert the invariants on current state. */
	// app.crisisKeeper.AssertInvariants(ctx)

	/* Handle fee distribution state. */

	// withdraw all validator commission
	app.stakingKeeper.IterateValidators(ctx, func(_ int64, val staking.ValidatorI) (stop bool) {
		_, _ = app.distrKeeper.WithdrawValidatorCommission(ctx, val.GetOperator())
		return false
	})

	// withdraw all delegator rewards
	dels := app.stakingKeeper.GetAllDelegations(ctx)
	for _, delegation := range dels {
		_, _ = app.distrKeeper.WithdrawDelegationRewards(ctx, delegation.DelegatorAddress, delegation.ValidatorAddress)
	}

	// clear validator slash events
	app.distrKeeper.DeleteAllValidatorSlashEvents(ctx)

	// clear validator historical rewards
	app.distrKeeper.DeleteAllValidatorHistoricalRewards(ctx)

	// set context height to zero
	height := ctx.BlockHeight()
	ctx = ctx.WithBlockHeight(0)

	// reinitialize all validators
	app.stakingKeeper.IterateValidators(ctx, func(_ int64, val staking.ValidatorI) (stop bool) {

		// donate any unwithdrawn outstanding reward fraction tokens to the community pool
		scraps := app.distrKeeper.GetValidatorOutstandingRewards(ctx, val.GetOperator())
		feePool := app.distrKeeper.GetFeePool(ctx)
		feePool.CommunityPool = feePool.CommunityPool.Add(scraps...)
		app.distrKeeper.SetFeePool(ctx, feePool)

		app.distrKeeper.Hooks().AfterValidatorCreated(ctx, val.GetOperator())
		return false
	})

	// reinitialize all delegations
	for _, del := range dels {
		app.distrKeeper.Hooks().BeforeDelegationCreated(ctx, del.DelegatorAddress, del.ValidatorAddress)
		app.distrKeeper.Hooks().AfterDelegationModified(ctx, del.DelegatorAddress, del.ValidatorAddress)
	}

	// reset context height
	ctx = ctx.WithBlockHeight(height)

	/* Handle staking state. */

	// iterate through redelegations, reset creation height
	app.stakingKeeper.IterateRedelegations(ctx, func(_ int64, red staking.Redelegation) (stop bool) {
		for i := range red.Entries {
			red.Entries[i].CreationHeight = 0
		}
		app.stakingKeeper.SetRedelegation(ctx, red)
		return false
	})

	// iterate through unbonding delegations, reset creation height
	app.stakingKeeper.IterateUnbondingDelegations(ctx, func(_ int64, ubd staking.UnbondingDelegation) (stop bool) {
		for i := range ubd.Entries {
			ubd.Entries[i].CreationHeight = 0
		}
		app.stakingKeeper.SetUnbondingDelegation(ctx, ubd)
		return false
	})

	// Iterate through validators by power descending, reset bond heights, and
	// update bond intra-tx counters.
	store := ctx.KVStore(app.keys[staking.StoreKey])
	iter := sdk.KVStoreReversePrefixIterator(store, staking.ValidatorsKey)
	counter := int16(0)

	for ; iter.Valid(); iter.Next() {
		addr := sdk.ValAddress(iter.Key()[1:])
		validator, found := app.stakingKeeper.GetValidator(ctx, addr)
		if !found {
			panic("expected validator, not found")
		}

		validator.UnbondingHeight = 0
		if applyWhiteList && !whiteListMap[addr.String()] {
			validator.Jailed = true
			app.stakingKeeper.SetValidator(ctx, validator)
			app.stakingKeeper.DeleteValidatorByPowerIndex(ctx, validator)
		} else {
			app.stakingKeeper.SetValidator(ctx, validator)
		}

		counter++
	}

	iter.Close()

	_ = app.stakingKeeper.ApplyAndReturnValidatorSetUpdates(ctx)

	/* Handle slashing state. */

	// reset start height on signing infos
	app.slashingKeeper.IterateValidatorSigningInfos(
		ctx,
		func(addr sdk.ConsAddress, info slashing.ValidatorSigningInfo) (stop bool) {
			info.StartHeight = 0
			app.slashingKeeper.SetValidatorSigningInfo(ctx, addr, info)
			return false
		},
	)
}
