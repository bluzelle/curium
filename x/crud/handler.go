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
)

func NewHandler(keeper keeper.IKeeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) sdk.Result {
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
		default:
			return sdk.ErrUnknownRequest(fmt.Sprintf("Unrecognized crud msg type: %v", msg.Type())).Result()
		}
	}
}

func handleMsgBLZCreate(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZCreate) sdk.Result {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return sdk.ErrInternal("Invalid message").Result()
	}

	if !keeper.GetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Owner.Empty() {
		return sdk.ErrUnauthorized("Key already exists").Result()
	}

	keeper.SetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, types.BLZValue{
		Value: msg.Value,
		Owner: msg.Owner,
	})
	return sdk.Result{}
}

func handleMsgBLZRead(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZRead) sdk.Result {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return sdk.ErrInternal("Invalid message").Result()
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return sdk.ErrInternal("Key does not exist").Result()
	}

	json_data, err := json.Marshal(types.QueryResultRead{msg.UUID, msg.Key, keeper.GetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Value})
	if err != nil {
		return sdk.ErrInternal("could not marshal result to JSON").Result()
	}

	return sdk.Result{Data: json_data}
}

func handleMsgBLZUpdate(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZUpdate) sdk.Result {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return sdk.ErrInternal("Invalid message").Result()
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return sdk.ErrInternal("Key does not exist").Result()
	}

	if !msg.Owner.Equals(owner) {
		return sdk.ErrUnauthorized("Incorrect Owner").Result()
	}

	keeper.SetBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, types.BLZValue{Value: msg.Value, Owner: msg.Owner})

	return sdk.Result{}
}

func handleMsgBLZDelete(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZDelete) sdk.Result {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return sdk.ErrInternal("Invalid message").Result()
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return sdk.ErrInternal("Key does not exist").Result()
	}

	if !msg.Owner.Equals(owner) {
		return sdk.ErrUnauthorized("Incorrect Owner").Result()
	}

	keeper.DeleteBLZValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)

	return sdk.Result{}
}

func handleMsgBLZKeys(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZKeys) sdk.Result {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return sdk.ErrInternal("Invalid message").Result()
	}

	json_data, err := json.Marshal(keeper.GetKeys(ctx, keeper.GetKVStore(ctx), msg.UUID))
	if err != nil {
		fmt.Println(err)
		return sdk.ErrInternal("could not marshal result to JSON").Result()
	}

	return sdk.Result{Data: json_data}
}

func handleMsgBLZHas(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgBLZHas) sdk.Result {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return sdk.ErrInternal("Invalid message").Result()
	}

	json_data, err := json.Marshal(types.QueryResultHas{UUID: msg.UUID, Key: msg.Key, Has: !keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Empty()})
	if err != nil {
		fmt.Println(err)
		return sdk.ErrInternal("could not marshal result to JSON").Result()
	}

	return sdk.Result{Data: json_data}
}
