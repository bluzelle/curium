package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RenewLease(goCtx context.Context, msg *types.MsgRenewLease) (*types.MsgRenewLeaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.OwnsUuid(&ctx, msg.Uuid, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner of uuid")
	}

	curCrudValue := k.GetCrudValue(&ctx, msg.Uuid, msg.Key)

	newCrudValue := k.NewCrudValue(
		curCrudValue.Creator,
		curCrudValue.Uuid,
		curCrudValue.Key,
		curCrudValue.Value,
		msg.Lease,
		ctx.BlockHeight())

	k.SetCrudValue(&ctx, *newCrudValue)
	k.UpdateLease(&ctx, newCrudValue)

	return &types.MsgRenewLeaseResponse{}, nil
}
