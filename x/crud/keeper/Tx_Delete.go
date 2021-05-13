package keeper

import (
	"context"
	"fmt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Delete(goCtx context.Context, msg *types.MsgDelete) (*types.MsgDeleteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %s doesn't exist", msg.Key))
	}
	if msg.Creator != k.GetOwner(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveCrudValue(&ctx, msg.Uuid, msg.Key)

	return &types.MsgDeleteResponse{}, nil
}
