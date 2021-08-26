package nft

import (
	"encoding/json"
	"fmt"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/bluzelle/curium/x/nft/keeper"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/zeebo/bencode"
	"io/ioutil"
	"os"
	"sync"
)

func NewHandler(keeper keeper.Keeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		switch msg := msg.(type) {
		case *types.MsgCreateNft:
			return handleMsgCreateNft(ctx, keeper, msg)
		case *types.MsgPublishFile:
			return handleMsgPublishFile(ctx, keeper, msg)
		case *types.MsgRegisterPeer:
			return handleMsgRegisterPeer(ctx, keeper, msg)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, fmt.Sprintf("Unrecognized nft msg type: %v", msg.Type()))
		}
	}
}

func handleMsgCreateNft(ctx sdk.Context, k keeper.Keeper, msg *types.MsgCreateNft) (*sdk.Result, error) {
	k.AppendNft(
		ctx,
		msg.Creator,
		msg.Id,
		msg.Hash,
		msg.Vendor,
		msg.UserId,
		msg.Meta,
		msg.Mime,
	)
	err := k.AssembleNftFile(k.GetNftUploadDir(), k.GetNftDir(), msg)
	if err != nil {
		return nil, sdkerrors.New("nft", 2, fmt.Sprintf("unable to move nft files: %s", msg.Hash))
	}


	if _, err := os.Stat(k.GetNftDir() + "/" + msg.Hash); err == nil {
		ensureBtClient(ctx, k)
		btClient := k.GetBtClient()
		metainfo, err := btClient.TorrentFromFile(msg.Hash)
		if err != nil {
			return nil, sdkerrors.New("nft", 2, fmt.Sprintf("unable to create torrent for file", msg.Hash))
		}
		err = k.SeedFile(metainfo)
		if err != nil {
			return nil, sdkerrors.New("nft", 2, fmt.Sprintf("unable to seed file: %s", msg.Hash))
		}

		go func() {
			err = k.BroadcastPublishFile(ctx, msg.Id, msg.Vendor, msg.UserId, msg.Hash, msg.Mime, metainfo)
			if err != nil {
				k.Logger(ctx).Error("error broadcasting publish nft file", "err", err.Error())
			}
		}()
	}

	if err != nil {
		return nil, sdkerrors.New("nft", 2, fmt.Sprintf("unable to create torrent:  %s", msg.Hash))
	}

	createResp, err := json.Marshal(types.MsgCreateNftResponse{
		Id: msg.Id,
	})

	if err != nil {
		return nil, sdkerrors.New("nft", 2, "Failed to marshal MsgCreateNftResponse")
	}

	return &sdk.Result{Data: createResp}, nil
}

var newBtClientOnce sync.Once
func ensureBtClient(ctx sdk.Context, k Keeper) {
	newBtClientOnce.Do(func() {
		startTorrentClient(ctx, k)
	})

}

func handleMsgPublishFile(ctx sdk.Context, k Keeper, msg *types.MsgPublishFile) (*sdk.Result, error) {
	k.Logger(ctx).Debug("Publish file message received", "id", msg.Id)
	ensureBtClient(ctx, k)
	var metainfo metainfo.MetaInfo
	bencode.DecodeBytes(msg.Metainfo, &metainfo)

	btClient := k.GetBtClient()

	btClient.RetrieveFile(&metainfo)
	k.EnsureNftDirExists()

	err := os.Symlink("./"+msg.Hash, k.GetNftDir()+"/"+msg.Vendor+"-"+msg.Id)

	if err != nil {

		return nil, err
	}

	info := types.NftInfo{
		Id:     msg.Id,
		Vendor: msg.Vendor,
		UserId: msg.UserId,
		Mime:   msg.Mime,
	}

	err = ioutil.WriteFile(k.GetNftDir()+"/"+msg.Hash+".info", k.Cdc.MustMarshalJSON(&info), 0666)
	if err != nil {
		return nil, err
	}
	err = os.Symlink("./"+msg.Hash+".info", k.GetNftDir()+"/"+msg.Vendor+"-"+msg.Id+".info")
	if err != nil {
		return nil, err
	}
	return &sdk.Result{}, nil
}

func handleMsgRegisterPeer(ctx sdk.Context, k Keeper, msg *types.MsgRegisterPeer) (*sdk.Result, error) {
	store := k.GetPeerStore(ctx)
	var peer types.Peer
	peer.Id = msg.Id
	peer.Address = msg.Address
	peer.Port = msg.Port
	store.Set([]byte(msg.Id), k.Cdc.MustMarshalBinaryBare(&peer))

	myNodeId, _ := k.GetMyNodeId(ctx)
	if myNodeId != msg.Id {
		btClient := k.GetBtClient()
		btClient.AddPeer(msg.Id, msg.Address, int(msg.Port))
	}

	return &sdk.Result{}, nil
}
