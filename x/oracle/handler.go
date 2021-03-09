package oracle

import (
	"bytes"
	"fmt"
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewHandler creates an sdk.Handler for all the oracle type messages
func NewHandler(k keeper.Keeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		ctx = ctx.WithEventManager(sdk.NewEventManager())
		switch msg := msg.(type) {
		case types.MsgOracleVoteProof:
			return handleMsgOracleVoteProof(ctx, k, msg)
		case types.MsgOracleAddSource:
			return handleMsgOracleAddSource(ctx, k, msg)
		case types.MsgOracleDeleteSource:
			return handleMsgOracleDeleteSource(ctx, k, msg)
		case types.MsgOracleVote:
			return handleMsgOracleVote(ctx, k, msg)
		case types.MsgOracleDeleteVotes:
			return handleMsgOracleDeleteVotes(ctx, k, msg)
		case types.MsgOracleSetAdmin:
			return handleMsgOracleSetAdmin(ctx, k, msg)
		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName, msg)
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	}
}

func handleMsgOracleSetAdmin(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleSetAdmin) (*sdk.Result, error) {
	if !bytes.Equal(msg.Owner, k.GetAdminAddress(ctx)) {
		return &sdk.Result{}, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "unauthorized access")
	}
	k.SetAdminAddress(ctx, msg.NewAdminAddr)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleDeleteVotes(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleDeleteVotes) (*sdk.Result, error) {
	if !bytes.Equal(msg.Owner, k.GetAdminAddress(ctx)) {
		return &sdk.Result{}, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "unauthorized access")
	}

	k.DeleteVotes(ctx, msg.Prefix)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleDeleteSource(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleDeleteSource) (*sdk.Result, error) {
	if !bytes.Equal(msg.Owner, k.GetAdminAddress(ctx)) {
		return &sdk.Result{}, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "unauthorized access")
	}

	k.DeleteSource(ctx, msg.Name)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleAddSource(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleAddSource) (*sdk.Result, error) {
	if !bytes.Equal(msg.Owner, k.GetAdminAddress(ctx)) {
		return &sdk.Result{}, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "unauthorized access")
	}

	source := types.Source{
		Name:     msg.Name,
		Url:      msg.Url,
		Property: msg.Property,
		Owner:    msg.Owner,
	}
	k.AddSource(ctx, msg.Name, source)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleVote(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleVote) (*sdk.Result, error) {
	logger.Debug("Vote received", "msg", msg)
	isVoteGood := k.IsVoteValid(ctx, msg)

	if !isVoteGood {
		return &sdk.Result{Events: ctx.EventManager().Events()}, nil
	}

	validator, found := k.GetValidator(ctx, msg.Valcons)
	var weight sdk.Dec

	if found {
		weight = validator.GetDelegatorShares()

		value, _ := sdk.NewDecFromStr(msg.Value)
		vote := types.Vote{
			SourceName: msg.SourceName,
			Batch:      msg.Batch,
			Value:      value,
			Valcons:    msg.Valcons,
			Owner:      msg.Owner,
			Weight:     weight,
			Height:     ctx.BlockHeight(),
		}
		k.UpdateSourceValue(ctx, vote)
		k.StoreVote(ctx, vote)
	}

	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}

func handleMsgOracleVoteProof(ctx sdk.Context, k keeper.Keeper, msg types.MsgOracleVoteProof) (*sdk.Result, error) {
	logger.Debug("Proof received", "msg", msg)
	k.StoreVoteProof(ctx, msg)
	return &sdk.Result{Events: ctx.EventManager().Events()}, nil
}
