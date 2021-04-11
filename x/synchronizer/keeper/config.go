package keeper

import (
	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) UpdateConfig(ctx sdk.Context, config types.Config) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ConfigKey))
	bz := k.cdc.MustMarshalBinaryBare(&config)
	store.Set([]byte("config"), bz)
}

func (k Keeper) ReadConfig(ctx sdk.Context) types.Config {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ConfigKey))
	bz := store.Get([]byte("config"))
	var config types.Config
	k.cdc.MustUnmarshalBinaryBare(bz, &config)
	return config
}
