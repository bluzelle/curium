package aggregator_old

import (
	"github.com/bluzelle/curium/x/aggregator_old/keeper"
	"github.com/bluzelle/curium/x/aggregator_old/types"
)

var (
	ModuleName = types.ModuleName
	StoreKey = types.StoreKey
	NewKeeper     = keeper.NewKeeper
	NewQuerier    = keeper.NewQuerier
	ModuleCdc     = types.ModuleCdc
	RegisterCodec = types.RegisterCodec

)

type (
Keeper = keeper.Keeper
)