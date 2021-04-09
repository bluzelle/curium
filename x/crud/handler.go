package crud

import (
	"fmt"

	"github.com/bluzelle/curium/x/crud/keeper"
	"github.com/bluzelle/curium/x/crud/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewHandler ...
func NewHandler(k keeper.Keeper) sdk.Handler {
	msgServer := keeper.NewMsgServerImpl(k)

	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		ctx = ctx.WithEventManager(sdk.NewEventManager())

		switch msg := msg.(type) {
		// this line is used by starport scaffolding # 1
		case *types.MsgUpsertCrudValue:
			res, err := msgServer.UpsertCrudValue(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreate:
			res, err := msgServer.Create(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateCrudValue:
			res, err := msgServer.UpdateCrudValue(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteCrudValue:
			res, err := msgServer.DeleteCrudValue(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName, msg)
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	}
}
