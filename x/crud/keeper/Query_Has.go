package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) Has(c context.Context, req *types.QueryHasRequest) (*types.QueryHasResponse, error) {

	ctx := sdk.UnwrapSDKContext(c)

	has := k.HasCrudValue(&ctx, req.Uuid, req.Key)

	return &types.QueryHasResponse{has}, nil
}
