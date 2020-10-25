package tax

import (
	"github.com/bluzelle/curium/x/tax/internal/keeper"
	"github.com/bluzelle/curium/x/tax/internal/types"
)

// constants
var (
	ModuleName = types.ModuleName
	RouterKey  = types.RouterKey
	StoreKey   = types.StoreKey
)

// modules
var (
	NewKeeper     = keeper.NewKeeper
	NewQuerier    = keeper.NewQuerier
	ModuleCdc     = types.ModuleCdc
	RegisterCodec = types.RegisterCodec
)

// Keeper alias types
type (
	Keeper = keeper.Keeper
)
