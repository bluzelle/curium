package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/voting/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Vote(goCtx context.Context, msg *types.MsgVote) (*types.MsgVoteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	valid := k.IsVoteValid(ctx, msg)
	if !valid {
		return nil, sdkerrors.New("voting", 2, "Vote not valid")
	}

	k.StoreVote(ctx, &types.Vote{
		Id:       msg.Id,
		VoteType: msg.VoteType,
		Creator:  msg.Creator,
		Value:    msg.Value,
		Valcons:  msg.Valcons,
		Weight:   k.GetValidatorWeight(ctx, msg.Valcons),
	})
	return &types.MsgVoteResponse{}, nil
}
