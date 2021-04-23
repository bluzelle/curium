package keeper

import (
	"github.com/bluzelle/curium/x/nft/types"
)

var _ types.QueryServer = Keeper{}
