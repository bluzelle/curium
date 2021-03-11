package keeper

import (
	// this line is used by starport scaffolding # 1
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/bluzelle/curium/x/aggregator/types"
)

// NewQuerier creates a new querier for aggregator clients.
func NewQuerier(k Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		switch path[0] {
		case types.QueryParams:
			return queryParams(ctx, k)
		case types.QuerySearchValues:
			return querySearchValues(ctx, req, k)
		case types.QuerySearchBatchKeys:
			return querySearchBatchKeys(ctx, req, k)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown aggregator query endpoint")
		}
	}
}

func querySearchValues(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.QueryReqSearchValues
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchValues(ctx, query.Prefix, query.Page, query.Limit, query.Reverse)
	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}

func querySearchBatchKeys(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.QueryReqSearchBatches
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchAggValueBatchKeys(ctx, query.PreviousBatch, query.Limit, query.Reverse)

	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}


func queryParams(ctx sdk.Context, k Keeper) ([]byte, error) {
	params := k.GetParams(ctx)

	res, err := codec.MarshalJSONIndent(types.ModuleCdc, params)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONMarshal, err.Error())
	}

	return res, nil
}
