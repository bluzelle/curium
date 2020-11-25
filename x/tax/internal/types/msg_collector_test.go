package types

import (
	"bytes"
	"testing"

	bluzellechain "github.com/bluzelle/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	. "github.com/stretchr/testify/assert"
)

func GetTestAddresses(t *testing.T) []sdk.AccAddress {
	addr1 := sdk.AccAddress([]byte("my----------address1"))
	addr2 := sdk.AccAddress([]byte("my----------address2"))
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
	Equal(t, err.Error(), "invalid address: tax collector should not be empty address")

	msg = NewMsgSetCollector(newCollector, sdk.AccAddress{})
	err = msg.ValidateBasic()
	True(t, err != nil)
	Equal(t, err.Error(), "invalid address: proposer should not be empty address")
}

func TestMsgSetCollector_GetSignBytes(t *testing.T) {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(bluzellechain.Bech32PrefixAccAddr, bluzellechain.Bech32PrefixAccPub)

	addrs := GetTestAddresses(t)
	proposer, newCollector := addrs[0], addrs[1]
	msg := NewMsgSetCollector(newCollector, proposer)
	Equal(t, string(msg.GetSignBytes()), `{"type":"tax/collector","value":{"NewCollector":"bluzelle1d4uj6tfd95kj6tfd95kkzerywfjhxuejgs5ltx","Proposer":"bluzelle1d4uj6tfd95kj6tfd95kkzerywfjhxue3xrpf9e"}}`)
}

func TestMsgSetCollector_GetSigners(t *testing.T) {
	addrs := GetTestAddresses(t)
	proposer, newCollector := addrs[0], addrs[1]
	msg := NewMsgSetCollector(newCollector, proposer)
	Equal(t, msg.GetSigners(), []sdk.AccAddress{proposer})
}
