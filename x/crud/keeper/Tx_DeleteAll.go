package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) DeleteAll(goCtx context.Context, msg *types.MsgDeleteAll) (*types.MsgDeleteAllResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	keys, _ := k.GetAllMyKeys(&ctx, msg.Creator, msg.Uuid)

	for _, key := range keys {
		k.RemoveCrudValue(&ctx, msg.Uuid, key)

		k.DeleteOwner(&ctx, msg.Creator, msg.Uuid, key)
	}

	return &types.MsgDeleteAllResponse{}, nil
}
