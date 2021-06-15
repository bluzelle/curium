package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) Create(goCtx context.Context, msg *types.MsgCreate) (*types.MsgCreateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.New("crud", 0, "key already exists")
	}

	ownsUuid, err := k.OwnsUuid(&ctx, msg.Uuid, msg.Creator)

	if !ownsUuid && err == nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
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

	k.SetLease(&ctx, msg.Uuid, msg.Key, ctx.BlockHeight(), msg.Lease)

	k.SetOwner(&ctx, msg.Uuid, msg.Key, msg.Creator)

	k.ConsumeGasForMsg(&ctx, msg.Lease, msg.Uuid, msg.Key, msg.Value)

	return &types.MsgCreateResponse{}, nil
}
