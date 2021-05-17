package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) DeleteAll(goCtx context.Context, msg *types.MsgDeleteAll) (*types.MsgDeleteAllResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.OwnsUuid(&ctx, msg.Uuid, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner of uuid")
	}

	keys, _ := k.GetAllMyKeys(&ctx, msg.Creator, msg.Uuid)

	for _, key := range keys {
		k.RemoveCrudValue(&ctx, msg.Uuid, key)
		k.DeleteLease(&ctx, msg.Uuid, key)
		k.DeleteOwner(&ctx, msg.Creator, msg.Uuid, key)
	}

	return &types.MsgDeleteAllResponse{}, nil
}
