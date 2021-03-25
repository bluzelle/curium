package keeper

import (
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k Keeper) SetAdminAddress(ctx sdk.Context, admin sdk.AccAddress) {
	store := k.GetStore(ctx)
	store.Set([]byte(types.ConfigStorePrefix + "admin-address"), admin)
}

func (k Keeper) GetAdminAddress(ctx sdk.Context) sdk.AccAddress{
	store := k.GetStore(ctx)
	return store.Get([]byte(types.ConfigStorePrefix + "admin-address"))
}
