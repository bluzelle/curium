package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Upsert(goCtx context.Context, msg *types.MsgUpsert) (*types.MsgUpsertResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		_, err := k.Update(
			goCtx,
			types.NewMsgUpdate(msg.Creator, msg.Uuid, msg.Key, msg.Value, msg.Lease),
		)
		if err != nil {
			return nil, err
		}
	} else {
		_, err := k.Create(
			goCtx,
			types.NewMsgCreate(msg.Creator, msg.Uuid, msg.Key, msg.Value, msg.Lease),
		)
		if err != nil {
			return nil, err
		}
	}

	return &types.MsgUpsertResponse{}, nil
}
