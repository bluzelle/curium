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
)

var UPLOAD_TOKEN_EXPIRE_BLOCKS = int64(720)

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

	if msg.Size > 150 * 1024 * 1024 {
		return nil, sdkerrors.New("nft", 2, "nft too large")
	}

	k.AppendNft(
		ctx,
		msg.Creator,
		msg.Id,
		msg.Hash,
		msg.Vendor,
		msg.UserId,
		msg.Meta,
		msg.Mime,
		msg.Size,
	)

	owner, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.New("nft", 1, "Invalid creator address")
	}

	if k.UploadTokenManager.IsTokenValid(msg.Hash) {
		sdkerrors.New("nft", 1, "create message already sent for this hash")
	}
	token := k.UploadTokenManager.NewUploadToken(msg.Hash, msg.Size, owner, ctx.BlockHeight() + UPLOAD_TOKEN_EXPIRE_BLOCKS)

	createResp, err := json.Marshal(types.MsgCreateNftResponse {
		Id: msg.Id,
		Token: token.Value,
	})

	if err != nil {
		return nil, sdkerrors.New("nft", 2, "Failed to marshal MsgCreateNftResponse")
	}

	return &sdk.Result{Data: createResp}, nil
}

func handleMsgPublishFile(ctx sdk.Context, k Keeper, msg *types.MsgPublishFile) (*sdk.Result, error) {
	k.Logger(ctx).Debug("Publish file message received", "id", msg.Id)
	keeper.EnsureBtClient(ctx, k)
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
	keeper.EnsureBtClient(ctx, k)
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
