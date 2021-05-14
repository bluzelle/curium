package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) DeleteAll(goCtx context.Context, msg *types.MsgDeleteAll) (*types.MsgDeleteAllResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgDeleteAllResponse{}, nil
}
