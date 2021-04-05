package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) CrudValueAll(c context.Context, req *types.QueryAllCrudValueRequest) (*types.QueryAllCrudValueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var CrudValues []*types.CrudValue
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	CrudValueStore := prefix.NewStore(store, types.KeyPrefix(types.CrudValueKey))

	pageRes, err := query.Paginate(CrudValueStore, req.Pagination, func(key []byte, value []byte) error {
		var CrudValue types.CrudValue
		if err := k.cdc.UnmarshalBinaryBare(value, &CrudValue); err != nil {
			return err
		}

		CrudValues = append(CrudValues, &CrudValue)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllCrudValueResponse{CrudValue: CrudValues, Pagination: pageRes}, nil
}

func (k Keeper) CrudValue(c context.Context, req *types.QueryGetCrudValueRequest) (*types.QueryGetCrudValueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var CrudValue types.CrudValue
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasCrudValue(ctx, req.Uuid, req.Key) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrudValueKey))
	k.cdc.MustUnmarshalBinaryBare(store.Get(MakeCrudValueKey(req.Uuid, req.Key)), &CrudValue)

	return &types.QueryGetCrudValueResponse{CrudValue: &CrudValue}, nil
}
