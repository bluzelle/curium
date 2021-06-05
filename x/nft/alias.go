package nft

import (
	keeper "github.com/bluzelle/curium/x/nft/keeper"
	types "github.com/bluzelle/curium/x/nft/types"
)

var (
	ModuleName     = types.ModuleName
	StoreKey = types.StoreKey
	MemStoreKey = types.MemStoreKey
	NewKeeper     = keeper.NewKeeper

)
type (
	Keeper  = keeper.Keeper
)
