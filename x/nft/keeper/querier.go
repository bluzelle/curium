package keeper

import (
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	// this line is used by starport scaffolding # 1
	abci "github.com/tendermint/tendermint/abci/types"
)

const (
	QueryGetNft               = "get-nft"
)

// NewQuerier creates a new querier for nft clients.
func NewQuerier(k Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		switch path[0] {
		case QueryGetNft:
			return queryGetNft(ctx, path[1:], req, k, k.GetCdc())
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown nft query endpoint")
		}
	}
}

func queryGetNft(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper Keeper, cdc *codec.Codec) ([]byte, error) {

	var nft types.Nft

	if !keeper.HasNft(ctx, path[0]) {
		return nil, sdkerrors.ErrInvalidRequest
	}

	store := prefix.NewStore(ctx.KVStore(keeper.storeKey), types.KeyPrefix(types.NftKey))
	keeper.Cdc.MustUnmarshalBinaryBare(store.Get(GetNftIDBytes(path[0])), &nft)

	res, err := codec.MarshalJSONIndent(cdc, types.QueryResultGetNft{Nft: &nft})
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

