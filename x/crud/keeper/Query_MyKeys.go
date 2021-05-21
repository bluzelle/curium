package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) MyKeys(goCtx context.Context, req *types.QueryMyKeysRequest) (*types.QueryMyKeysResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keysUnderUuid, pagination, err := k.GetOwnedKeys(&ctx, req.Address, req.Uuid, req.Pagination)

	return &types.QueryMyKeysResponse{Keys: keysUnderUuid, Pagination: pagination}, err
}
