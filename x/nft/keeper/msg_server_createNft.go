package keeper

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
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
		k.Logger(ctx).Error("unable to move nft files", "hash", msg.Hash)
	}

	return &types.MsgCreateNftResponse{
		Id: msg.Id,
	}, nil
}

func assembleNftFile(uploadDir string, nftDir string, msg *types.MsgCreateNft) error {
	uploadRegEx, err := regexp.Compile(fmt.Sprintf("^%s-", msg.Hash))
	if err != nil {
		return err
	}
	filenameReplaceRegEx, err := regexp.Compile("-.*")

	err = filepath.Walk(uploadDir, func(path string, info os.FileInfo, err error) error {
		if err == nil && uploadRegEx.MatchString(info.Name()) {
			filename := filenameReplaceRegEx.ReplaceAllString(info.Name(), "")
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
				f, err := os.OpenFile(nftDir+"/"+filename, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0744)
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
