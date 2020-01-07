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
	"fmt"
	"github.com/bluzelle/curium/x/crud/internal/keeper"
	"github.com/bluzelle/curium/x/crud/internal/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func NewHandler(keeper keeper.Keeper) sdk.Handler {
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
		default:
			errMsg := fmt.Sprintf("Unrecognized crud Msg type: %v", msg.Type())
			return sdk.ErrUnknownRequest(errMsg).Result()
		}
	}
}

func handleMsgBLZCreate(ctx sdk.Context, keeper keeper.Keeper, msg types.MsgBLZCreate) sdk.Result {

	if !keeper.GetBLZValue(ctx, msg.UUID, msg.Key).Owner.Empty() {
		return sdk.ErrUnauthorized("Key already exists").Result()
	}

	keeper.SetBLZValue(ctx, msg.UUID, msg.Key, types.BLZValue{
		Value: msg.Value,
		Owner: msg.Owner,
	})
	return sdk.Result{}
}

func handleMsgBLZRead(ctx sdk.Context, keeper keeper.Keeper, msg types.MsgBLZRead) sdk.Result {
	owner := keeper.GetOwner(ctx, msg.UUID, msg.Key)
	if owner.Empty() {
		return sdk.ErrInternal("Key does not exist").Result()
	}

	retval := sdk.Result{}
	retval.Data = []byte(keeper.GetBLZValue(ctx, msg.UUID, msg.Key).Value)
	return retval
}

func handleMsgBLZUpdate(ctx sdk.Context, keeper keeper.Keeper, msg types.MsgBLZUpdate) sdk.Result {
	owner := keeper.GetOwner(ctx, msg.UUID, msg.Key)
	if owner.Empty() {
		return sdk.ErrInternal("Key does not exist").Result()
	}
	if !msg.Owner.Equals(owner) {
		return sdk.ErrUnauthorized("Incorrect Owner").Result()
	}
	keeper.SetBLZValue(ctx, msg.UUID, msg.Key, types.BLZValue{Value: msg.Value, Owner: msg.Owner})

	return sdk.Result{}
}

func handleMsgBLZDelete(ctx sdk.Context, keeper keeper.Keeper, msg types.MsgBLZDelete) sdk.Result {
	owner := keeper.GetOwner(ctx, msg.UUID, msg.Key)
	if owner.Empty() {
		return sdk.ErrInternal("Key does not exist").Result()
	}
	if !msg.Owner.Equals(owner) {
		return sdk.ErrUnauthorized("Incorrect Owner").Result()
	}
	keeper.DeleteBLZValue(ctx, msg.UUID, msg.Key)

	return sdk.Result{}
}
