package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) GetNShortestLeases (goCtx context.Context, req *types.QueryGetNShortestLeasesRequest) (*types.QueryGetNShortestLeasesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	KeyLeases, err := k.QueryNShortestLeaseBlocks(&ctx, "", req.Uuid, req.Num)

	if err != nil {
		return nil, err
	}

	return &types.QueryGetNShortestLeasesResponse{Uuid: req.Uuid, KeyLeases: KeyLeases}, nil
}