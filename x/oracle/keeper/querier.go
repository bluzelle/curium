package keeper

import (
	"github.com/cosmos/cosmos-sdk/codec"
	// this line is used by starport scaffolding # 1
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewQuerier creates a new querier for oracle clients.
func NewQuerier(k Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		switch path[0] {
		// this line is used by starport scaffolding # 2
		case types.QueryListSources:
			return queryListSources(ctx, k)
		case types.QuerySearchVotes:
			return querySearchVotes(ctx, req, k)
		case types.QuerySearchVoteProofs:
			return querySearchVoteProofs(ctx, req, k)
		case types.QuerySearchVoteKeys:
			return querySearchVoteKeys(ctx, req, k)
		case types.QueryCalculateProofSig:
			return queryCalculateVoteProofSig(ctx, req, k)
		case types.QueryGetValcons:
			return queryGetValcons()
		case types.QuerySearchSourceValues:
			return querySearchSourceValues(ctx, req, k)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown oracle query endpoint")
		}
	}
}

func queryGetValcons() ([]byte, error) {
	valcons := GetValconsAddress()
//	b := []byte(valcons)
	result, err := codec.MarshalJSONIndent(types.ModuleCdc, valcons)
	return result, err
}

func queryListSources(ctx sdk.Context, k Keeper) ([]byte, error) {
	names, err := k.ListSources(ctx)
	result, err := codec.MarshalJSONIndent(types.ModuleCdc, names)
	return result, err
}

func queryCalculateVoteProofSig(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error){
	var query types.CalculateProofSigQueryRequest
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	sig := CalculateProofSig(query.Value)
	x := codec.MustMarshalJSONIndent(k.cdc, sig)
	return x, nil
}

func querySearchVotes(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.SearchVotesQueryRequest
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchVotes(ctx, query.Prefix)

	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}

func querySearchSourceValues(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.SearchSourceValuesQueryRequest
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchSourceValues(ctx, query.Prefix)
	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}



func querySearchVoteKeys(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.SearchVotesQueryRequest
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchVoteKeys(ctx, query.Prefix)

	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}

func querySearchVoteProofs(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.SearchVoteProofsQueryRequest
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchVoteProofs(ctx, query.Prefix)

	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}


