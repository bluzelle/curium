package keeper

import (
	"context"
	"fmt"

	"github.com/bluzelle/curium/x/synchronizer/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) CreateSource(goCtx context.Context, msg *types.MsgCreateSource) (*types.MsgCreateSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.AppendSource(
		ctx,
		msg.Creator,
		msg.Name,
		msg.Url,
	)

	return &types.MsgCreateSourceResponse{}, nil
}

func (k msgServer) UpdateSource(goCtx context.Context, msg *types.MsgUpdateSource) (*types.MsgUpdateSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var source = types.Source{
		Creator: msg.Creator,
		Name:    msg.Name,
		Url:     msg.Url,
	}

	// Checks that the element exists
	if !k.HasSource(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("source %s doesn't exist", msg.Name))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetSourceOwner(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetSource(ctx, source)

	return &types.MsgUpdateSourceResponse{}, nil
}

func (k msgServer) DeleteSource(goCtx context.Context, msg *types.MsgDeleteSource) (*types.MsgDeleteSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasSource(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("source %s doesn't exist", msg.Name))
	}
	if msg.Creator != k.GetSourceOwner(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveSource(ctx, msg.Name)

	return &types.MsgDeleteSourceResponse{}, nil
}
