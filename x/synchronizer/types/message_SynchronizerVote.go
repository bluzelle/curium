package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgSynchronizerVote{}

func NewMsgSynchronizerVote(creator string, op string, uuid string, key string, value string, bookmark string) *MsgSynchronizerVote {
	return &MsgSynchronizerVote{
		Creator:  creator,
		Op:       op,
		Uuid:     uuid,
		Key:      key,
		Value:    value,
		Bookmark: bookmark,
	}
}

func (msg *MsgSynchronizerVote) Route() string {
	return RouterKey
}

func (msg *MsgSynchronizerVote) Type() string {
	return "SynchronizerVote"
}

func (msg *MsgSynchronizerVote) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSynchronizerVote) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSynchronizerVote) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
