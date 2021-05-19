package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) KeyValues(goCtx context.Context, msg *types.MsgKeyValues) (*types.MsgKeyValuesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	list, pageResp, err := k.GetAllKeyValues(&ctx, msg.Uuid, msg.Pagination, "")

	if err != nil {
		return nil, err
	}

	return &types.MsgKeyValuesResponse{KeyValues: list, Pagination: pageResp}, nil
}
