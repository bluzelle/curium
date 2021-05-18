package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) GetNShortestLeases(goCtx context.Context, msg *types.MsgGetNShortestLeases) (*types.MsgGetNShortestLeasesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	KeyLeases, err := k.GetNShortestLeaseBlocks(&ctx, msg.Creator, msg.Uuid, msg.Num)

	if err != nil {
		return nil, err
	}

	return &types.MsgGetNShortestLeasesResponse{Uuid: msg.Uuid, KeyLeases: KeyLeases}, nil
}
