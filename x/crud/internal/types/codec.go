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
	"github.com/cosmos/cosmos-sdk/codec"
)

var ModuleCdc = codec.New()

func init() {
	RegisterCodec(ModuleCdc)
}

func RegisterCodec(cdc *codec.Codec) {
	cdc.RegisterConcrete(MsgBLZCreate{}, "crud/create", nil)
	cdc.RegisterConcrete(MsgBLZRead{}, "crud/read", nil)
	cdc.RegisterConcrete(MsgBLZUpdate{}, "crud/update", nil)
	cdc.RegisterConcrete(MsgBLZDelete{}, "crud/delete", nil)
	cdc.RegisterConcrete(MsgBLZKeys{}, "crud/keys", nil)
	cdc.RegisterConcrete(MsgBLZHas{}, "crud/has", nil)
	cdc.RegisterConcrete(MsgBLZRename{}, "crud/rename", nil)
}
