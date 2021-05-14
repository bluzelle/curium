package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) MyKeys(goCtx context.Context, req *types.QueryMyKeysRequest) (*types.QueryMyKeysResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keys, err := k.GetAllMyKeys(&ctx, req.Address, req.Uuid)

	return &types.QueryMyKeysResponse{Key: keys}, err
}
