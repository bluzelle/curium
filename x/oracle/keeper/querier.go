package keeper

import (
	"github.com/cosmos/cosmos-sdk/codec"
	// this line is used by starport scaffolding # 1
	abci "github.com/tendermint/tendermint/abci/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/bluzelle/curium/x/oracle/types"
)

// NewQuerier creates a new querier for oracle clients.
func NewQuerier(k Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		switch path[0] {
		// this line is used by starport scaffolding # 2
		case types.QueryListSources:
			return queryListSources(ctx, k)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown oracle query endpoint")
		}
	}
}

func queryListSources(ctx sdk.Context, k Keeper) ([]byte, error) {
	names, err := k.ListSourceNames(ctx)
	result, err := codec.MarshalJSONIndent(types.ModuleCdc, names)
	return result, err
}

