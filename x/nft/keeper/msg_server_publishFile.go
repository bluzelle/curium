package keeper

import (
	"context"
	"fmt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"os"

	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) PublishFile(goCtx context.Context, msg *types.MsgPublishFile) (*types.MsgPublishFileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	os.MkdirAll(k.homeDir+"/nft-upload/", os.ModePerm)

	f, err := os.Open(k.homeDir + "/nft-upload/" + msg.Id)
	if err != nil {
		return nil, sdkerrors.New("nft", 2, fmt.Sprintf("File not found: %s", msg.Id))
	}
	defer f.Close()

	os.MkdirAll(k.homeDir+"/nft", os.ModePerm)
	os.Rename(k.homeDir+"/nft-upload/"+msg.Id, k.homeDir+"/nft/"+msg.Id)

	return &types.MsgPublishFileResponse{}, nil
}
