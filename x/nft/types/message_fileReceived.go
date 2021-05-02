package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgFileReceived{}

func NewMsgFileReceived(creator string, id string, nodeId string) *MsgFileReceived {
	return &MsgFileReceived{
		Creator: creator,
		Id:      id,
		NodeId:  nodeId,
	}
}

func (msg *MsgFileReceived) Route() string {
	return RouterKey
}

func (msg *MsgFileReceived) Type() string {
	return "FileReceived"
}

func (msg *MsgFileReceived) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFileReceived) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFileReceived) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
