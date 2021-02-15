package aggregator

import (
	"github.com/bluzelle/curium/x/aggregator/keeper"
	"github.com/bluzelle/curium/x/aggregator/types"
)

var (
	ValueQueueStoreKey = types.ValueQueueStoreKey
	AggValueStoreKey = types.AggValueStoreKey
)

type (

Keeper = keeper.Keeper
)