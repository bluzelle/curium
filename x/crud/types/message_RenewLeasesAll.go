package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgRenewLeasesAll{}

func NewMsgRenewLeasesAll(creator string, uuid string, lease *Lease) *MsgRenewLeasesAll {
	return &MsgRenewLeasesAll{
		Creator: creator,
		Uuid:    uuid,
		Lease:   lease,
	}
}

func (msg *MsgRenewLeasesAll) Route() string {
	return RouterKey
}

func (msg *MsgRenewLeasesAll) Type() string {
	return "RenewLeasesAll"
}

func (msg *MsgRenewLeasesAll) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRenewLeasesAll) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRenewLeasesAll) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
