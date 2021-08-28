package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"os"

	// this line is used by starport scaffolding # 1
	abci "github.com/tendermint/tendermint/abci/types"
)

const (
	QueryGetNft               = "get-nft"
	QueryGetNftUploadDir      = "get-nft-upload-dir"
	QueryGetNftDir            = "get-nft-dir"
	QueryIsAuthValid         = "is-auth-valid"
	QueryCheckUploadComplete = "check-nft-upload-complete"
)

// NewQuerier creates a new querier for nft clients.
func NewQuerier(k Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		switch path[0] {
		case QueryGetNft:
			return queryGetNft(ctx, path[1:], k, k.GetCdc())
		case QueryGetNftUploadDir:
			return queryGetNftUploadDir(k)
		case QueryGetNftDir:
			return queryGetNftDir(k)
		case QueryIsAuthValid:
			return queryIsAuthValid(req, k, k.GetCdc())
		case QueryCheckUploadComplete:
			return queryCheckUploadComplete(ctx, req, k, k.GetCdc())
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown nft query endpoint")
		}
	}
}


func queryGetNftUploadDir(keeper Keeper) ([]byte, error) {
	return []byte(keeper.GetNftUploadDir()), nil
}

func queryGetNftDir(keeper Keeper) ([]byte, error) {
	return []byte(keeper.GetNftDir()), nil
}

func queryIsAuthValid(req abci.RequestQuery, keeper Keeper, cdc *codec.Codec) ([]byte, error) {
	token := string(req.Data)
	valid := keeper.UploadTokenManager.IsTokenValid(token)
	return cdc.MustMarshalJSON(valid), nil
}

func queryCheckUploadComplete(ctx sdk.Context, req abci.RequestQuery, keeper Keeper, cdc *codec.Codec) ([]byte, error) {
	var checkUploadCompleteReq types.QueryCheckUploadCompleteReq
	cdc.MustUnmarshalBinaryBare(req.Data, &checkUploadCompleteReq)
	keeper.UploadTokenManager.ReportUpload(checkUploadCompleteReq.Hash, checkUploadCompleteReq.Size)
	isComplete := keeper.UploadTokenManager.IsUploadComplete(checkUploadCompleteReq.Hash)
	if isComplete {
		assembleUploadFile(keeper, checkUploadCompleteReq.Hash)
		broadcastPublish(ctx, keeper, checkUploadCompleteReq.Hash)
	}
	return cdc.MustMarshalJSON(isComplete), nil
}


func queryGetNft(ctx sdk.Context, path []string, keeper Keeper, cdc *codec.Codec) ([]byte, error) {

	var nft types.Nft

	if !keeper.HasNft(ctx, path[0]) {
		return nil, sdkerrors.ErrInvalidRequest
	}

	store := prefix.NewStore(ctx.KVStore(keeper.storeKey), types.KeyPrefix(types.NftKey))
	keeper.Cdc.MustUnmarshalBinaryBare(store.Get(GetNftHashBytes(path[0])), &nft)

	res, err := codec.MarshalJSONIndent(cdc, types.QueryResultGetNft{Nft: &nft})
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func assembleUploadFile(k Keeper, hash string) error {
	err := k.AssembleNftFile(k.GetNftUploadDir(), k.GetNftDir(), hash)
	if err != nil {
		return sdkerrors.New("nft", 2, fmt.Sprintf("unable to move nft files: %s", hash))
	}
	return nil

}
func broadcastPublish(ctx sdk.Context, k Keeper, hash string) error {
	if _, err := os.Stat(k.GetNftDir() + "/" + hash); err == nil {
		EnsureBtClient(ctx, k)
		btClient := k.GetBtClient()
		metainfo, err := btClient.TorrentFromFile(hash)
		if err != nil {
			return sdkerrors.New("nft", 2, fmt.Sprintf("unable to create torrent for file %s", hash))
		}
		err = k.SeedFile(metainfo)
		if err != nil {
			return sdkerrors.New("nft", 2, fmt.Sprintf("unable to seed file: %s", hash))
		}

		nft := k.GetNft(ctx, hash)
		go func() {
			err = k.BroadcastPublishFile(ctx, nft.Id, nft.Vendor, nft.UserId, nft.Hash, nft.Mime, metainfo)
			if err != nil {
				k.Logger(ctx).Error("error broadcasting publish nft file", "err", err.Error())
			}
		}()
	}

	return sdkerrors.New("nft", 2, fmt.Sprintf("unable to create torrent:  %s", hash))

}







