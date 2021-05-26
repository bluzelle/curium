package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Count(goCtx context.Context, msg *types.MsgCount) (*types.MsgCountResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	count, _ := k.GetNumKeysOwned(&ctx, msg.Uuid)

	return &types.MsgCountResponse{Count: uint32(count)}, nil
}
