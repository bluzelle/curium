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
)

const RouterKey = ModuleName

type MsgBLZCreate struct {
	UUID  string
	Key   string
	Value string
	Owner sdk.AccAddress
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

func (msg MsgBLZCreate) ValidateBasic() sdk.Error {
	if msg.Owner.Empty() {
		return sdk.ErrInvalidAddress(msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdk.ErrInvalidPubKey("UUID or key Empty")
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

func (msg MsgBLZRead) ValidateBasic() sdk.Error {
	if msg.Owner.Empty() {
		return sdk.ErrInvalidAddress(msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdk.ErrInvalidPubKey("UUID or key Empty")
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

func (msg MsgBLZUpdate) ValidateBasic() sdk.Error {
	if msg.Owner.Empty() {
		return sdk.ErrInvalidAddress(msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdk.ErrInvalidPubKey("UUID or key Empty")
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type MsgBLZKeys struct {
	UUID  string
	Owner sdk.AccAddress
}

func NewMsgBLZKeys(UUID string, owner sdk.AccAddress) MsgBLZKeys {
	return MsgBLZKeys{UUID: UUID, Owner: owner}
}

func (msg MsgBLZKeys) Route() string { return RouterKey }

func (msg MsgBLZKeys) Type() string { return "keys" }

func (msg MsgBLZKeys) ValidateBasic() sdk.Error {
	if msg.Owner.Empty() {
		return sdk.ErrInvalidAddress(msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdk.ErrInvalidPubKey("UUID empty")
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

func (msg MsgBLZHas) ValidateBasic() sdk.Error {
	if msg.Owner.Empty() {
		return sdk.ErrInvalidAddress(msg.Owner.String())
	}

	if len(msg.UUID) == 0 {
		return sdk.ErrInvalidPubKey("UUID empty")
	}

	if len(msg.Key) == 0 {
		return sdk.ErrInvalidPubKey("key empty")
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

func (msg MsgBLZDelete) Route() string { return RouterKey }

func (msg MsgBLZDelete) Type() string { return "read" }

func (msg MsgBLZDelete) ValidateBasic() sdk.Error {
	if msg.Owner.Empty() {
		return sdk.ErrInvalidAddress(msg.Owner.String())
	}
	if len(msg.UUID) == 0 || len(msg.Key) == 0 {
		return sdk.ErrInvalidPubKey("UUID or key Empty")
	}
	return nil
}

func (msg MsgBLZDelete) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

func (msg MsgBLZDelete) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}
