package keeper

import (
	// this line is used by starport scaffolding # 1
	"github.com/bluzelle/curium/x/nft/types"
	"strconv"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	abci "github.com/tendermint/tendermint/abci/types"
)

func NewQuerier(k Keeper, legacyQuerierCdc *codec.LegacyAmino) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		var (
			res []byte
			err error
		)

		switch path[0] {
		case "get-nft-data":
			id, err := strconv.ParseUint(path[1], 10, 32)
			if err != nil {
				return nil, err
			}
			bz := k.GetNftData(ctx, uint32(id))
			return bz, nil
		case "get-nft":
			id, err := strconv.ParseUint(path[1], 10, 32)
			if err != nil {
				return nil, err
			}
			nft := k.GetNft(ctx, uint32(id))
			return k.cdc.MustMarshalJSON(&nft), nil



		// this line is used by starport scaffolding # 1
		default:
			err = sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "unknown %s query endpoint: %s", types.ModuleName, path[0])
		}

		return res, err
	}
}
