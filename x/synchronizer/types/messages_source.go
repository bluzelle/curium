package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateSource{}

func NewMsgCreateSource(creator string, name string, url string) *MsgCreateSource {
	return &MsgCreateSource{
		Creator: creator,
		Name:    name,
		Url:     url,
	}
}

func (msg *MsgCreateSource) Route() string {
	return RouterKey
}

func (msg *MsgCreateSource) Type() string {
	return "CreateSource"
}

func (msg *MsgCreateSource) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateSource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateSource{}

func NewMsgUpdateSource(creator string, id uint64, name string, url string) *MsgUpdateSource {
	return &MsgUpdateSource{
		Creator: creator,
		Name:    name,
		Url:     url,
	}
}

func (msg *MsgUpdateSource) Route() string {
	return RouterKey
}

func (msg *MsgUpdateSource) Type() string {
	return "UpdateSource"
}

func (msg *MsgUpdateSource) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateSource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgCreateSource{}

func NewMsgDeleteSource(creator string, name string) *MsgDeleteSource {
	return &MsgDeleteSource{
		Name:    name,
		Creator: creator,
	}
}
func (msg *MsgDeleteSource) Route() string {
	return RouterKey
}

func (msg *MsgDeleteSource) Type() string {
	return "DeleteSource"
}

func (msg *MsgDeleteSource) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteSource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
