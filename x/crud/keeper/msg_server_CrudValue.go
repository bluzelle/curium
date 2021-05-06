package keeper

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) Create(goCtx context.Context, msg *types.MsgCreate) (*types.MsgCreateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.New("crud", 0, "key already exists")
	}

	k.AppendCrudValue(
		ctx,
		msg.Creator,
		msg.Uuid,
		msg.Key,
		msg.Value,
		msg.Lease,
		ctx.BlockHeight(),
	)

	return &types.MsgCreateResponse{}, nil
}

func (k msgServer) Update(goCtx context.Context, msg *types.MsgUpdate) (*types.MsgUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var CrudValue = types.CrudValue{
		Creator: msg.Creator,
		Uuid:    msg.Uuid,
		Key:     msg.Key,
		Value:   msg.Value,
		Lease:   msg.Lease,
		Height:  ctx.BlockHeight(),
	}

	// Checks that the element exists
	if !k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %s doesn't exist", msg.Key))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetOwner(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetCrudValue(&ctx, CrudValue)

	return &types.MsgUpdateResponse{}, nil
}

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
