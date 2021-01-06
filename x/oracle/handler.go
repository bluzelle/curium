package oracle

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/bluzelle/curium/x/oracle/types"
)

// NewHandler creates an sdk.Handler for all the oracle type messages
func NewHandler(k keeper.Keeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		ctx = ctx.WithEventManager(sdk.NewEventManager())
		switch msg := msg.(type) {
	// this line is used by starport scaffolding # 1
		 case types.MsgOracleVoteProof:
		 	return handleMsgOracleVoteProof(ctx, k, msg)
		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName,  msg)
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	}
}

// handle<Action> does x

func handleMsgOracleVoteProof(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleVoteProof) (*sdk.Result, error) {
	fmt.Printf("HERE")
	//err := k.OracleVoteProof(ctx, msg.ValidatorAddr)
	//if err != nil {
	//	return nil, err
	//}

	// TODO: Define your msg events
	//ctx.EventManager().EmitEvent(
	//	sdk.NewEvent(
	//		sdk.EventTypeMessage,
	//		sdk.NewAttribute(sdk.AttributeKeyModule, AttributeValueCategory),
	//		sdk.NewAttribute(sdk.AttributeKeySender, msg.ValidatorAddr.String()),
	//	),
	//)

	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

