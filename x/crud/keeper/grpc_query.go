package keeper

import (
	"github.com/bluzelle/curium/x/crud/types"
)

var _ types.QueryServer = Keeper{}
