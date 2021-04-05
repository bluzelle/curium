package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SourceAll(c context.Context, req *types.QueryAllSourceRequest) (*types.QueryAllSourceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var sources []*types.Source
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	sourceStore := prefix.NewStore(store, types.KeyPrefix(types.SourceKey))

	pageRes, err := query.Paginate(sourceStore, req.Pagination, func(key []byte, value []byte) error {
		var source types.Source
		if err := k.cdc.UnmarshalBinaryBare(value, &source); err != nil {
			return err
		}

		sources = append(sources, &source)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllSourceResponse{Source: sources, Pagination: pageRes}, nil
}

func (k Keeper) Source(c context.Context, req *types.QueryGetSourceRequest) (*types.QueryGetSourceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var source types.Source
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasSource(ctx, req.Name) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SourceKey))
	k.cdc.MustUnmarshalBinaryBare(store.Get([]byte(req.Name)), &source)

	return &types.QueryGetSourceResponse{Source: &source}, nil
}
