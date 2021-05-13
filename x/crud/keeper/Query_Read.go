package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Read(c context.Context, req *types.QueryReadRequest) (*types.QueryReadResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var CrudValue types.CrudValue
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasCrudValue(&ctx, req.Uuid, req.Key) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	k.cdc.MustUnmarshalBinaryBare(store.Get(MakeCrudValueKey(req.Uuid, req.Key)), &CrudValue)

	return &types.QueryReadResponse{Value: CrudValue.GetValue()}, nil
}