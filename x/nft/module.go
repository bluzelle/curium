package nft

import (
	"encoding/json"
	keeper2 "github.com/bluzelle/curium/x/nft/keeper"
	types2 "github.com/bluzelle/curium/x/nft/types"

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
)

// AppModuleBasic defines the basic application module used by the nft module.
type AppModuleBasic struct{}

// Name returns the aggregator module's name.
func (AppModuleBasic) Name() string {
	return types2.ModuleName
}

// RegisterCodec registers the nft module's types for the given codec.
func (AppModuleBasic) RegisterCodec(cdc *codec.Codec) {
	types2.RegisterCodec(cdc)
}

// DefaultGenesis returns default genesis state as raw bytes for the nft
// module.
func (AppModuleBasic) DefaultGenesis() json.RawMessage {
	return types2.ModuleCdc.MustMarshalJSON(types2.DefaultGenesisState())
}

// ValidateGenesis performs genesis state validation for the nft module.
func (AppModuleBasic) ValidateGenesis(bz json.RawMessage) error {
	var data types2.GenesisState
	err := types2.ModuleCdc.UnmarshalJSON(bz, &data)
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
	return cli.GetQueryCmd(types2.ModuleName, cdc)
}

//____________________________________________________________________________

// AppModule implements an application module for the aggregator module.
type AppModule struct {
	AppModuleBasic

	keeper keeper2.Keeper
	// TODO: Add keepers that your application depends on
}

// NewAppModule creates a new AppModule object
func NewAppModule(k keeper2.Keeper, /*TODO: Add Keepers that your application depends on*/) AppModule {
	return AppModule{
		AppModuleBasic:      AppModuleBasic{},
		keeper:              k,
		// TODO: Add keepers that your application depends on
	}
}

// Name returns the nft module's name.
func (AppModule) Name() string {
	return types2.ModuleName
}

// RegisterInvariants registers the nft module invariants.
func (am AppModule) RegisterInvariants(_ sdk.InvariantRegistry) {}

// Route returns the message routing key for the nft module.
func (AppModule) Route() string {
	return types2.RouterKey
}

// NewHandler returns an sdk.Handler for the nft module.
func (am AppModule) NewHandler() sdk.Handler {
	return NewHandler(am.keeper)
}

// QuerierRoute returns the nft module's querier route name.
func (AppModule) QuerierRoute() string {
	return types2.QuerierRoute
}

// NewQuerierHandler returns the nft module sdk.Querier.
func (am AppModule) NewQuerierHandler() sdk.Querier {
	return keeper2.NewQuerier(am.keeper)
}

// InitGenesis performs genesis initialization for the aggregator module. It returns
// no validator updates.
func (am AppModule) InitGenesis(ctx sdk.Context, data json.RawMessage) []abci.ValidatorUpdate {
	var genesisState types2.GenesisState
	types2.ModuleCdc.MustUnmarshalJSON(data, &genesisState)
	InitGenesis(ctx, am.keeper, genesisState)
	return []abci.ValidatorUpdate{}
}

// ExportGenesis returns the exported genesis state as raw bytes for the nft
// module.
func (am AppModule) ExportGenesis(ctx sdk.Context) json.RawMessage {
	gs := ExportGenesis(ctx, am.keeper)
	return types2.ModuleCdc.MustMarshalJSON(gs)
}

// BeginBlock returns the begin blocker for the nft module.
func (am AppModule) BeginBlock(_ sdk.Context, req abci.RequestBeginBlock) {
}

// EndBlock returns the end blocker for the nft module. It returns no validator
// updates.
func (am AppModule) EndBlock(ctx sdk.Context, _ abci.RequestEndBlock) []abci.ValidatorUpdate {
	peerRegistered := false
	if ctx.BlockHeight() > 10 {
		if !peerRegistered {
			go func() {
				err := am.keeper.BroadcastRegisterBtPeer(ctx)
				if err == nil {
					peerRegistered = true
				}
			}()
		}
	}
	return []abci.ValidatorUpdate{}
}
