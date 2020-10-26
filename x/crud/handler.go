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
		case types.MsgCreate:
			return handleMsgCreate(ctx, keeper, msg)
		case types.MsgRead:
			return handleMsgRead(ctx, keeper, msg)
		case types.MsgUpdate:
			return handleMsgUpdate(ctx, keeper, msg)
		case types.MsgUpsert:
			return handleMsgUpsert(ctx, keeper, msg)
		case types.MsgDelete:
			return handleMsgDelete(ctx, keeper, msg)
		case types.MsgKeys:
			return handleMsgKeys(ctx, keeper, msg)
		case types.MsgHas:
			return handleMsgHas(ctx, keeper, msg)
		case types.MsgRename:
			return handleMsgRename(ctx, keeper, msg)
		case types.MsgKeyValues:
			return handleMsgKeyValues(ctx, keeper, msg)
		case types.MsgCount:
			return handleMsgCount(ctx, keeper, msg)
		case types.MsgDeleteAll:
			return handleMsgDeleteAll(ctx, keeper, msg)
		case types.MsgMultiUpdate:
			return handleMsgMultiUpdate(ctx, keeper, msg)
		case types.MsgGetLease:
			return handleMsgGetLease(ctx, keeper, msg)
		case types.MsgGetNShortestLeases:
			return handleMsgGetNShortestLeases(ctx, keeper, msg)
		case types.MsgRenewLease:
			return handleMsgRenewLease(ctx, keeper, msg)
		case types.MsgRenewLeaseAll:
			return handleMsgRenewLeaseAll(ctx, keeper, msg)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, fmt.Sprintf("Unrecognized crud msg type: %v", msg.Type()))
		}
	}
}

func handleMsgCreate(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgCreate) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	if !keeper.GetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key already exists")
	}

	// default lease...
	if msg.Lease == 0 {
		msg.Lease = keeper.GetDefaultLeaseBlocks()
	}

	keeper.SetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, types.BLZValue{
		Value:  msg.Value,
		Owner:  msg.Owner,
		Lease:  msg.Lease,
		Height: ctx.BlockHeight(),
	})

	leaseCtx := ctx.WithGasMeter(sdk.NewInfiniteGasMeter())
	keeper.SetLease(keeper.GetLeaseStore(leaseCtx), msg.UUID, msg.Key, ctx.BlockHeight(), msg.Lease)

	// charge for lease
	gasForLease := CalculateGasForLease( msg.Lease, len(msg.UUID) + len(msg.Key) + len(msg.Value))
	ctx.GasMeter().ConsumeGas(gasForLease, "lease")

	return &sdk.Result{}, nil
}

func handleMsgRead(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgRead) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist")
	}

	blzValue := keeper.GetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	jsonData, err := json.Marshal(types.QueryResultRead{UUID: msg.UUID, Key: msg.Key, Value: blzValue.Value})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: jsonData}, nil
}

func handleMsgUpsert(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgUpsert) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if owner.Empty() {
		createMsg := types.MsgCreate{
			UUID:  msg.UUID,
			Key:   msg.Key,
			Value: msg.Value,
			Lease: msg.Lease,
			Owner: msg.Owner,
		}
		return handleMsgCreate(ctx, keeper, createMsg)
	} else {
		updateMsg := types.MsgUpdate{
			UUID:  msg.UUID,
			Key:   msg.Key,
			Value: msg.Value,
			Lease: msg.Lease,
			Owner: msg.Owner,
		}
		return handleMsgUpdate(ctx, keeper, updateMsg)
	}
}

func handleMsgUpdate(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgUpdate) (*sdk.Result, error) {
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

	oldBlzValue := keeper.GetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)


	if msg.Lease != 0 { // 0 means no change to lease
		newLease := oldBlzValue.Lease + msg.Lease
		if newLease <= 0 {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid lease")
		}

		if (oldBlzValue.Height + newLease) <= ctx.BlockHeight() {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid lease")
		}

		keeper.SetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, types.BLZValue{Value: msg.Value, Lease: newLease, Height: oldBlzValue.Height, Owner: msg.Owner})

		leaseCtx := ctx.WithGasMeter(sdk.NewInfiniteGasMeter())
		keeper.DeleteLease(keeper.GetLeaseStore(leaseCtx), msg.UUID, msg.Key, oldBlzValue.Height, oldBlzValue.Lease)
		keeper.SetLease(keeper.GetLeaseStore(leaseCtx), msg.UUID, msg.Key, oldBlzValue.Height, newLease)

		gasForLease := CalculateGasForLease(msg.Lease, len(msg.UUID) + len(msg.Key) + len(msg.Value)) - CalculateGasForLease(oldBlzValue.Lease, len(msg.UUID) + len(msg.Key) + len(oldBlzValue.Value))
		ctx.GasMeter().ConsumeGas(gasForLease, "lease")
	} else {
		keeper.SetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, types.BLZValue{Value: msg.Value, Lease: oldBlzValue.Lease,
			Owner: msg.Owner, Height: oldBlzValue.Height})
	}
	return &sdk.Result{}, nil
}

func handleMsgDelete(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgDelete) (*sdk.Result, error) {
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

	newCtx := ctx.WithGasMeter(sdk.NewInfiniteGasMeter())
	keeper.DeleteValue(ctx, keeper.GetKVStore(ctx), keeper.GetLeaseStore(newCtx), msg.UUID, msg.Key)

	return &sdk.Result{}, nil
}

func handleMsgKeys(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgKeys) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	jsonData, err := json.Marshal(keeper.GetKeys(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner))
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: jsonData}, nil
}

func handleMsgHas(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgHas) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	jsonData, err := json.Marshal(types.QueryResultHas{UUID: msg.UUID, Key: msg.Key, Has: !keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key).Empty()})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: jsonData}, nil
}

func handleMsgRename(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgRename) (*sdk.Result, error) {
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

	if !keeper.RenameKey(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key, msg.NewKey) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Rename failed")
	}

	return &sdk.Result{}, nil
}

func handleMsgKeyValues(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgKeyValues) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	jsonData, err := json.Marshal(keeper.GetKeyValues(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner))
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: jsonData}, nil
}

func handleMsgCount(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgCount) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	jsonData, err := json.Marshal(keeper.GetCount(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner))
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: jsonData}, nil
}

func handleMsgDeleteAll(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgDeleteAll) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	keeper.DeleteAll(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner)

	return &sdk.Result{}, nil
}

func handleMsgMultiUpdate(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgMultiUpdate) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.KeyValues) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	// we're past basic validation, now scan owners & if the keys exist...
	for i := range msg.KeyValues[:] {
		owner := keeper.GetOwner(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.KeyValues[i].Key)

		if owner.Empty() {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("Key does not exist [%d]", i))
		}

		if !owner.Equals(msg.Owner) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("Incorrect Owner [%d]", i))
		}
	}

	// update the values...
	for i := range msg.KeyValues[:] {
		keeper.SetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.KeyValues[i].Key, types.BLZValue{Value: msg.KeyValues[i].Value, Owner: msg.Owner})
	}

	return &sdk.Result{}, nil
}

func handleMsgGetLease(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgGetLease) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || len(msg.Key) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	value := keeper.GetValue(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Key)
	if value.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key does not exist")
	}

	jsonData, err := json.Marshal(types.QueryResultLease{
		UUID:  msg.UUID,
		Key:   msg.Key,
		Lease: value.Lease + value.Height - ctx.BlockHeight(),
	})

	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: jsonData}, nil
}

func handleMsgGetNShortestLeases(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgGetNShortestLeases) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.N == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	value := keeper.GetNShortestLeases(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner, msg.N)

	jsonData, err := json.Marshal(value)

	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "could not marshal result to JSON")
	}

	return &sdk.Result{Data: jsonData}, nil
}

func handleMsgRenewLease(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgRenewLease) (*sdk.Result, error) {
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

	if msg.Lease == 0 {
		msg.Lease = keeper.GetDefaultLeaseBlocks()
	}

	updateLease(ctx, keeper, msg.UUID, msg.Key, msg.Lease)

	return &sdk.Result{}, nil
}

func handleMsgRenewLeaseAll(ctx sdk.Context, keeper keeper.IKeeper, msg types.MsgRenewLeaseAll) (*sdk.Result, error) {
	if len(msg.UUID) == 0 || msg.Owner.Empty() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Invalid message")
	}

	value := keeper.GetKeys(ctx, keeper.GetKVStore(ctx), msg.UUID, msg.Owner)
	if len(value.Keys) == 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID does not exist")
	}

	if msg.Lease == 0 {
		msg.Lease = keeper.GetDefaultLeaseBlocks()
	}

	for i := range value.Keys[:] {
		updateLease(ctx, keeper, msg.UUID, value.Keys[i], msg.Lease)
	}

	return &sdk.Result{}, nil
}

func updateLease(ctx sdk.Context, keeper keeper.IKeeper, UUID string, key string, lease int64) {
	blzValue := keeper.GetValue(ctx, keeper.GetKVStore(ctx), UUID, key)


	leaseCtx := ctx.WithGasMeter(sdk.NewInfiniteGasMeter())
	keeper.DeleteLease(keeper.GetLeaseStore(leaseCtx), UUID, key, blzValue.Height, blzValue.Lease)

	calculateLeaseRefund := func() uint64 {
		bytes := len(UUID) + len(key) + len(blzValue.Value)
		unusedOriginalLease := blzValue.Height + blzValue.Lease - ctx.BlockHeight()

		if unusedOriginalLease <= 0 {
			return 0
		}

		percentUnused := float64(unusedOriginalLease) / float64(blzValue.Lease)
		originalLeaseCost := CalculateGasForLease(blzValue.Lease, bytes)
		return uint64(float64(originalLeaseCost) * percentUnused)
	}


	// Charge for lease gas
    func() {
		gasForLease := CalculateGasForLease(lease, len(UUID) + len(key) + len(blzValue.Value)) - calculateLeaseRefund()
		if gasForLease > 0 {
			ctx.GasMeter().ConsumeGas(gasForLease, "lease")
		}
	}()

	blzValue.Height = ctx.BlockHeight()
	blzValue.Lease = lease
	keeper.SetValue(ctx, keeper.GetKVStore(ctx), UUID, key, blzValue)
	keeper.SetLease(keeper.GetLeaseStore(leaseCtx), UUID, key, blzValue.Height, blzValue.Lease)
}
