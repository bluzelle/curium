package keeper

import (
	"context"
	"fmt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) MultiUpdate(goCtx context.Context, msg *types.MsgMultiUpdate) (*types.MsgMultiUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if len(msg.Uuid) == 0 || len(msg.KeyValues) == 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	// we're past basic validation, now scan owners & if the keys exist...
	for i := range msg.KeyValues[:] {

		if !k.HasCrudValue(&ctx, msg.Uuid, msg.KeyValues[i].Key) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("Key does not exist [%d]", i))
		}

		owner := k.GetOwner(&ctx, msg.Uuid, msg.KeyValues[i].Key)

		if !(owner == msg.Creator) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("Incorrect Owner [%d]", i))
		}

		oldCrudValue := k.GetCrudValue(&ctx, msg.Uuid, msg.KeyValues[i].Key)

		newCrudValue := k.NewCrudValue(
			oldCrudValue.GetCreator(),
			msg.Uuid,
			msg.KeyValues[i].Key,
			msg.KeyValues[i].Value,
			oldCrudValue.GetLease(),
			oldCrudValue.GetHeight(),
		)

		k.SetCrudValue(&ctx, newCrudValue)
		k.UpdateLease(&ctx, newCrudValue.Uuid, newCrudValue.Key, newCrudValue.Lease)
	}

	return &types.MsgMultiUpdateResponse{}, nil
}
