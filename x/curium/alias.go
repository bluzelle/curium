package curium

import (
	"github.com/bluzelle/curium/x/curium/keeper"
	"github.com/bluzelle/curium/x/curium/types"
)

var (
	ModuleName     = types.ModuleName
	StoreKey = types.StoreKey
	MemStoreKey = types.MemStoreKey
	NewKeeper     = keeper.NewKeeper
	NewKeyringReader = keeper.NewKeyringReader
)
type (
	Keeper  = keeper.Keeper
	MsgBroadcaster = keeper.MsgBroadcaster
	MsgBroadcasterResponse = keeper.MsgBroadcasterResponse
	KeyringReader = keeper.KeyringReader
)
