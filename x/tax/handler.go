package tax

import (
	"fmt"

	"github.com/bluzelle/curium/x/tax/internal/keeper"
	"github.com/bluzelle/curium/x/tax/internal/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func NewHandler(keeper keeper.IKeeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		switch msg := msg.(type) {
		case types.MsgSetCollector:
			return handleMsgSetCollector(ctx, keeper, msg)
		case types.MsgSetPercentage:
			return handleMsgSetPercentage(ctx, keeper, msg)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, fmt.Sprintf("Unrecognized tax msg type: %v", msg.Type()))
		}
	}
}

func handleMsgSetCollector(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgSetCollector) (*sdk.Result, error) {
	return &sdk.Result{}, nil
}

func handleMsgSetPercentage(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgSetPercentage) (*sdk.Result, error) {
	return &sdk.Result{}, nil
}
