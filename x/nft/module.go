package nft

import (
	"encoding/json"
	nft "github.com/bluzelle/curium/x/nft/keeper"
	nftTypes "github.com/bluzelle/curium/x/nft/types"
	"github.com/bluzelle/curium/x/torrentClient"
	"sync"

	"github.com/gorilla/mux"
	"github.com/spf13/cobra"

	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/bluzelle/curium/x/nft/client/cli"
	"github.com/bluzelle/curium/x/nft/client/rest"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
)

// Type check to ensure the interface is properly implemented
var (
	_ module.AppModule           = AppModule{}
	_ module.AppModuleBasic      = AppModuleBasic{}
	peerRegistered = false
)

// AppModuleBasic defines the basic application module used by the nft module.
type AppModuleBasic struct{}

// Name returns the aggregator module's name.
func (AppModuleBasic) Name() string {
	return nftTypes.ModuleName
}

// RegisterCodec registers the nft module's types for the given codec.
func (AppModuleBasic) RegisterCodec(cdc *codec.Codec) {
	nftTypes.RegisterCodec(cdc)
}

// DefaultGenesis returns default genesis state as raw bytes for the nft
// module.
func (AppModuleBasic) DefaultGenesis() json.RawMessage {
	return nftTypes.ModuleCdc.MustMarshalJSON(nftTypes.DefaultGenesisState())
}

// ValidateGenesis performs genesis state validation for the nft module.
func (AppModuleBasic) ValidateGenesis(bz json.RawMessage) error {
	var data nftTypes.GenesisState
	err := nftTypes.ModuleCdc.UnmarshalJSON(bz, &data)
	if err != nil {
		return err
	}
	return data.ValidateGenesis()
}

// RegisterRESTRoutes registers the REST routes for the nft module.
func (AppModuleBasic) RegisterRESTRoutes(ctx context.CLIContext, rtr *mux.Router) {
	rest.RegisterRoutes(ctx, rtr)
}

// GetTxCmd returns the root tx command for the nft module.
func (AppModuleBasic) GetTxCmd(cdc *codec.Codec) *cobra.Command {
	return cli.GetTxCmd(cdc)
}

// GetQueryCmd returns no root query command for the nft module.
func (AppModuleBasic) GetQueryCmd(cdc *codec.Codec) *cobra.Command {
	return cli.GetQueryCmd(nftTypes.ModuleName, cdc)
}

//____________________________________________________________________________

// AppModule implements an application module for the aggregator module.
type AppModule struct {
	AppModuleBasic
	keeper nft.Keeper
	btDirectory string
	btPort int
	// TODO: Add keepers that your application depends on
}

// NewAppModule creates a new AppModule object
func NewAppModule(k nft.Keeper, btDirectory string, btPort int /*TODO: Add Keepers that your application depends on*/) AppModule {
	return AppModule{
		AppModuleBasic:      AppModuleBasic{},
		keeper:              k,
		btDirectory: btDirectory,
		btPort: btPort,
		// TODO: Add keepers that your application depends on
	}
}

// Name returns the nft module's name.
func (AppModule) Name() string {
	return nftTypes.ModuleName
}

// RegisterInvariants registers the nft module invariants.
func (am AppModule) RegisterInvariants(_ sdk.InvariantRegistry) {}

// Route returns the message routing key for the nft module.
func (AppModule) Route() string {
	return nftTypes.RouterKey
}

// NewHandler returns an sdk.Handler for the nft module.
func (am AppModule) NewHandler() sdk.Handler {
	return NewHandler(am.keeper)
}

// QuerierRoute returns the nft module's querier route name.
func (AppModule) QuerierRoute() string {
	return nftTypes.QuerierRoute
}

// NewQuerierHandler returns the nft module sdk.Querier.
func (am AppModule) NewQuerierHandler() sdk.Querier {
	return nft.NewQuerier(am.keeper)
}

// InitGenesis performs genesis initialization for the aggregator module. It returns
// no validator updates.
func (am AppModule) InitGenesis(ctx sdk.Context, data json.RawMessage) []abci.ValidatorUpdate {
	var genesisState nftTypes.GenesisState
	nftTypes.ModuleCdc.MustUnmarshalJSON(data, &genesisState)
	InitGenesis(ctx, am.keeper, genesisState)
	return []abci.ValidatorUpdate{}
}

// ExportGenesis returns the exported genesis state as raw bytes for the nft
// module.
func (am AppModule) ExportGenesis(ctx sdk.Context) json.RawMessage {
	gs := ExportGenesis(ctx, am.keeper)
	return nftTypes.ModuleCdc.MustMarshalJSON(gs)
}

// BeginBlock returns the begin blocker for the nft module.
func (am AppModule) BeginBlock(_ sdk.Context, req abci.RequestBeginBlock) {
}

var once sync.Once
var registerPeerOnce sync.Once
// EndBlock returns the end blocker for the nft module. It returns no validator
// updates.
func (am AppModule) EndBlock(ctx sdk.Context, _ abci.RequestEndBlock) []abci.ValidatorUpdate {

	once.Do(func () {
		btClient, err := torrentClient.NewTorrentClient(am.btDirectory, am.btPort)

		if err != nil {
			am.keeper.Logger(ctx).Error("Error creating btClient", "btClient", err)
		}

		am.keeper.SetBtClient(btClient)
	})

	err := am.keeper.CheckNftUserExists(am.keeper.KeyringReader)

	if err != nil {
		am.keeper.Logger(ctx).Error("nft user does not exist in keyring", "nft", err)
	}

	if ctx.BlockHeight() > 10 {
		if err == nil {
			registerPeerOnce.Do(func () {
				go func() {
					err := am.keeper.BroadcastRegisterBtPeer(ctx)
					if err != nil {
						am.keeper.Logger(ctx).Error("Broadcast Register Bt Peer failed", "error", err)
					}
				}()})
			}

	}
	return []abci.ValidatorUpdate{}
}
