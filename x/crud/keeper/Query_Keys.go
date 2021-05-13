package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Keys(goCtx context.Context, req *types.QueryKeysRequest) (*types.QueryKeysResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var keys []string
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	CrudValueStore := prefix.NewStore(store, types.UuidPrefix(types.CrudValueKey, req.Uuid))

	pageRes, err := query.Paginate(CrudValueStore, req.Pagination, func(key []byte, value []byte) error {
		var CrudValue types.CrudValue
		if err := k.cdc.UnmarshalBinaryBare(value, &CrudValue); err != nil {
			return err
		}

		keys = append(keys, CrudValue.GetKey())
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeysResponse{Key: keys, Pagination: pageRes}, nil
}


