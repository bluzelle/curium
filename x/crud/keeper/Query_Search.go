package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) Search (goCtx context.Context, req *types.QuerySearchRequest) (*types.QuerySearchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keyValues, pageResponse, err := k.GetAllKeyValues(&ctx, req.Uuid, req.Pagination, req.SearchString)

	if err != nil {
		return nil, err
	}

	return &types.QuerySearchResponse{
		KeyValues:  keyValues,
		Pagination: pageResponse,
	}, nil
}