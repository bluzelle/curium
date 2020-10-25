package types

import (
	"bytes"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	. "github.com/stretchr/testify/assert"
)

func GetTestAddresses(t *testing.T) []sdk.AccAddress {
	addr1, err := sdk.AccAddressFromBech32("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
	True(t, err == nil)

	addr2, err := sdk.AccAddressFromBech32("bluzelle1nnpyp9wr6law2u5jwa23t0ywtmrduldf6h4wqr")
	True(t, err == nil)
	return []sdk.AccAddress{addr1, addr2}
}

func TestNewMsgSetCollector(t *testing.T) {
	addrs := GetTestAddresses(t)
	proposer, newCollector := addrs[0], addrs[1]

	msg := NewMsgSetCollector(newCollector, proposer)
	True(t, bytes.Equal(msg.NewCollector.Bytes(), newCollector.Bytes()))
	True(t, bytes.Equal(msg.Proposer.Bytes(), proposer.Bytes()))
}

func TestMsgSetCollector_Route(t *testing.T) {
	Equal(t, MsgSetCollector{}.Route(), RouterKey)
}

func TestMsgSetCollector_Type(t *testing.T) {
	Equal(t, MsgSetCollector{}.Type(), "set_collector")
}

func TestMsgSetCollector_ValidateBasic(t *testing.T) {
	addrs := GetTestAddresses(t)
	proposer, newCollector := addrs[0], addrs[1]

	msg := NewMsgSetCollector(newCollector, proposer)
	err := msg.ValidateBasic()
	True(t, err == nil)

	msg = NewMsgSetCollector(sdk.AccAddress{}, proposer)
	err = msg.ValidateBasic()
	True(t, err != nil)
	True(t, err.Error() == "proposer should not be empty address")

	msg = NewMsgSetCollector(newCollector, sdk.AccAddress{})
	err = msg.ValidateBasic()
	True(t, err != nil)
	True(t, err.Error() == "tax collector should not be empty address")
}

func TestMsgSetCollector_GetSignBytes(t *testing.T) {
	addrs := GetTestAddresses(t)
	proposer, newCollector := addrs[0], addrs[1]
	msg := NewMsgSetCollector(newCollector, proposer)
	Equal(t, string(msg.GetSignBytes()), ``)
}

func TestMsgSetCollector_GetSigners(t *testing.T) {
	addrs := GetTestAddresses(t)
	proposer, newCollector := addrs[0], addrs[1]
	msg := NewMsgSetCollector(newCollector, proposer)
	Equal(t, msg.GetSigners(), []sdk.AccAddress{proposer})
}
