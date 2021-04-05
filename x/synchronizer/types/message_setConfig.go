package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgSetConfig{}

func NewMsgSetConfig(creator string, syncAddress string) *MsgSetConfig {
	return &MsgSetConfig{
		SyncAddress: syncAddress,
	}
}

func (msg *MsgSetConfig) Route() string {
	return RouterKey
}

func (msg *MsgSetConfig) Type() string {
	return "SetConfig"
}

func (msg *MsgSetConfig) GetSigners() []sdk.AccAddress {
	addr, err := sdk.AccAddressFromBech32(msg.SyncAddress)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{addr}
}

func (msg *MsgSetConfig) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetConfig) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.SyncAddress)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid address (%s)", err)
	}
	return nil
}
