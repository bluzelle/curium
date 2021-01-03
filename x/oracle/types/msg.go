package types

import (
	_ "github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/types/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgOracleVoteProof{}

// MsgOracleVoteProof - struct for sending a vote preflight proof

type MsgOracleVoteProof struct {
	ValidatorAddr string `json:"address"` // address of the validator operator
	VoteHash string `json:"voteHash"`
}


// NewMsgOracleVoteProof creates a new MsgOracleVoteProof instance

func NewMsgOracleVoteProof(validatorAddr string, voteHash string) MsgOracleVoteProof {
	return MsgOracleVoteProof{
		ValidatorAddr: validatorAddr,
		VoteHash: voteHash,
	}
}


 const OracleVoteProofConst = "OracleVoteProof"

// nolint

func (msg MsgOracleVoteProof) Route() string { return RouterKey }
func (msg MsgOracleVoteProof) Type() string  { return OracleVoteProofConst }
func (msg MsgOracleVoteProof) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{sdk.AccAddress(msg.ValidatorAddr)}
}

// GetSignBytes gets the bytes for the message signer to sign on
func (msg MsgOracleVoteProof) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic validity check for the AnteHandler
func (msg MsgOracleVoteProof) ValidateBasic() error {
	if len(msg.ValidatorAddr) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "missing validator address")
	}
	if len(msg.VoteHash) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "missing validator address")
	}
	return nil
}
