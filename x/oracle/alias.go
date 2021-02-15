package oracle

import (
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/bluzelle/curium/x/oracle/types"
)

const (
	ModuleName     = types.ModuleName
	RouterKey      = types.RouterKey
	SourceStoreKey = types.SourceStoreKey
	ProofStoreKey  = types.ProofStoreKey
	VoteStoreKey   = types.VoteStoreKey
	ValueStoreKey  = types.ValueStoreKey
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
