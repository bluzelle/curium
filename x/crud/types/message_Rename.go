package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgRename{}

func NewMsgRename(creator string, uuid string, key string, newKey string) *MsgRename {
	return &MsgRename{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		NewKey:  newKey,
	}
}

func (msg *MsgRename) Route() string {
	return RouterKey
}

func (msg *MsgRename) Type() string {
	return "Rename"
}

func (msg *MsgRename) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRename) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRename) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
