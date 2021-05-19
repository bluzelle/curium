package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgRenewLease{}

func NewMsgRenewLease(creator string, uuid string, key string, lease *Lease) *MsgRenewLease {
	return &MsgRenewLease{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Lease:   lease,
	}
}

func (msg *MsgRenewLease) Route() string {
	return RouterKey
}

func (msg *MsgRenewLease) Type() string {
	return "RenewLease"
}

func (msg *MsgRenewLease) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRenewLease) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRenewLease) ValidateBasic() error {
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
