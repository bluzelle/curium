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
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	RouterKey    = ModuleName
	MaxKeySize   = 4097 // one extra byte for null between uuid & key
	MaxValueSize = 262144
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create
type MsgCreate struct {
	UUID  string
	Key   string
	Value string
	Lease int64
	Owner sdk.AccAddress
}

func NewMsgCreate(UUID string, key string, value string, lease int64, owner sdk.AccAddress) MsgCreate {

	return MsgCreate{
		UUID:  UUID,
		Key:   key,
		Value: value,
		Lease: lease,
		Owner: owner,
	}
}

func (msg MsgCreate) Route() string { return RouterKey }

func (msg MsgCreate) Type() string { return "create" }

func (msg MsgCreate) ValidateBasic() error {
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

	if msg.Lease < 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Lease negative")
	}

	return nil
}

func (msg MsgCreate) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgCreate) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Read
type MsgRead struct {
	UUID  string
	Key   string
	Owner sdk.AccAddress
}

func NewMsgRead(UUID string, key string, owner sdk.AccAddress) MsgRead {
	return MsgRead{UUID: UUID, Key: key, Owner: owner}
}

func (msg MsgRead) Route() string { return RouterKey }

func (msg MsgRead) Type() string { return "read" }

func (msg MsgRead) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty")
	}
	return nil
}

func (msg MsgRead) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgRead) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update
type MsgUpdate struct {
	UUID  string
	Key   string
	Value string
	Lease int64
	Owner sdk.AccAddress
}

func (msg MsgUpdate) Route() string { return RouterKey }

func (msg MsgUpdate) Type() string { return "update" }

func (msg MsgUpdate) ValidateBasic() error {
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

func (msg MsgUpdate) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgUpdate) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete
type MsgDelete struct {
	UUID  string
	Key   string
	Owner sdk.AccAddress
}

func NewMsgDelete(UUID string, key string, owner sdk.AccAddress) MsgDelete {
	return MsgDelete{
		UUID:  UUID,
		Key:   key,
		Owner: owner,
	}
}

func (msg MsgDelete) Route() string { return RouterKey }

func (msg MsgDelete) Type() string { return "delete" }

func (msg MsgDelete) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty")
	}
	return nil
}

func (msg MsgDelete) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgDelete) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Keys
type MsgKeys struct {
	UUID  string
	Owner sdk.AccAddress
}

func NewMsgKeys(UUID string, owner sdk.AccAddress) MsgKeys {
	return MsgKeys{UUID: UUID, Owner: owner}
}

func (msg MsgKeys) Route() string { return RouterKey }

func (msg MsgKeys) Type() string { return "keys" }

func (msg MsgKeys) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}
	return nil
}

func (msg MsgKeys) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgKeys) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Has
type MsgHas struct {
	UUID  string
	Key   string
	Owner sdk.AccAddress
}

func NewMsgHas(UUID string, key string, owner sdk.AccAddress) MsgHas {
	return MsgHas{UUID: UUID, Key: key, Owner: owner}
}

func (msg MsgHas) Route() string { return RouterKey }

func (msg MsgHas) Type() string { return "has" }

func (msg MsgHas) ValidateBasic() error {
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

func (msg MsgHas) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgHas) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rename
type MsgRename struct {
	UUID   string
	Key    string
	NewKey string
	Owner  sdk.AccAddress
}

func NewMsgRename(uuid string, key string, newKey string, owner sdk.AccAddress) MsgRename {
	return MsgRename{UUID: uuid, Key: key, NewKey: newKey, Owner: owner}
}

func (msg MsgRename) Route() string { return "crud" }

func (msg MsgRename) Type() string { return "rename" }

func (msg MsgRename) ValidateBasic() error {
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

func (msg MsgRename) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgRename) GetSigners() []sdk.AccAddress { return []sdk.AccAddress{msg.Owner} }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// KeyValue
type MsgKeyValues struct {
	UUID  string
	Owner sdk.AccAddress
}

func NewMsgKeyValues(uuid string, owner sdk.AccAddress) MsgKeyValues {
	return MsgKeyValues{UUID: uuid, Owner: owner}
}

func (msg MsgKeyValues) Route() string { return "crud" }

func (msg MsgKeyValues) Type() string { return "keyvalues" }

func (msg MsgKeyValues) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}

	return nil
}

func (msg MsgKeyValues) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgKeyValues) GetSigners() []sdk.AccAddress { return []sdk.AccAddress{msg.Owner} }

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiUpdate
type MsgMultiUpdate struct {
	UUID      string
	Owner     sdk.AccAddress
	KeyValues []KeyValue
}

func NewMsgMultiUpdate(UUID string, owner sdk.AccAddress, keyValues []KeyValue) MsgMultiUpdate {
	return MsgMultiUpdate{UUID: UUID, Owner: owner, KeyValues: keyValues}
}

func (msg MsgMultiUpdate) Route() string { return RouterKey }

func (msg MsgMultiUpdate) Type() string { return "multiupdate" }

func (msg MsgMultiUpdate) ValidateBasic() error {
	if msg.Owner.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}

	if len(msg.KeyValues) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "KeyValues empty")
	}

	// scan key/values...
	for i := range msg.KeyValues[:] {
		if len(msg.UUID)+len(msg.KeyValues[i].Key) > MaxKeySize {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("UUID+Key too large [%d]", i))
		}

		if len(msg.KeyValues[i].Value) > MaxValueSize {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("Value too large [%d]", i))
		}
	}

	return nil
}

func (msg MsgMultiUpdate) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgMultiUpdate) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}
