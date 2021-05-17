package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RegisterPeer(goCtx context.Context, msg *types.MsgRegisterPeer) (*types.MsgRegisterPeerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgRegisterPeerResponse{}, nil
}
