package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/curium"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/faucet/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc      codec.Marshaler
		storeKey sdk.StoreKey
		memKey   sdk.StoreKey
		bankKeeper bankkeeper.Keeper
		msgBroadcaster curium.MsgBroadcaster
		keyringReader *curium.KeyRingReader
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewKeeper(
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	bankkeeper bankkeeper.Keeper,
	msgBroadcaster curium.MsgBroadcaster,
	keyringReader *curium.KeyRingReader,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
		memKey:   memKey,
		bankKeeper: bankkeeper,
		msgBroadcaster: msgBroadcaster,
		keyringReader: keyringReader,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

