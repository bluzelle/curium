package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Rename(goCtx context.Context, msg *types.MsgRename) (*types.MsgRenameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	if len(msg.Uuid) == 0 || len(msg.Key) == 0 || len(msg.NewKey) == 0  {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	//owner := k.GetOwner(&ctx, msg.Uuid, msg.Key)
	//if owner.Empty() {
	//	return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist")
	//}
	//
	//if !msg.Owner.Equals(owner) {
	//	return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "Incorrect Owner")
	//}
	//
	//if !keeper.RenameKey(ctx, keeper.GetKVStore(ctx), keeper.GetOwnerStore(ctx), msg.UUID, msg.Key, msg.NewKey) {
	//	return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Rename failed")
	//}


	return &types.MsgRenameResponse{}, nil
}
