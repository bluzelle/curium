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
		case types.MsgOracleAddSource:
			return handleMsgOracleAddSource(ctx, k, msg)
		case types.MsgOracleDeleteSource:
			return handleMsgOracleDeleteSource(ctx, k, msg)
		case types.MsgOracleVote:
			return handleMsgOracleVote(ctx, k, msg)
		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName,  msg)
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	}
}

func handleMsgOracleDeleteSource(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleDeleteSource) (*sdk.Result, error) {
	k.DeleteSource(ctx, msg.Name)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleAddSource(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleAddSource) (*sdk.Result, error) {
	source := types.Source{
		Name: msg.Name,
		Url: msg.Url,
		Property: msg.Property,
		Owner: msg.Owner,
	}
	k.AddSource(ctx, msg.Name, source)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleVote(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleVote) (*sdk.Result, error) {
	voteGood := k.IsVoteValid(msg.SourceName, msg.Valcons, msg.Value)
	if voteGood {
		// TODO: finish here
	}
    fmt.Println("Value received", voteGood)


	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleVoteProof(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleVoteProof) (*sdk.Result, error) {
	k.StoreVoteProof(msg)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}
