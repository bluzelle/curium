package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) KeyValues(goCtx context.Context, msg *types.MsgKeyValues) (*types.MsgKeyValuesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	list := k.GetAllKeyValues(&ctx, msg.Uuid)

	return &types.MsgKeyValuesResponse{KeyValues: list}, nil
}
