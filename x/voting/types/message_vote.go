package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgVote{}

func NewMsgVote(creator string, valcons string, voteType string, from string, id string, batch string) *MsgVote {
	return &MsgVote{
		Creator:  creator,
		Valcons:  valcons,
		VoteType: voteType,
		From:     from,
		Id:       id,
		Batch:    batch,
	}
}

func (msg *MsgVote) Route() string {
	return RouterKey
}

func (msg *MsgVote) Type() string {
	return "Vote"
}

func (msg *MsgVote) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgVote) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgVote) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
