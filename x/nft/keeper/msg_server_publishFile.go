package keeper

import (
	"context"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/zeebo/bencode"
)

func (k msgServer) PublishFile(goCtx context.Context, msg *types.MsgPublishFile) (*types.MsgPublishFileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	k.Logger(ctx).Info("Publish file message received", "id", msg.Id)
	var metainfo metainfo.MetaInfo
	bencode.DecodeBytes(msg.Metainfo, &metainfo)
	k.btClient.RetrieveFile(&metainfo)
	return &types.MsgPublishFileResponse{}, nil
}
