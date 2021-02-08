package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/bluzelle/curium/x/oracle/types"
)

func (k Keeper) GetValueStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.sourceStoreKey)
}

func (k Keeper) UpdateSourceValue(ctx sdk.Context, vote types.Vote) {

}



