package keeper

import (
	"context"
	"github.com/bluzelle/curium/app/ante"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) Create(goCtx context.Context, msg *types.MsgCreate) (*types.MsgCreateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if k.HasCrudValue(&ctx, msg.Uuid, msg.Key) {
		return nil, sdkerrors.New("crud", 0, "key already exists")
	}

	k.AppendCrudValue(
		ctx,
		msg.Creator,
		msg.Uuid,
		msg.Key,
		msg.Value,
		msg.Lease,
		ctx.BlockHeight(),
	)

	gasFromLease := CalculateGasForLease(msg.Lease, len(msg.Uuid)+len(msg.Key)+len(msg.Value))

	blzGasMeter := ctx.GasMeter().(ante.BluzelleGasMeterInterface)

	blzGasMeter.ConsumeBillableGas(gasFromLease, "lease")

	k.SetLease(&ctx, msg.Uuid, msg.Key, ctx.BlockHeight(), msg.Lease)

	return &types.MsgCreateResponse{}, nil
}




