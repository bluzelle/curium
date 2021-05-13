package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"fmt"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

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
	k.UpdateLease(&ctx, CrudValue.Uuid, CrudValue.Key, CrudValue.Lease)

	return &types.MsgUpdateResponse{}, nil
}
