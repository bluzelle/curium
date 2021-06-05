package nft

import (
	"github.com/bluzelle/curium/x/nft/keeper"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	// Set all the nft
	for _, elem := range genState.NftList {
		k.SetNft(ctx, *elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesisState()

	// this line is used by starport scaffolding # genesis/module/export
	// Get all nft
	nftList := k.GetAllNft(ctx)
	for _, elem := range nftList {
		elem := elem
		genesis.NftList = append(genesis.NftList, &elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
