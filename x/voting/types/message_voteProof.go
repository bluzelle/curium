package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgVoteProof{}

func NewMsgVoteProof(creator string, valcons string, signature []byte) *MsgVoteProof {
	return &MsgVoteProof{
		Creator:   creator,
		Valcons:   valcons,
		Signature: signature,
	}
}

func (msg *MsgVoteProof) Route() string {
	return RouterKey
}

func (msg *MsgVoteProof) Type() string {
	return "VoteProof"
}

func (msg *MsgVoteProof) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgVoteProof) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgVoteProof) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
