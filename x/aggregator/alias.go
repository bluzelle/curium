package aggregator

import (
	"github.com/bluzelle/curium/x/aggregator/keeper"
	"github.com/bluzelle/curium/x/aggregator/types"
)

var (
	ValueQueueStoreKey = types.ValueQueueStoreKey
	AggValueStoreKey = types.AggValueStoreKey
	NewKeeper     = keeper.NewKeeper
	NewQuerier    = keeper.NewQuerier
	ModuleCdc     = types.ModuleCdc
	RegisterCodec = types.RegisterCodec

)

type (
Keeper = keeper.Keeper
)