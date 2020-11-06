package tax

import (
	"bytes"
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
		case types.MsgSetBp:
			return handleMsgSetBp(ctx, keeper, msg)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, fmt.Sprintf("Unrecognized tax msg type: %v", msg.Type()))
		}
	}
}

func handleMsgSetCollector(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgSetCollector) (*sdk.Result, error) {
	if err := msg.ValidateBasic(); err != nil {
		return &sdk.Result{}, err
	}
	oldCollector := keeper.GetCollector(ctx)
	if !bytes.Equal(msg.Proposer, oldCollector) {
		return &sdk.Result{}, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "proposer should be equal to original tax collector")
	}
	keeper.SetCollector(ctx, msg.NewCollector)
	return &sdk.Result{}, nil
}

func handleMsgSetBp(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgSetBp) (*sdk.Result, error) {
	if err := msg.ValidateBasic(); err != nil {
		return &sdk.Result{}, err
	}
	oldCollector := keeper.GetCollector(ctx)
	if !bytes.Equal(msg.Proposer, oldCollector) {
		return &sdk.Result{}, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "proposer should be equal to original tax collector")
	}
	keeper.SetBp(ctx, msg.NewBp)
	return &sdk.Result{}, nil
}
