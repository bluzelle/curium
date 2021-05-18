package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RenewLeasesAll(goCtx context.Context, msg *types.MsgRenewLeasesAll) (*types.MsgRenewLeasesAllResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keys, _ := k.GetAllMyKeys(&ctx, msg.Creator, msg.Uuid)

	for i:= range keys {
		renewLeaseRequest := types.NewMsgRenewLease(
			msg.Creator,
			msg.Uuid,
			keys[i],
			msg.Lease,
			)

		k.RenewLease(goCtx, renewLeaseRequest)

	}

	return &types.MsgRenewLeasesAllResponse{}, nil
}
