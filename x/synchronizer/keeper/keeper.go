package keeper

import (
	"fmt"
	crudkeeper "github.com/bluzelle/curium/x/crud/keeper"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc       codec.Marshaler
		storeKey  sdk.StoreKey
		memKey    sdk.StoreKey
		AccKeeper authkeeper.AccountKeeper
		CrudKeeper crudkeeper.Keeper
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewKeeper(
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	AccKeeper authkeeper.AccountKeeper,
	CrudKeeper crudkeeper.Keeper,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
		memKey:   memKey,
		AccKeeper: AccKeeper,
		CrudKeeper: CrudKeeper,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetCdc() codec.Marshaler {
	return k.cdc
}
