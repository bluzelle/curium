package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Chunk(goCtx context.Context, msg *types.MsgChunk) (*types.MsgChunkResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	k.StoreNftChunk(ctx, msg.GetId(), msg.GetChunk(), msg.GetData())
	return &types.MsgChunkResponse{}, nil
}
