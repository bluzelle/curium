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
	"github.com/stretchr/testify/assert"
	"reflect"
	"testing"
)

func TestNewMsgBLZCreate(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgBLZCreate("uuid", "key", "value", owner)

	assert.IsType(t, sut, MsgBLZCreate{})
	assert.True(t, reflect.DeepEqual(sut, MsgBLZCreate{
		UUID:  "uuid",
		Key:   "key",
		Value: "value",
		Owner: owner,
	}))
}

func TestMsgBLZCreate_Route(t *testing.T) {
	assert.Equal(t, MsgBLZCreate{}.Route(), "crud")
}

func TestMsgBLZCreate_Type(t *testing.T) {
	assert.Equal(t, MsgBLZCreate{}.Type(), "create")
}

func TestMsgBLZCreate_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZCreate("uuid", "key", "value", nil)
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	// test max sizes...
	sut.Key = string(make([]byte, MaxKeySize/2))
	sut.UUID = string(make([]byte, MaxKeySize/2+2))
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID+Key too large").Error(), sut.ValidateBasic().Error())

	sut.Key = "Key"
	sut.UUID = "UUID"
	sut.Value = string(make([]byte, MaxValueSize+1))
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Value too large").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZCreate_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZCreate("uuid", "key", "value", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, string(sut.GetSignBytes()), "{\"type\":\"crud/create\",\"value\":{\"Key\":\"key\",\"Owner\":\""+
		"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\",\"Value\":\"value\"}}")
}

func TestMsgBLZCreate_GetSigners(t *testing.T) {
	msg := NewMsgBLZCreate("uuid", "key", "value", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZRead(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgBLZRead("uuid", "key", owner)

	assert.IsType(t, sut, MsgBLZRead{})
	assert.True(t, reflect.DeepEqual(sut, MsgBLZRead{
		UUID:  "uuid",
		Key:   "key",
		Owner: owner,
	}))
}

func TestMsgBLZRead_Route(t *testing.T) {
	assert.Equal(t, MsgBLZRead{}.Route(), "crud")
}

func TestMsgBLZRead_Type(t *testing.T) {
	assert.Equal(t, MsgBLZRead{}.Type(), "read")
}

func TestMsgBLZRead_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZRead("uuid", "key", nil)
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZRead_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZRead("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, string(sut.GetSignBytes()), "{\"type\":\"crud/read\",\"value\":{\"Key\":\"key\",\"Owner\":\""+
		"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}")
}

func TestMsgBLZRead_GetSigners(t *testing.T) {
	msg := NewMsgBLZRead("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZUpdate(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgBLZUpdate("uuid", "key", "value", owner)

	assert.IsType(t, sut, MsgBLZUpdate{})
	assert.True(t, reflect.DeepEqual(sut, MsgBLZUpdate{
		UUID:  "uuid",
		Key:   "key",
		Value: "value",
		Owner: owner,
	}))
}

func TestMsgBLZUpdate_Route(t *testing.T) {
	assert.Equal(t, MsgBLZUpdate{}.Route(), "crud")
}

func TestMsgBLZUpdate_Type(t *testing.T) {
	assert.Equal(t, MsgBLZUpdate{}.Type(), "update")
}

func TestMsgBLZUpdate_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZUpdate("uuid", "key", "new", nil)
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.Key = "Key"
	sut.UUID = "UUID"
	sut.Value = string(make([]byte, MaxValueSize+1))
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Value too large").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZUpdate_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZUpdate("uuid", "key", "value", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, "{\"type\":\"crud/update\",\"value\":{\"Key\":\"key\",\"Owner\":\"cosmos1vfk827n9d3kx2vt5xp"+
		"uhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\",\"Value\":\"value\"}}", string(sut.GetSignBytes()))
}

func TestMsgBLZUpdate_GetSigners(t *testing.T) {
	msg := NewMsgBLZUpdate("uuid", "key", "value", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZDelete(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgBLZDelete("uuid", "key", owner)

	assert.IsType(t, sut, MsgBLZDelete{})
	assert.True(t, reflect.DeepEqual(sut, MsgBLZDelete{
		UUID:  "uuid",
		Key:   "key",
		Owner: owner,
	}))
}

func TestMsgBLZDelete_Route(t *testing.T) {
	assert.Equal(t, MsgBLZDelete{}.Route(), "crud")
}

func TestMsgBLZDelete_Type(t *testing.T) {
	assert.Equal(t, MsgBLZDelete{}.Type(), "delete")
}

func TestMsgBLZDelete_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZDelete("uuid", "key", nil)
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID or key Empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZDelete_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZDelete("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, string(sut.GetSignBytes()), "{\"type\":\"crud/delete\",\"value\":{\"Key\":\"key\",\"Owner\":\""+
		"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}")
}

func TestMsgBLZDelete_GetSigners(t *testing.T) {
	msg := NewMsgBLZDelete("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZKeys(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgBLZKeys("uuid", owner)

	assert.IsType(t, sut, MsgBLZKeys{})
	assert.True(t, reflect.DeepEqual(sut, MsgBLZKeys{
		UUID:  "uuid",
		Owner: owner,
	}))
}

func TestMsgBLZKeys_Route(t *testing.T) {
	assert.Equal(t, MsgBLZKeys{}.Route(), "crud")
}

func TestMsgBLZKeys_Type(t *testing.T) {
	assert.Equal(t, MsgBLZKeys{}.Route(), "crud")
}

func TestMsgBLZKeys_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZKeys("uuid", nil)
	assert.Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sut.ValidateBasic().Error(), sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID empty").Error())
}

func TestMsgBLZKeys_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZKeys("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, "{\"type\":\"crud/keys\",\"value\":{\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmx"+
		"sdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgBLZKeys_GetSigners(t *testing.T) {
	msg := NewMsgBLZKeys("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZHas(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	sut := NewMsgBLZHas("uuid", "key", owner)

	assert.IsType(t, sut, MsgBLZHas{})
	assert.True(t, reflect.DeepEqual(sut, MsgBLZHas{
		UUID:  "uuid",
		Key:   "key",
		Owner: owner,
	}))
}

func TestMsgBLZHas_Route(t *testing.T) {
	assert.Equal(t, MsgBLZHas{}.Route(), "crud")
}

func TestMsgBLZHas_Type(t *testing.T) {
	assert.Equal(t, MsgBLZHas{}.Type(), "has")
}

func TestMsgBLZHas_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZHas("uuid", "key", nil)
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "key empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZHas_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZHas("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, "{\"type\":\"crud/has\",\"value\":{\"Key\":\"key\",\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhw"+
		"ardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}", string(sut.GetSignBytes()))
}

func TestMsgBLZHas_GetSigners(t *testing.T) {
	msg := NewMsgBLZHas("uuid", "key", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, msg.GetSigners(), []sdk.AccAddress{msg.Owner})
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZRename(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	accepted := MsgBLZRename{UUID: "uuid", Key: "key", NewKey: "newkey", Owner: owner}

	sut := NewMsgBLZRename(accepted.UUID, accepted.Key, accepted.NewKey, owner)
	assert.IsType(t, MsgBLZRename{}, sut)

	assert.True(t, reflect.DeepEqual(accepted, sut))
}

func TestMsgBLZRename_Route(t *testing.T) {
	assert.Equal(t, "crud", MsgBLZRename{}.Route())
}

func TestMsgBLZRename_Type(t *testing.T) {
	assert.Equal(t, "rename", MsgBLZRename{}.Type())
}

func TestMsgBLZRename_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZRename("uuid", "key", "newkey", []byte(""))
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID empty").Error(), sut.ValidateBasic().Error())

	sut.UUID = "uuid"
	sut.Key = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "key empty").Error(), sut.ValidateBasic().Error())

	sut.Key = "key"
	sut.NewKey = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "new key empty").Error(), sut.ValidateBasic().Error())

	sut.Key = "Key"
	sut.NewKey = string(make([]byte, MaxKeySize+1))
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID+NewKey too large").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZRename_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZRename("uuid", "key", "newkey", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	exp := "{\"type\":\"crud/rename\",\"value\":{\"Key\":\"key\",\"NewKey\":\"newkey\",\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}"
	assert.Equal(t, exp, string(sut.GetSignBytes()))
}

func TestMsgBLZRename_GetSigners(t *testing.T) {
	msg := NewMsgBLZRename("uuid", "key", "newkey", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, []sdk.AccAddress{msg.Owner}, msg.GetSigners())
}

/////////////////////////////////////////////////////////////////////////////////
func TestNewMsgBLZKeyValue(t *testing.T) {
	owner := []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	accepted := MsgBLZKeyValues{UUID: "uuid", Owner: owner}

	sut := NewMsgBLZKeyValues(accepted.UUID, owner)
	assert.IsType(t, MsgBLZKeyValues{}, sut)

	assert.True(t, reflect.DeepEqual(accepted, sut))
}

func TestMsgBLZKeyValue_Route(t *testing.T) {
	assert.Equal(t, "crud", MsgBLZKeyValues{}.Route())
}

func TestMsgBLZKeyValue_Type(t *testing.T) {
	assert.Equal(t, "keyvalues", MsgBLZKeyValues{}.Type())
}

func TestMsgBLZKeyValue_ValidateBasic(t *testing.T) {
	sut := NewMsgBLZKeyValues("uuid", []byte(""))
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, sut.Owner.String()).Error(), sut.ValidateBasic().Error())

	sut.Owner = []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	assert.Nil(t, sut.ValidateBasic())

	sut.UUID = ""
	assert.Equal(t, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "UUID empty").Error(), sut.ValidateBasic().Error())
}

func TestMsgBLZKeyValue_GetSignBytes(t *testing.T) {
	sut := NewMsgBLZKeyValues("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	exp := "{\"type\":\"crud/keyvalues\",\"value\":{\"Owner\":\"cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3\",\"UUID\":\"uuid\"}}"
	assert.Equal(t, exp, string(sut.GetSignBytes()))
}

func TestMsgBLZKeyValue_GetSigners(t *testing.T) {
	msg := NewMsgBLZKeyValues("uuid", []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"))
	assert.Equal(t, []sdk.AccAddress{msg.Owner}, msg.GetSigners())
}
