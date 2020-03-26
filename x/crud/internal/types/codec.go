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
	cdc.RegisterConcrete(MsgCreate{}, "crud/create", nil)
	cdc.RegisterConcrete(MsgRead{}, "crud/read", nil)
	cdc.RegisterConcrete(MsgUpdate{}, "crud/update", nil)
	cdc.RegisterConcrete(MsgDelete{}, "crud/delete", nil)
	cdc.RegisterConcrete(MsgKeys{}, "crud/keys", nil)
	cdc.RegisterConcrete(MsgKeyValues{}, "crud/keyvalues", nil)
	cdc.RegisterConcrete(MsgHas{}, "crud/has", nil)
	cdc.RegisterConcrete(MsgRename{}, "crud/rename", nil)
	cdc.RegisterConcrete(MsgCount{}, "crud/count", nil)
	cdc.RegisterConcrete(MsgDeleteAll{}, "crud/deleteall", nil)
	cdc.RegisterConcrete(MsgMultiUpdate{}, "crud/multiupdate", nil)
	cdc.RegisterConcrete(MsgGetLease{}, "crud/getlease", nil)
}
