package keeper

import (
	"context"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Keys(goCtx context.Context, msg *types.MsgKeys) (*types.MsgKeysResponse, error) {
	var keys []string
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	CrudValueStore := prefix.NewStore(store, types.UuidPrefix(types.CrudValueKey, msg.Uuid))

	pageRes, err := query.Paginate(CrudValueStore, msg.Pagination, func(key []byte, value []byte) error {
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

	return &types.MsgKeysResponse{Keys: keys, Pagination: pageRes}, nil
}
