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
		case types.QuerySearchSourceValues:
			return querySearchSourceValues(ctx, req, k)
		case types.QueryConfig:
			return queryConfig(ctx, k)
		case types.QueryValidatorByValcons:
			return queryValidatorByValcons(ctx, req, k)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown oracle query endpoint")
		}
	}
}

func queryValidatorByValcons(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.ValidatorByValconsQueryRequest
	k.cdc.MustUnmarshalJSON(req.Data, &query)
	consAddr, err := sdk.ConsAddressFromBech32(query.Valcons)
	if err != nil {
		return nil, err
	}
	validator, found := k.stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	if found {
		result, err := codec.MarshalJSONIndent(types.ModuleCdc, validator)
		return result, err
	}
	return nil, nil
}

func queryConfig(ctx sdk.Context, k Keeper) ([]byte, error) {
	config := types.QueryResultConfig{
		AdminAddress: k.GetAdminAddress(ctx),
	}
	result, err := codec.MarshalJSONIndent(types.ModuleCdc, config)
	return result, err
}

func queryListSources(ctx sdk.Context, k Keeper) ([]byte, error) {
	names, err := k.ListSources(ctx)
	result, err := codec.MarshalJSONIndent(types.ModuleCdc, names)
	return result, err
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

	results := k.SearchSourceValues(ctx, query.Prefix, query.Page, query.Limit, query.Reverse)
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


