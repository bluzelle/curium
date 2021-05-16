package keeper

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) Update(goCtx context.Context, msg *types.MsgUpdate) (*types.MsgUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var CrudValue = &types.CrudValue{
		Creator: msg.Creator,
		Uuid:    msg.Uuid,
		Key:     msg.Key,
		Value:   msg.Value,
		Lease:   msg.Lease,
		Height:  ctx.BlockHeight(),
	}

	if !k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %s doesn't exist", msg.Key))
	}


	if !k.IsOwner(&ctx, msg.Creator, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetCrudValue(&ctx, *CrudValue)
	k.UpdateLease(&ctx, CrudValue)

	return &types.MsgUpdateResponse{}, nil
}
