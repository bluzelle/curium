package keeper

import (
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	abci "github.com/tendermint/tendermint/abci/types"
)

// constants
const (
	QueryTaxInfo = "info"
)

// NewQuerier helps querying
func NewQuerier(keeper IKeeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) (res []byte, err error) {
		switch path[0] {
		case QueryTaxInfo:
			return queryTaxInfo(ctx, keeper)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown tax query endpoint")
		}
	}
}

func queryTaxInfo(ctx sdk.Context, keeper IKeeper) ([]byte, error) {
	taxInfo := keeper.GetTaxInfo(ctx)

	res, err := codec.MarshalJSONIndent(keeper.GetCodec(), taxInfo)
	return res, err
}
