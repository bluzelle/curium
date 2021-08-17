package aggregator

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/bluzelle/curium/x/aggregator/types"
	"github.com/bluzelle/curium/x/aggregator/keeper"
)

// InitGenesis initialize default parameters
// and the keeper's address to pubkey map
func InitGenesis(ctx sdk.Context, k keeper.Keeper, data types.GenesisState) {
	fmt.Println("testing")
}

// ExportGenesis writes the current store values
// to a genesis file, which can be imported again
// with InitGenesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) (data types.GenesisState) {
	return types.NewGenesisState(
		k.DumpAggValues(ctx),
		k.DumpQueueItems(ctx),
	)
}
