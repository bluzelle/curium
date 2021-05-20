package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Has(goCtx context.Context, msg *types.MsgHas) (*types.MsgHasResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	has := k.HasCrudValue(&ctx, msg.Uuid, msg.Key)

	return &types.MsgHasResponse{Has: has}, nil
}
