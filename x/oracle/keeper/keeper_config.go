package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) GetConfigStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.configStoreKey)
}

func (k Keeper) SetAdminAddress(ctx sdk.Context, admin sdk.AccAddress) {
	store := k.GetConfigStore(ctx)
	store.Set([]byte("admin-address"), admin)
}

func (k Keeper) GetAdminAddress(ctx sdk.Context) sdk.AccAddress{
	store := k.GetConfigStore(ctx)
	return store.Get([]byte("admin-address"))
}
