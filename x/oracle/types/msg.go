package types

import (
	_ "github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/types/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

/*********************************************************************
** MsgOracleDeleteSource - struct for sending a vote preflight proof
 ********************************************************************/
type MsgOracleDeleteSource struct {
	Name string
	Owner sdk.AccAddress
}


// NewMsgOracleDeleteSource creates a new MsgOracleDeleteSource instance
func NewMsgOracleDeleteSource(name string, owner sdk.AccAddress) MsgOracleDeleteSource {
	return MsgOracleDeleteSource{
		Name: name,
		Owner: owner,
	}
}

// nolint
func (msg MsgOracleDeleteSource) Route() string { return RouterKey }
func (msg MsgOracleDeleteSource) Type() string  { return "OracleDeleteSource" }
func (msg MsgOracleDeleteSource) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{sdk.AccAddress(msg.Owner)}
}

// GetSignBytes gets the bytes for the message signer to sign on
func (msg MsgOracleDeleteSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic validity check for the AnteHandler
func (msg MsgOracleDeleteSource) ValidateBasic() error {
	if len(msg.Name) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "missing name")
	}
	return nil
}








/*********************************************************************
** MsgOracleAddSource - struct for sending a vote preflight proof
 ********************************************************************/
type MsgOracleAddSource struct {
	Name string
	Url string
	Property string
	Owner sdk.AccAddress
}


// NewMsgOracleAddSource creates a new MsgOracleAddSource instance
func NewMsgOracleAddSource(name string, url string, property string, owner sdk.AccAddress) MsgOracleAddSource {
	return MsgOracleAddSource{
		Name: name,
		Url: url,
		Property: property,
		Owner: owner,
	}
}

// nolint
func (msg MsgOracleAddSource) Route() string { return RouterKey }
func (msg MsgOracleAddSource) Type() string  { return "OracleAddSource" }
func (msg MsgOracleAddSource) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{sdk.AccAddress(msg.Owner)}
}

// GetSignBytes gets the bytes for the message signer to sign on
func (msg MsgOracleAddSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic validity check for the AnteHandler
func (msg MsgOracleAddSource) ValidateBasic() error {
	if len(msg.Name) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "missing name")
	}
	if len(msg.Url) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "missing url")
	}
	if len(msg.Property) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "missing property")
	}
	return nil
}














/*********************************************************************
** MsgOracleVoteProof - struct for sending a vote preflight proof
 ********************************************************************/
type MsgOracleVoteProof struct {
	ValidatorAddr string
	VoteHash string
	Owner sdk.AccAddress
	SourceName string
}


// NewMsgOracleVoteProof creates a new MsgOracleVoteProof instance
func NewMsgOracleVoteProof(validatorAddr string, voteHash string, owner sdk.AccAddress, sourceName string) MsgOracleVoteProof {
	return MsgOracleVoteProof{
		ValidatorAddr: validatorAddr,
		VoteHash: voteHash,
		Owner: owner,
		SourceName: sourceName,
	}
}

// nolint
func (msg MsgOracleVoteProof) Route() string { return RouterKey }
func (msg MsgOracleVoteProof) Type() string  { return "OracleVoteProof" }
func (msg MsgOracleVoteProof) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{sdk.AccAddress(msg.Owner)}
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


