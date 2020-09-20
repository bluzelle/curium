// Copyright (C) 2020 Bluzelle
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License, version 3,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

package keeper

import (
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	abci "github.com/tendermint/tendermint/abci/types"
	"strconv"
)

const (
	QueryRead               = "read"
	QueryHas                = "has"
	QueryKeys               = "keys"
	QuerySearch             = "search"
	QueryKeyValues          = "keyvalues"
	QueryCount              = "count"
	QueryGetLease           = "getlease"
	QueryGetNShortestLeases = "getnshortestleases"
	QueryOwner              = "owner"
)

func NewQuerier(keeper IKeeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) (res []byte, err error) {
		switch path[0] {
		case QueryOwner:
			return queryOwner(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QueryRead:
			return queryRead(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QueryHas:
			return queryHas(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QueryKeys:
			return queryKeys(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QuerySearch:
			return querySearch(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QueryKeyValues:
			return queryKeyValues(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QueryCount:
			return queryCount(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QueryGetLease:
			return queryGetLease(ctx, path[1:], req, keeper, keeper.GetCdc())
		case QueryGetNShortestLeases:
			return queryGetNShortestLeases(ctx, path[1:], req, keeper, keeper.GetCdc())
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown crud query endpoint")
		}
	}
}

func queryRead(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	blzValue := keeper.GetValue(ctx, keeper.GetKVStore(ctx), path[0], path[1])

	if len(blzValue.Owner) == 0 {
		return []byte{}, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "key not found")
	}

	res, err := codec.MarshalJSONIndent(cdc, types.QueryResultRead{UUID: path[0], Key: path[1], Value: blzValue.Value})
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryOwner(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), path[0], path[1])

	if owner == nil {
		return []byte{}, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "key not found")
	}

	res, err := codec.MarshalJSONIndent(cdc, types.QueryResultOwner{UUID: path[0], Key: path[1], Owner: owner.String()})
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil

}

func queryHas(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	has := keeper.IsKeyPresent(ctx, keeper.GetKVStore(ctx), path[0], path[1])

	res, err := codec.MarshalJSONIndent(cdc, types.QueryResultHas{UUID: path[0], Key: path[1], Has: has})
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryKeys(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	res, err := codec.MarshalJSONIndent(cdc, keeper.GetKeys(ctx, keeper.GetKVStore(ctx), path[0], nil))
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func querySearch(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	page, _  :=  strconv.ParseUint(path[2], 10, 64)
	limit, _ := strconv.ParseUint(path[3], 10, 64)

	res, err := codec.MarshalJSONIndent(cdc, keeper.Search(ctx, keeper.GetKVStore(ctx), path[0], path[1], uint(page), uint(limit), path[4], nil))
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryKeyValues(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	res, err := codec.MarshalJSONIndent(cdc, keeper.GetKeyValues(ctx, keeper.GetKVStore(ctx), path[0], nil))
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryCount(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	res, err := codec.MarshalJSONIndent(cdc, keeper.GetCount(ctx, keeper.GetKVStore(ctx), path[0], nil))
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryGetLease(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {
	blzValue := keeper.GetValue(ctx, keeper.GetKVStore(ctx), path[0], path[1])

	if len(blzValue.Owner) == 0 {
		return []byte{}, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "key not found")
	}

	res, err := codec.MarshalJSONIndent(cdc, types.QueryResultLease{UUID: path[0], Key: path[1], Lease: blzValue.Height + blzValue.Lease - ctx.BlockHeight()})
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryGetNShortestLeases(ctx sdk.Context, path []string, _ abci.RequestQuery, keeper IKeeper, cdc *codec.Codec) ([]byte, error) {

	N, err := strconv.ParseUint(path[1], 10, 64)
	if err != nil {
		return []byte{}, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, err.Error())
	}

	value := keeper.GetNShortestLeases(ctx, keeper.GetKVStore(ctx), path[0], nil, N)

	res, err := codec.MarshalJSONIndent(cdc, value)
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}
