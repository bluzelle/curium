package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) MyKeys(goCtx context.Context, req *types.QueryMyKeysRequest) (*types.QueryMyKeysResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keysUnderUuid, pagination, err := k.GetAllMyKeys(&ctx, req.Address, req.Pagination)

	return &types.QueryMyKeysResponse{KeysUnderUuid: keysUnderUuid, Pagination: pagination}, err
}
