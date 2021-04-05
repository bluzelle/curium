package keeper

import (
	"github.com/bluzelle/curium/x/curium/types"
)

var _ types.QueryServer = Keeper{}
