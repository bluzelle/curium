package aggregator

import (
	"github.com/bluzelle/curium/x/aggregator/keeper"
	"github.com/bluzelle/curium/x/aggregator/types"
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