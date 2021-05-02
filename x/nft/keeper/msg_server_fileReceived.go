package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) FileReceived(goCtx context.Context, msg *types.MsgFileReceived) (*types.MsgFileReceivedResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)


	// TODO: Handling the message
	_ = ctx

	return &types.MsgFileReceivedResponse{}, nil
}
