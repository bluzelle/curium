package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgGetLease{}

func NewMsgGetLease(creator string, uuid string, key string) *MsgGetLease {
	return &MsgGetLease{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
	}
}

func (msg *MsgGetLease) Route() string {
	return RouterKey
}

func (msg *MsgGetLease) Type() string {
	return "GetLease"
}

func (msg *MsgGetLease) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgGetLease) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgGetLease) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Uuid) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "UUID empty")
	}

	if len(msg.Key) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Key empty")
	}
	return nil
}
