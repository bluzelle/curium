package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Has(goCtx context.Context, msg *types.MsgHas) (*types.MsgHasResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if len(msg.Uuid) == 0 || len(msg.Key) == 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	has := k.HasCrudValue(&ctx, msg.Uuid, msg.Key)

	return &types.MsgHasResponse{Has: has}, nil
}
