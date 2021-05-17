package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgRegisterPeer{}

func NewMsgRegisterPeer(creator string, id string, address string, port uint64) *MsgRegisterPeer {
	return &MsgRegisterPeer{
		Creator: creator,
		Id:      id,
		Address: address,
		Port:    port,
	}
}

func (msg *MsgRegisterPeer) Route() string {
	return RouterKey
}

func (msg *MsgRegisterPeer) Type() string {
	return "RegisterPeer"
}

func (msg *MsgRegisterPeer) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRegisterPeer) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRegisterPeer) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
