package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgRead{}

func NewMsgRead(creator string, uuid string, key string) *MsgRead {
	return &MsgRead{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
	}
}

func (msg *MsgRead) Route() string {
	return RouterKey
}

func (msg *MsgRead) Type() string {
	return "Read"
}

func (msg *MsgRead) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRead) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRead) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	err = CheckEmptyUuid(msg.Uuid)

	if err != nil {
		return err
	}

	err = CheckEmptyKey(msg.Key)

	if err != nil {
		return err
	}

	return nil
}
