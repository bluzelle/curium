package keeper

import (
	"github.com/bluzelle/curium/x/synchronizer/types"
)

var _ types.QueryServer = Keeper{}
