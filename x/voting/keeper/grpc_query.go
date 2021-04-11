package keeper

import (
	"github.com/bluzelle/curium/x/voting/types"
)

var _ types.QueryServer = Keeper{}
