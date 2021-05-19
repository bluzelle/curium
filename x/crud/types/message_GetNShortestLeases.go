package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgGetNShortestLeases{}

func NewMsgGetNShortestLeases(creator string, uuid string, num uint32) *MsgGetNShortestLeases {
	return &MsgGetNShortestLeases{
		Creator: creator,
		Uuid:    uuid,
		Num:     num,
	}
}

func (msg *MsgGetNShortestLeases) Route() string {
	return RouterKey
}

func (msg *MsgGetNShortestLeases) Type() string {
	return "GetNShortestLeases"
}

func (msg *MsgGetNShortestLeases) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgGetNShortestLeases) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgGetNShortestLeases) ValidateBasic() error {
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
