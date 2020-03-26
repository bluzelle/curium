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
	. "github.com/stretchr/testify/assert"
	"reflect"
	"testing"
)

func TestNewMsgBLZCreate(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgCreate("uuid", "key", "value", 0, owner)

	IsType(t, sut, MsgCreate{})
	True(t, reflect.DeepEqual(sut, MsgCreate{
		UUID:  "uuid",
		Key:   "key",
		Value: "value",
		Owner: owner,
	}))
}

func TestMsgBLZCreate_Route(t *testing.T) {
	Equal(t, MsgCreate{}.Route(), "crud")
}

func TestMsgBLZCreate_Type(t *testing.T) {
	Equal(t, "create", MsgCreate{}.Type())
}

func TestMsgBLZCreate_ValidateBasic(t *testing.T) {
	sut := NewMsgCreate("uuid", "key", "value", 0, nil)
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	// test max sizes...
	sut.Key = string(make([]byte, MaxKeySize/2))
	sut.UUID = string(make([]byte, MaxKeySize/2+2))
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID+Key too large").Error(), sut.ValidateBasic().Error())

	sut.Key = "Key"
	sut.UUID = "UUID"
	sut.Value = string(make([]byte, MaxValueSize+1))
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Value too large").Error(), sut.ValidateBasic().Error())

	sut.Key = "Key"
	sut.UUID = "UUID"
	sut.Lease = -1
	sut.Value = "just a value"
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Lease negative").Error(), sut.ValidateBasic().Error())

}

func TestMsgBLZCreate_GetSignBytes(t *testing.T) {
	sut := NewMsgCreate("uuid", "key", "value", 0, []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, "{\"type\":\"crud/create\",\"value\":{\"Key\":\"key\",\"Lease\":\"0\",\"Owner\":\"cosmos1"+
		"vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\",\"Value\":\"value\"}}",
		string(sut.GetSignBytes()),
	)
}

func TestMsgBLZCreate_GetSigners(t *testing.T) {
	msg := NewMsgCreate("uuid", "key", "value", 0, []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZRead(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgRead("uuid", "key", owner)

	IsType(t, sut, MsgRead{})
	True(t, reflect.DeepEqual(sut, MsgRead{
		UUID:  "uuid",
		Key:   "key",
		Owner: owner,
	}))
}

func TestMsgBLZRead_Route(t *testing.T) {
	Equal(t, MsgRead{}.Route(), "crud")
}

func TestMsgBLZRead_Type(t *testing.T) {
	Equal(t, "read", MsgRead{}.Type())
}

func TestMsgBLZRead_ValidateBasic(t *testing.T) {
	sut := NewMsgRead("uuid", "key", nil)
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZRead_GetSignBytes(t *testing.T) {
	sut := NewMsgRead("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, string(sut.GetSignBytes()), "{\"type\":\"crud/read\",\"value\":{\"Key\":\"key\",\"Owner\":\""+
		"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}")
}

func TestMsgBLZRead_GetSigners(t *testing.T) {
	msg := NewMsgRead("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZUpdate(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := MsgUpdate{"uuid", "key", "value", 0, owner}

	IsType(t, sut, MsgUpdate{})
	True(t, reflect.DeepEqual(sut, MsgUpdate{
		UUID:  "uuid",
		Key:   "key",
		Value: "value",
		Lease: 0,
		Owner: owner,
	}))
}

func TestMsgBLZUpdate_Route(t *testing.T) {
	Equal(t, MsgUpdate{}.Route(), "crud")
}

func TestMsgBLZUpdate_Type(t *testing.T) {
	Equal(t, "update", MsgUpdate{}.Type())
}

func TestMsgBLZUpdate_ValidateBasic(t *testing.T) {
	sut := MsgUpdate{"uuid", "key", "new", 0, nil}
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.Key = "Key"
	sut.UUID = "UUID"
	sut.Value = string(make([]byte, MaxValueSize+1))
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Value too large").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZUpdate_GetSignBytes(t *testing.T) {
	sut := MsgUpdate{"uuid", "key", "value", 0, []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")}
	Equal(t, "{\"type\":\"crud/update\",\"value\":{\"Key\":\"key\",\"Lease\":\"0\",\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\",\"Value\":\"value\"}}", string(sut.GetSignBytes()))
}

func TestMsgBLZUpdate_GetSigners(t *testing.T) {
	msg := MsgUpdate{"uuid", "key", "value", 0, []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")}
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZDelete(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgDelete("uuid", "key", owner)

	IsType(t, sut, MsgDelete{})
	True(t, reflect.DeepEqual(sut, MsgDelete{
		UUID:  "uuid",
		Key:   "key",
		Owner: owner,
	}))
}

func TestMsgBLZDelete_Route(t *testing.T) {
	Equal(t, MsgDelete{}.Route(), "crud")
}

func TestMsgBLZDelete_Type(t *testing.T) {
	Equal(t, "delete", MsgDelete{}.Type())
}

func TestMsgBLZDelete_ValidateBasic(t *testing.T) {
	sut := NewMsgDelete("uuid", "key", nil)
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID or key Empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZDelete_GetSignBytes(t *testing.T) {
	sut := NewMsgDelete("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, string(sut.GetSignBytes()), "{\"type\":\"crud/delete\",\"value\":{\"Key\":\"key\",\"Owner\":\""+
		"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}")
}

func TestMsgBLZDelete_GetSigners(t *testing.T) {
	msg := NewMsgDelete("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZKeys(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgKeys("uuid", owner)

	IsType(t, sut, MsgKeys{})
	True(t, reflect.DeepEqual(sut, MsgKeys{
		UUID:  "uuid",
		Owner: owner,
	}))
}

func TestMsgBLZKeys_Route(t *testing.T) {
	Equal(t, MsgKeys{}.Route(), "crud")
}

func TestMsgBLZKeys_Type(t *testing.T) {
	Equal(t, "keys", MsgKeys{}.Type())
}

func TestMsgBLZKeys_ValidateBasic(t *testing.T) {
	sut := NewMsgKeys("uuid", nil)
	Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error())
}

func TestMsgBLZKeys_GetSignBytes(t *testing.T) {
	sut := NewMsgKeys("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, "{\"type\":\"crud/keys\",\"value\":{\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmx"+
		"sdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgBLZKeys_GetSigners(t *testing.T) {
	msg := NewMsgKeys("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZHas(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgHas("uuid", "key", owner)

	IsType(t, sut, MsgHas{})
	True(t, reflect.DeepEqual(sut, MsgHas{
		UUID:  "uuid",
		Key:   "key",
		Owner: owner,
	}))
}

func TestMsgBLZHas_Route(t *testing.T) {
	Equal(t, MsgHas{}.Route(), "crud")
}

func TestMsgBLZHas_Type(t *testing.T) {
	Equal(t, "has", MsgHas{}.Type())
}

func TestMsgBLZHas_ValidateBasic(t *testing.T) {
	sut := NewMsgHas("uuid", "key", nil)
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "key empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZHas_GetSignBytes(t *testing.T) {
	sut := NewMsgHas("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, "{\"type\":\"crud/has\",\"value\":{\"Key\":\"key\",\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhw"+
		"ardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgBLZHas_GetSigners(t *testing.T) {
	msg := NewMsgHas("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZRename(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	accepted := MsgRename{UUID: "uuid", Key: "key", NewKey: "newkey", Owner: owner}

	sut := NewMsgRename(accepted.UUID, accepted.Key, accepted.NewKey, owner)
	IsType(t, MsgRename{}, sut)

	True(t, reflect.DeepEqual(accepted, sut))
}

func TestMsgBLZRename_Route(t *testing.T) {
	Equal(t, "crud", MsgRename{}.Route())
}

func TestMsgBLZRename_Type(t *testing.T) {
	Equal(t, "rename", MsgRename{}.Type())
}

func TestMsgBLZRename_ValidateBasic(t *testing.T) {
	sut := NewMsgRename("uuid", "key", "newkey", []byte(""))
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "key empty").Error(), sut.ValidateBasic().Error())

	sut.Key = "key"
	sut.NewKey = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "new key empty").Error(), sut.ValidateBasic().Error())

	sut.Key = "Key"
	sut.NewKey = string(make([]byte, MaxKeySize+1))
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID+NewKey too large").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZRename_GetSignBytes(t *testing.T) {
	sut := NewMsgRename("uuid", "key", "newkey", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	exp := "{\"type\":\"crud/rename\",\"value\":{\"Key\":\"key\",\"NewKey\":\"newkey\",\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}"
	Equal(t, exp, string(sut.GetSignBytes()))
}

func TestMsgBLZRename_GetSigners(t *testing.T) {
	msg := NewMsgRename("uuid", "key", "newkey", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, []sdk.AccAddress{msg.Owner}, msg.GetSigners())
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZKeyValues(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	accepted := MsgKeyValues{UUID: "uuid", Owner: owner}

	sut := NewMsgKeyValues(accepted.UUID, owner)
	IsType(t, MsgKeyValues{}, sut)

	True(t, reflect.DeepEqual(accepted, sut))
}

func TestMsgBLZKeyValues_Route(t *testing.T) {
	Equal(t, "crud", MsgKeyValues{}.Route())
}

func TestMsgBLZKeyValues_Type(t *testing.T) {
	Equal(t, "keyvalues", MsgKeyValues{}.Type())
}

func TestMsgBLZKeyValues_ValidateBasic(t *testing.T) {
	sut := NewMsgKeyValues("uuid", []byte(""))
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZKeyValues_GetSignBytes(t *testing.T) {
	sut := NewMsgKeyValues("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	exp := "{\"type\":\"crud/keyvalues\",\"value\":{\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}"
	Equal(t, exp, string(sut.GetSignBytes()))
}

func TestMsgBLZKeyValues_GetSigners(t *testing.T) {
	msg := NewMsgKeyValues("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, []sdk.AccAddress{msg.Owner}, msg.GetSigners())
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgCount(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgCount("uuid", owner)

	IsType(t, sut, MsgCount{})
	True(t, reflect.DeepEqual(sut, MsgCount{
		UUID:  "uuid",
		Owner: owner,
	}))
}

func TestMsgCount_Route(t *testing.T) {
	Equal(t, "crud", MsgCount{}.Route())
}

func TestMsgCount_Type(t *testing.T) {
	Equal(t, "count", MsgCount{}.Type())
}

func TestMsgCount_ValidateBasic(t *testing.T) {
	sut := NewMsgCount("uuid", nil)
	Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error())
}

func TestMsgCount_GetSignBytes(t *testing.T) {
	sut := NewMsgCount("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, "{\"type\":\"crud/count\",\"value\":{\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgCount_GetSigners(t *testing.T) {
	msg := NewMsgCount("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgDeleteAll(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgDeleteAll("uuid", owner)

	IsType(t, MsgDeleteAll{}, sut)
	True(t, reflect.DeepEqual(sut, MsgDeleteAll{
		UUID:  "uuid",
		Owner: owner,
	}))
}

func TestMsgDeleteAll_Route(t *testing.T) {
	Equal(t, "crud", MsgDeleteAll{}.Route())
}

func TestMsgDeleteAll_Type(t *testing.T) {
	Equal(t, "deleteall", MsgDeleteAll{}.Type())
}

func TestMsgDeleteAll_ValidateBasic(t *testing.T) {
	sut := NewMsgDeleteAll("uuid", nil)
	Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error())
}

func TestMsgDeleteAll_GetSignBytes(t *testing.T) {
	sut := NewMsgDeleteAll("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, "{\"type\":\"crud/deleteall\",\"value\":{\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgDeleteAll_GetSigners(t *testing.T) {
	msg := NewMsgDeleteAll("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgMultiUpdate(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	var keyValues []KeyValue
	keyValues = append(keyValues, KeyValue{Key: "key0", Value: "value0"})
	keyValues = append(keyValues, KeyValue{Key: "key1", Value: "value1"})

	sut := NewMsgMultiUpdate("uuid", owner, keyValues)

	IsType(t, MsgMultiUpdate{}, sut)
	True(t, reflect.DeepEqual(sut, MsgMultiUpdate{
		UUID:      "uuid",
		Owner:     owner,
		KeyValues: keyValues,
	}))
}

func TestMsgMultiUpdate_Route(t *testing.T) {
	Equal(t, "crud", MsgMultiUpdate{}.Route())
}

func TestMsgMultiUpdate_Type(t *testing.T) {
	Equal(t, "multiupdate", MsgMultiUpdate{}.Type())
}

func TestMsgMultiUpdate_ValidateBasic(t *testing.T) {
	sut := NewMsgMultiUpdate("uuid", nil, []KeyValue{{"key", "value"}})
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.KeyValues = nil
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "KeyValues empty").Error(), sut.ValidateBasic().Error())

	// test max key sizes...
	sut.KeyValues = append(sut.KeyValues, KeyValue{Key: "key", Value: "value"})
	sut.KeyValues = append(sut.KeyValues, KeyValue{Key: string(make([]byte, MaxKeySize)), Value: "value"})
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID+Key too large [1]").Error(), sut.ValidateBasic().Error())

	// test max value sizes...
	sut.KeyValues = nil
	sut.KeyValues = append(sut.KeyValues, KeyValue{Key: "key1", Value: "value"})
	sut.KeyValues = append(sut.KeyValues, KeyValue{Key: "key2", Value: string(make([]byte, MaxValueSize+1))})
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Value too large [1]").Error(), sut.ValidateBasic().Error())
}

func TestMsgMultiUpdate_GetSignBytes(t *testing.T) {
	sut := NewMsgMultiUpdate("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"), nil)
	Equal(t, "{\"type\":\"crud/multiupdate\",\"value\":{\"KeyValues\":null,\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgMultiUpdate_GetSigners(t *testing.T) {
	msg := NewMsgMultiUpdate("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"), nil)
	Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestMsgGetLease_Route(t *testing.T) {
	Equal(t, "crud", MsgGetLease{}.Route())
}

func TestMsgGetLease_Type(t *testing.T) {
	Equal(t, "getlease", MsgGetLease{}.Type())
}

func TestMsgGetLease_ValidateBasic(t *testing.T) {
	sut := MsgGetLease{
		UUID:  "uuid",
		Key:   "key",
		Owner: []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
	}

	Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = "key"
	sut.Owner = nil

	Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "").Error(), sut.ValidateBasic().Error())

}

func TestMsgGetLease_GetSignBytes(t *testing.T) {
	sut := MsgGetLease{
		UUID:  "uuid",
		Key:   "key",
		Owner: []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
	}
	Equal(t, "{\"type\":\"crud/getlease\",\"value\":{\"Key\":\"key\",\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgGetLease_GetSigners(t *testing.T) {
	sut := MsgGetLease{
		UUID:  "uuid",
		Key:   "key",
		Owner: []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
	}
	Equal(t, sut.GetSigners(), []sdk.AccAddress{sut.Owner})

}
