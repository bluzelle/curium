package keeper

import (
	"context"
	"fmt"
	crudtypes "github.com/bluzelle/curium/x/crud/types"
	"github.com/bluzelle/curium/x/synchronizer/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k msgServer) SynchronizerVote(goCtx context.Context,  msg *types.MsgSynchronizerVote) (*types.MsgSynchronizerVoteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// For now we will just write the values to the DB
	switch msg.Op {
	case "create":
		k.CrudKeeper.SetCrudValue(ctx, crudtypes.CrudValue{
			Creator: msg.Creator,
			Uuid:    "binance-store",
			Key:     msg.Key,
			Value:   msg.Value,
			Lease:   int64(365 * 24 * 60 * 60 / 5),
			Height:  ctx.BlockHeight(),
		})
		break
	case "update":
		k.CrudKeeper.SetCrudValue(ctx, crudtypes.CrudValue{
			Creator: msg.Creator,
			Uuid:    "binance-store",
			Key:     msg.Key,
			Value:   msg.Value,
			Lease:   int64(365 * 24 * 60 * 60 / 5),
			Height:  ctx.BlockHeight(),
		})
		break
	case "delete":
//		k.CrudKeeper.RemoveCrudValue(ctx, "binance-store", msg.Key)
		break
	default:
		return nil, fmt.Errorf("invalid synchronizer command: %s", msg.Op)
	}

	return &types.MsgSynchronizerVoteResponse{}, nil
}
