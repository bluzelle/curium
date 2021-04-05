package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/synchronizer/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SetConfig(goCtx context.Context, msg *types.MsgSetConfig) (*types.MsgSetConfigResponse, error) {
	config := types.Config{
		SyncAddress: msg.SyncAddress,
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	k.UpdateConfig(ctx, config)
	return &types.MsgSetConfigResponse{}, nil
}
