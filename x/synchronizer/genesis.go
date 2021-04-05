package synchronizer

import (
	"github.com/bluzelle/curium/x/synchronizer/keeper"
	"github.com/bluzelle/curium/x/synchronizer/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	// Set all the source
	for _, elem := range genState.SourceList {
		k.SetSource(ctx, *elem)
	}
	k.UpdateConfig(ctx, *genState.Config)
	// this line is used by starport scaffolding # ibc/genesis/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	// this line is used by starport scaffolding # genesis/module/export
	// Get all source
	sourceList := k.GetAllSource(ctx)
	for _, elem := range sourceList {
		elem := elem
		genesis.SourceList = append(genesis.SourceList, &elem)
	}
	config := k.ReadConfig(ctx)
	genesis.Config = &config
	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
