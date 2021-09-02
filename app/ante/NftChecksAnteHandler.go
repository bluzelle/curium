package ante

import (
	nft "github.com/bluzelle/curium/x/nft/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

type NftChecksAnteHandler struct{
	NftKeeper nft.Keeper
}

func NewNftChecksAnteHandler(nftKeeper nft.Keeper) NftChecksAnteHandler {
	return NftChecksAnteHandler{
		NftKeeper: nftKeeper,
	}
}

func (mfd NftChecksAnteHandler) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	signer := tx.GetMsgs()[0].GetSigners()[0]
	msgType := tx.GetMsgs()[0].Type()

	if msgType != "CreateNft" || mfd.NftKeeper.IsAuthorized(ctx, signer) {
		return next(ctx, tx, simulate)
	}
	return sdk.Context{}, sdkerrors.New("nft", 2, signer.String() + " is not on nft whitelist")
}

