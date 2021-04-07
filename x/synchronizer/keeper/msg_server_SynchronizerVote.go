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
	var err error

	switch msg.Op {
	case "create":
		err = storeValue(ctx, k, msg)
		break
	case "update":
		err = storeValue(ctx, k, msg)
		break
	case "delete":
		k.CrudKeeper.RemoveCrudValue(ctx, msg.Uuid, msg.Key)
		break
	default:
		err = fmt.Errorf("invalid synchronizer command: %s", msg.Op)
	}

	return &types.MsgSynchronizerVoteResponse{}, err
}

func storeValue(ctx sdk.Context, k msgServer, msg *types.MsgSynchronizerVote) error {
	value := k.cdc.MustMarshalBinaryBare(&types.SynchronizerValue{
		Value:    msg.Value,
		Bookmark: msg.Bookmark,
	})

	k.CrudKeeper.SetCrudValue(ctx, crudtypes.CrudValue{
		Creator: msg.Creator,
		Uuid:    msg.Uuid,
		Key:     msg.Key,
		Value:   value,
		Lease:   int64(365 * 24 * 60 * 60 / 5),
		Height:  ctx.BlockHeight(),
	})
	return nil
}
