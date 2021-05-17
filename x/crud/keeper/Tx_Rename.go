package keeper

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) Rename(goCtx context.Context, msg *types.MsgRename) (*types.MsgRenameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %s doesn't exist", msg.Key))
	}

	oldCrudValue := k.GetCrudValue(&ctx, msg.Uuid, msg.Key)

	newCreateRequest := types.NewMsgCreate(
		msg.Creator,
		msg.Uuid,
		msg.NewKey,
		oldCrudValue.Value,
		oldCrudValue.Lease,
		)

	_, err := k.Create(goCtx, newCreateRequest)
	if err != nil {
		return nil, err
	}

	k.RemoveCrudValue(&ctx, msg.Uuid, msg.Key)
	k.DeleteLease(&ctx, msg.Uuid, msg.Key)
	k.DeleteOwner(&ctx, msg.Creator, msg.Uuid, msg.Key)

	return &types.MsgRenameResponse{}, nil
}
