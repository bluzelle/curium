package keeper

import (
	"context"
	"fmt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) GetLease(goCtx context.Context, msg *types.MsgGetLease) (*types.MsgGetLeaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %s doesn't exist", msg.Key))
	}

	lease := k.GetRemainingLeaseBlocks(&ctx, msg.Uuid, msg.Key)

	return &types.MsgGetLeaseResponse{Uuid: msg.Uuid, Key: msg.Key, LeaseBlocks: lease}, nil
}
