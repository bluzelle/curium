package keeper

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k Keeper) GetLease (goCtx context.Context, req *types.QueryGetLeaseRequest) (*types.QueryGetLeaseResponse, error)  {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasCrudValue(&ctx, req.Uuid, req.Key) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %s doesn't exist", req.Key))
	}

	lease := k.GetRemainingLeaseBlocks(&ctx, req.Uuid, req.Key)

	return &types.QueryGetLeaseResponse{Uuid: req.Uuid, Key: req.Key, LeaseBlocks: lease}, nil
}