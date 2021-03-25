package oracle

import (
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/bluzelle/curium/x/oracle/types"
)

const (
	ModuleName     = types.ModuleName
	StoreKey = types.StoreKey
)


var (
	NewKeeper     = keeper.NewKeeper
	NewQuerier    = keeper.NewQuerier
	ModuleCdc     = types.ModuleCdc
	RegisterCodec = types.RegisterCodec
)

type (
	Keeper          = keeper.Keeper
	SourceValue     = types.SourceValue
)
