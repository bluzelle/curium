package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k Keeper) Read(c context.Context, req *types.QueryReadRequest) (*types.QueryReadResponse, error) {

	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasCrudValue(&ctx, req.Uuid, req.Key) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	CrudValue := k.GetCrudValue(&ctx, req.Uuid, req.Key)

	return &types.QueryReadResponse{Value: CrudValue.GetValue()}, nil
}
