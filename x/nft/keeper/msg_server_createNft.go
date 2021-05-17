package keeper

import (
	"context"
	"fmt"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/zeebo/bencode"
	"os"
	"path/filepath"
	"regexp"
)

func (k msgServer) CreateNft(goCtx context.Context, msg *types.MsgCreateNft) (*types.MsgCreateNftResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.AppendNft(
		ctx,
		msg.Creator,
		msg.Meta,
		msg.Mime,
		msg.Id,
		msg.Hash,
	)
	err := assembleNftFile(k.homeDir+"/nft-upload", k.homeDir+"/nft", msg)
	if err != nil {
		return nil, sdkerrors.New("nft", 2, fmt.Sprintf("unable to move nft files: %s", msg.Hash))
	}
	
	metainfo, err := k.btClient.TorrentFromFile(msg.Hash)

	k.seedFile(ctx, metainfo)

	k.broadcastPublishFile(ctx, msg.Id, msg.Hash, metainfo)
	
	if err != nil {
		return nil, sdkerrors.New("nft", 2, fmt.Sprintf("unable to create torrent:  %s", msg.Hash))
	}
	
	

	return &types.MsgCreateNftResponse{
		Id: msg.Id,
	}, nil
}


func (k Keeper) seedFile(ctx sdk.Context, metainfo *metainfo.MetaInfo) error {
	err := k.btClient.SeedFile(metainfo)
	if err != nil {
		return err
	}
	return nil
}

func (k Keeper) broadcastPublishFile(ctx sdk.Context, id, hash string, metainfo *metainfo.MetaInfo) error{
	metaBytes, err := bencode.EncodeBytes(metainfo)
	if err != nil {
		return err
	}

	addr, err := k.keyringReader.GetAddress("nft")
	if err != nil {
		return err
	}

	msg := types.MsgPublishFile{
		Creator: addr.String(),
		Id:      id,
		Hash: hash,
		Metainfo: metaBytes,
	}

	_, err = k.msgBroadcaster(ctx, []sdk.Msg{&msg}, "nft")
	if err != nil {
		return err
	}
	return nil

}

func assembleNftFile(uploadDir string, nftDir string, msg *types.MsgCreateNft) error {
	uploadRegEx, err := regexp.Compile(fmt.Sprintf("^%s-", msg.Hash))
	if err != nil {
		return err
	}

	err = filepath.Walk(uploadDir, func(path string, info os.FileInfo, err error) error {
		if err == nil && uploadRegEx.MatchString(info.Name()) {
			fmt.Println(path)
			if path != uploadDir {
				data, err := os.ReadFile(path)
				if err != nil {
					return err
				}
				err = os.MkdirAll(nftDir, 0755)
				if err != nil {
					return err
				}
				f, err := os.OpenFile(nftDir+"/"+msg.Hash, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0744)
				if err != nil {
					return err
				}
				defer f.Close()
				_, err = f.Write(data)
				if err != nil {
					return err
				}
				err = os.Remove(path)
				if err != nil {
					return err
				}
			}
		}
		return nil
	})
	if err != nil {
		return err
	}
	return nil
}
