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

package crud

import (
	"encoding/json"
	"fmt"
	"github.com/bluzelle/curium/x/crud/internal/keeper"
	"github.com/bluzelle/curium/x/crud/internal/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func NewHandler(keeper keeper.IKeeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		switch msg := msg.(type) {
		case types.MsgBLZCreate:
			return handleMsgBLZCreate(ctx, keeper, msg)
		case types.MsgBLZRead:
			return handleMsgBLZRead(ctx, keeper, msg)
		case types.MsgBLZUpdate:
			return handleMsgBLZUpdate(ctx, keeper, msg)
		case types.MsgBLZDelete:
			return handleMsgBLZDelete(ctx, keeper, msg)
		case types.MsgBLZKeys:
			return handleMsgBLZKeys(ctx, keeper, msg)
		case types.MsgBLZHas:
			return handleMsgBLZHas(ctx, keeper, msg)
		case types.MsgBLZRename:
			return handleMsgBLZRename(ctx, keeper, msg)
		case types.MsgBLZKeyValues:
			return handleMsgBLZKeyValues(ctx, keeper, msg)
		case types.MsgCount:
			return handleMsgCount(ctx, keeper, msg)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, fmt.Sprintf("Unrecognized crud msg type: %v", msg.Type()))
		}
	}
}

func handleMsgBLZCreate(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZCreate) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	if !keeper.GetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key already exists")
	}

	keeper.SetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, types.BLZValue{
		Value: msg.Value,
		Owner: msg.Owner,
	})
	return &sdk.Result{}, nil
}

func handleMsgBLZRead(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZRead) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist")
	}

	json_data, err := json.Marshal(types.QueryResultRead{msg.UUID, msg.Key, keeper.GetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Value})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: json_data}, nil
}

func handleMsgBLZUpdate(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZUpdate) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist")
	}

	if !msg.Owner.Equals(owner) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Incorrect Owner")
	}

	keeper.SetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, types.BLZValue{Value: msg.Value, Owner: msg.Owner})

	return &sdk.Result{}, nil
}

func handleMsgBLZDelete(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZDelete) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist")
	}

	if !msg.Owner.Equals(owner) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Incorrect Owner")
	}

	keeper.DeleteBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)

	return &sdk.Result{}, nil
}

func handleMsgBLZKeys(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZKeys) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	json_data, err := json.Marshal(keeper.GetKeys(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner))
	if err != nil {
		fmt.Println(err)
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: json_data}, nil
}

func handleMsgBLZHas(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZHas) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	json_data, err := json.Marshal(types.QueryResultHas{UUID: msg.UUID, Key: msg.Key, Has: !keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Empty()})
	if err != nil {
		fmt.Println(err)
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: json_data}, nil
}

func handleMsgBLZRename(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZRename) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || len(msg.NewKey) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist")
	}

	if !msg.Owner.Equals(owner) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "Incorrect Owner")
	}

	if !keeper.RenameBLZKey(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, msg.NewKey) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Rename failed")
	}

	return &sdk.Result{}, nil
}

func handleMsgBLZKeyValues(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZKeyValues) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	json_data, err := json.Marshal(keeper.GetKeyValues(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner))
	if err != nil {
		fmt.Println(err)
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: json_data}, nil
}

func handleMsgCount(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgCount) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	json_data, err := json.Marshal(keeper.GetCount(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner))
	if err != nil {
		fmt.Println(err)
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: json_data}, nil
}
