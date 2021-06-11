package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/voting/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) VoteProof(goCtx context.Context, msg *types.MsgVoteProof) (*types.MsgVoteProofResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	k.Logger(ctx).Info("Vote proof received", "id", msg.Id, "from", msg.From, "type", msg.VoteType, "batch", msg.Batch)
	proofStore := k.GetProofStore(ctx)
	proof := k.cdc.MustMarshalBinaryBare(msg)
	key := MakeProofStoreKey(msg.Valcons, msg.VoteType, msg.Id)
	proofStore.Set(key, proof)
	return &types.MsgVoteProofResponse{}, nil
}
