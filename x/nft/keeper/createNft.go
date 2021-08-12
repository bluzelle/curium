package keeper

import (
	"fmt"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/zeebo/bencode"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
)



func (k Keeper) SeedFile(metainfo *metainfo.MetaInfo) error {
	err := k.btClient.SeedFile(metainfo)
	if err != nil {
		return err
	}
	return nil
}

func (k Keeper) BroadcastPublishFile(ctx sdk.Context, id string, vendor string, userId string, hash string, mime string, metainfo *metainfo.MetaInfo) error{
	metaBytes, err := bencode.EncodeBytes(metainfo)
	if err != nil {
		return err
	}

	addr, err := k.KeyringReader.GetAddress("nft")
	if err != nil {
		return err
	}

	publishMsg := types.MsgPublishFile{
		Creator:  addr.String(),
		Id:       id,
		Vendor: vendor,
		UserId: userId,
		Hash:     hash,
		Mime:     mime,
		Metainfo: metaBytes,
	}
	result := <- k.MsgBroadcaster(ctx, []sdk.Msg{&publishMsg}, "nft")
	if result.Error != nil {
		return result.Error
	}
	return nil

}


func (k Keeper) AssembleNftFile(uploadDir string, nftDir string, msg *types.MsgCreateNft) error {

	uploadRegEx, err := regexp.Compile(fmt.Sprintf("^%s-", msg.Hash))
	if err != nil {
		return err
	}

	_, err = os.Stat(nftDir + "/" + msg.Hash)

	if err == nil {
		walkError := filepath.Walk(uploadDir, func(path string, info os.FileInfo, err error) error {
			if err == nil && uploadRegEx.MatchString(info.Name()) {
				err = os.Remove(path)
				if err != nil {
					return err
				}
			}
			return nil
		})

		if walkError != nil {
			return walkError
		}

		return nil
	}

	err = filepath.Walk(uploadDir, func(path string, info os.FileInfo, err error) error {
		if err == nil && uploadRegEx.MatchString(info.Name()) {
			fmt.Println(path)
			if path != uploadDir {
				data, err := ioutil.ReadFile(path)
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