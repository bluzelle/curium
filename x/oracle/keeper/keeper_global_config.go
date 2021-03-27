package keeper

import (
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k Keeper) DumpGlobalConfig(ctx sdk.Context) types.GlobalOracleConfig {
	return types.GlobalOracleConfig{
		AdminAddress: k.GetAdminAddress(ctx),
	}
}

func (k Keeper) SetAdminAddress(ctx sdk.Context, admin sdk.AccAddress) {
	store := k.GetStore(ctx)
	store.Set(types.ConfigStoreKey.MakeKey("admin-address"), admin)
}

func (k Keeper) GetAdminAddress(ctx sdk.Context) sdk.AccAddress{
	store := k.GetStore(ctx)
	return store.Get(types.ConfigStoreKey.MakeKey("admin-address"))
}
