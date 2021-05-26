package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) KeyValues(goCtx context.Context, req *types.QueryKeyValuesRequest) (*types.QueryKeyValuesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keyValues, pagination, err := k.GetAllKeyValues(&ctx, req.Uuid, req.Pagination, "")

	return &types.QueryKeyValuesResponse{KeyValues: keyValues, Pagination: pagination}, err
}
