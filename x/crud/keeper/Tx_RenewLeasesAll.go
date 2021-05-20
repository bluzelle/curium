package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) RenewLeasesAll(goCtx context.Context, msg *types.MsgRenewLeasesAll) (*types.MsgRenewLeasesAllResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.OwnsUuid(&ctx, msg.Uuid, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	keys, _ := k.GetKeysUnderUuid(&ctx, msg.Uuid)

	for i:= range keys {
		renewLeaseRequest := types.NewMsgRenewLease(
			msg.Creator,
			msg.Uuid,
			keys[i],
			msg.Lease,
			)

		_, err := k.RenewLease(goCtx, renewLeaseRequest)

		if err != nil {
			return nil, err
		}


	}

	return &types.MsgRenewLeasesAllResponse{}, nil
}
