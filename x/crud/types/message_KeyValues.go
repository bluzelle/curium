package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgKeyValues{}

func NewMsgKeyValues(creator string, uuid string) *MsgKeyValues {
	return &MsgKeyValues{
		Creator: creator,
		Uuid:    uuid,
	}
}

func (msg *MsgKeyValues) Route() string {
	return RouterKey
}

func (msg *MsgKeyValues) Type() string {
	return "KeyValues"
}

func (msg *MsgKeyValues) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgKeyValues) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgKeyValues) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	err = CheckEmptyUuid(msg.Uuid)

	if err != nil {
		return err
	}

	return nil
}
