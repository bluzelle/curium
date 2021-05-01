package keeper

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"os"
)

func (k msgServer) CreateNft(goCtx context.Context, msg *types.MsgCreateNft) (*types.MsgCreateNftResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.AppendNft(
		ctx,
		msg.Creator,
		msg.Meta,
		msg.Mime,
		msg.Id,
	)


	os.MkdirAll(k.homeDir + "/nft-upload/", os.ModePerm)


	f, err := os.Open(k.homeDir + "/nft-upload/" + msg.Id)
	if err != nil {
		return nil, sdkerrors.New("nft", 2, fmt.Sprintf("File not found: %s", msg.Id))
	}
	defer f.Close()

	os.MkdirAll(k.homeDir + "/nft", os.ModePerm)
	os.Rename(k.homeDir + "/nft-upload/" + msg.Id, k.homeDir + "/nft/" + msg.Id)

	return &types.MsgCreateNftResponse{
		Id: msg.Id,
	}, nil
}

func (k msgServer) UpdateNft(goCtx context.Context, msg *types.MsgUpdateNft) (*types.MsgUpdateNftResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var nft = types.Nft{
		Creator: msg.Creator,
		Id:      msg.Id,
		Meta:    msg.Meta,
		Mime:    msg.Mime,
	}

	// Checks that the element exists
	if !k.HasNft(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetNftOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetNft(ctx, nft)

	return &types.MsgUpdateNftResponse{}, nil
}

func (k msgServer) DeleteNft(goCtx context.Context, msg *types.MsgDeleteNft) (*types.MsgDeleteNftResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasNft(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetNftOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveNft(ctx, msg.Id)

	return &types.MsgDeleteNftResponse{}, nil
}
