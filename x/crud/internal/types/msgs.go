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

package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const RouterKey = ModuleName

const MaxKeySize = 4097 // one extra byte for null between uuid & key
const MaxValueSize = 262144

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create
type MsgBLZCreate struct {
	UUID  string
	Key   string
	Value string
	Owner sdk.AccAddress
}

func NewMsgBLZCreate(UUID string, key string, value string, owner sdk.AccAddress) MsgBLZCreate {
	return MsgBLZCreate{
		UUID:  UUID,
		Key:   key,
		Value: value,
		Owner: owner,
	}
}

func (msg MsgBLZCreate) Route() string { return RouterKey }

func (msg MsgBLZCreate) Type() string { return "create" }

func (msg MsgBLZCreate) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty")
	}

	if len(msg.UUID)+len(msg.Key) > MaxKeySize {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID+Key too large")
	}

	if len(msg.Value) > MaxValueSize {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Value too large")
	}

	return nil
}

func (msg MsgBLZCreate) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZCreate) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Read
type MsgBLZRead struct {
	UUID  string
	Key   string
	Owner sdk.AccAddress
}

func NewMsgBLZRead(UUID string, key string, owner sdk.AccAddress) MsgBLZRead {
	return MsgBLZRead{UUID: UUID, Key: key, Owner: owner}
}

func (msg MsgBLZRead) Route() string { return RouterKey }

func (msg MsgBLZRead) Type() string { return "read" }

func (msg MsgBLZRead) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty")
	}
	return nil
}

func (msg MsgBLZRead) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZRead) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update
type MsgBLZUpdate struct {
	UUID  string
	Key   string
	Value string
	Owner sdk.AccAddress
}

func NewMsgBLZUpdate(UUID string, key string, value string, owner sdk.AccAddress) MsgBLZUpdate {
	return MsgBLZUpdate{
		UUID:  UUID,
		Key:   key,
		Value: value,
		Owner: owner,
	}
}

func (msg MsgBLZUpdate) Route() string { return RouterKey }

func (msg MsgBLZUpdate) Type() string { return "update" }

func (msg MsgBLZUpdate) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty")
	}

	if len(msg.Value) > MaxValueSize {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Value too large")
	}

	return nil
}

func (msg MsgBLZUpdate) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZUpdate) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete
type MsgBLZDelete struct {
	UUID  string
	Key   string
	Owner sdk.AccAddress
}

func NewMsgBLZDelete(UUID string, key string, owner sdk.AccAddress) MsgBLZDelete {
	return MsgBLZDelete{
		UUID:  UUID,
		Key:   key,
		Owner: owner,
	}
}

func (msg MsgBLZDelete) Route() string { return RouterKey }

func (msg MsgBLZDelete) Type() string { return "delete" }

func (msg MsgBLZDelete) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty")
	}
	return nil
}

func (msg MsgBLZDelete) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZDelete) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Keys
type MsgBLZKeys struct {
	UUID  string
	Owner sdk.AccAddress
}

func NewMsgBLZKeys(UUID string, owner sdk.AccAddress) MsgBLZKeys {
	return MsgBLZKeys{UUID: UUID, Owner: owner}
}

func (msg MsgBLZKeys) Route() string { return RouterKey }

func (msg MsgBLZKeys) Type() string { return "keys" }

func (msg MsgBLZKeys) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}
	return nil
}

func (msg MsgBLZKeys) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZKeys) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Has
type MsgBLZHas struct {
	UUID  string
	Key   string
	Owner sdk.AccAddress
}

func NewMsgBLZHas(UUID string, key string, owner sdk.AccAddress) MsgBLZHas {
	return MsgBLZHas{UUID: UUID, Key: key, Owner: owner}
}

func (msg MsgBLZHas) Route() string { return RouterKey }

func (msg MsgBLZHas) Type() string { return "has" }

func (msg MsgBLZHas) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}

	if len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "key empty")
	}
	return nil
}

func (msg MsgBLZHas) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZHas) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rename
type MsgBLZRename struct {
	UUID   string
	Key    string
	NewKey string
	Owner  sdk.AccAddress
}

func NewMsgBLZRename(uuid string, key string, newKey string, owner sdk.AccAddress) MsgBLZRename {
	return MsgBLZRename{UUID: uuid, Key: key, NewKey: newKey, Owner: owner}
}

func (msg MsgBLZRename) Route() string { return "crud" }

func (msg MsgBLZRename) Type() string { return "rename" }

func (msg MsgBLZRename) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}

	if len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "key empty")
	}

	if len(msg.NewKey) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "new key empty")
	}

	if len(msg.UUID)+len(msg.NewKey) > MaxKeySize {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID+NewKey too large")
	}

	return nil
}

func (msg MsgBLZRename) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZRename) GetSigners() []sdk.AccAddress { return []sdk.AccAddress{msg.Owner} }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// KeyValue
type MsgBLZKeyValues struct {
	UUID  string
	Owner sdk.AccAddress
}

func NewMsgBLZKeyValues(uuid string, owner sdk.AccAddress) MsgBLZKeyValues {
	return MsgBLZKeyValues{UUID: uuid, Owner: owner}
}

func (msg MsgBLZKeyValues) Route() string { return "crud" }

func (msg MsgBLZKeyValues) Type() string { return "keyvalues" }

func (msg MsgBLZKeyValues) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}

	return nil
}

func (msg MsgBLZKeyValues) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZKeyValues) GetSigners() []sdk.AccAddress { return []sdk.AccAddress{msg.Owner} }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Count
type MsgCount struct {
	UUID  string
	Owner sdk.AccAddress
}

func NewMsgCount(UUID string, owner sdk.AccAddress) MsgCount {
	return MsgCount{UUID: UUID, Owner: owner}
}

func (msg MsgCount) Route() string { return RouterKey }

func (msg MsgCount) Type() string { return "count" }

func (msg MsgCount) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}
	return nil
}

func (msg MsgCount) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgCount) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeleteAll
type MsgDeleteAll struct {
	UUID  string
	Owner sdk.AccAddress
}

func NewMsgDeleteAll(UUID string, owner sdk.AccAddress) MsgDeleteAll {
	return MsgDeleteAll{UUID: UUID, Owner: owner}
}

func (msg MsgDeleteAll) Route() string { return RouterKey }

func (msg MsgDeleteAll) Type() string { return "deleteall" }

func (msg MsgDeleteAll) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}
	return nil
}

func (msg MsgDeleteAll) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgDeleteAll) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}
