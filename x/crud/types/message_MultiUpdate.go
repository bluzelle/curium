package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgMultiUpdate{}

func NewMsgMultiUpdate(creator string, uuid string, keyValues []*KeyValueLease) *MsgMultiUpdate {
	return &MsgMultiUpdate{
		Creator:   creator,
		Uuid:      uuid,
		KeyValues: keyValues,
	}
}

func (msg *MsgMultiUpdate) Route() string {
	return RouterKey
}

func (msg *MsgMultiUpdate) Type() string {
	return "MultiUpdate"
}

func (msg *MsgMultiUpdate) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiUpdate) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiUpdate) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	err = CheckEmptyUuid(msg.Uuid)

	if err != nil {
		return err
	}

	err = CheckEmptyKeyValueLeases(msg.KeyValues)

	if err != nil {
		return err
	}
	return nil
}
