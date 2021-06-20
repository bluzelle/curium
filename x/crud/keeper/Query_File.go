package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) File(c context.Context, req *types.QueryFileRequest) (*types.QueryFileResponse, error) {

	ctx := sdk.UnwrapSDKContext(c)

	val := k.GetCrudValue(&ctx, req.Uuid, req.Key)

	ret := types.QueryFileResponse{
		Data: val.Value,
		Uuid: req.Uuid,
		Key:  req.Key,
	}
	return &ret, nil
}
