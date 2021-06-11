package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/voting/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k *msgServer) Vote(goCtx context.Context, msg *types.MsgVote) (*types.MsgVoteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	valid := k.IsVoteValid(ctx, msg)
	if !valid {
		return nil, sdkerrors.New("voting", 2, "Vote not valid")
	}
	vote := types.Vote{
		Id:       msg.Id,
		VoteType: msg.VoteType,
		Creator:  msg.Creator,
		Value:    msg.Value,
		Valcons:  msg.Valcons,
		Weight:   k.GetValidatorWeight(ctx, msg.Valcons),
	}
	k.Logger(ctx).Info("Storing received vote", "id", vote.Id, "type", vote.VoteType, "msg block", msg.Block, "height", ctx.BlockHeight())
	k.StoreVote(ctx, &vote)
	return &types.MsgVoteResponse{}, nil
}
