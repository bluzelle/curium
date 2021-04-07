package crud

import (
	"github.com/bluzelle/curium/x/crud/keeper"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	// Set all the CrudValue
	for _, elem := range genState.CrudValueList {
		k.SetCrudValue(ctx, *elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	// this line is used by starport scaffolding # genesis/module/export
	// Get all CrudValue
	CrudValueList := k.GetAllCrudValue(ctx)
	for _, elem := range CrudValueList {
		elem := elem
		genesis.CrudValueList = append(genesis.CrudValueList, &elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
