package oracle

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/bluzelle/curium/x/oracle/keeper"
)

// InitGenesis initialize default parameters
// and the keeper's address to pubkey map
func InitGenesis(ctx sdk.Context, k keeper.Keeper, data types.GenesisState) {
	k.SetAdminAddress(ctx, data.Config.AdminAddress)
}

// ExportGenesis writes the current store values
// to a genesis file, which can be imported again
// with InitGenesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) (data types.GenesisState) {
	// TODO: Define logic for exporting state
	return types.NewGenesisState()
}

