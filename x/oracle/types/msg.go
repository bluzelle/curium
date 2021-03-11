package types

import (
	_ "github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/types/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)


/*********************************************************************
** MsgOracleDeleteVotes - struct for sending a vote preflight proof
 ********************************************************************/
type MsgOracleDeleteVotes struct {
	Prefix string
	Owner sdk.AccAddress
}

// NewMsgOracleDeleteVotes creates a new MsgOracleDeleteVotes instance
func NewMsgOracleDeleteVotes(prefix string, owner sdk.AccAddress) MsgOracleDeleteVotes {
	return MsgOracleDeleteVotes{
		Prefix: prefix,
		Owner: owner,
	}
}

// nolint
func (msg MsgOracleDeleteVotes) Route() string { return RouterKey }
func (msg MsgOracleDeleteVotes) Type() string  { return "oracle/MsgDeleteVotes" }
func (msg MsgOracleDeleteVotes) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

// GetSignBytes gets the bytes for the message signer to sign on
func (msg MsgOracleDeleteVotes) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic validity check for the AnteHandler
func (msg MsgOracleDeleteVotes) ValidateBasic() error {
	if len(msg.Prefix) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "missing prefix")
	}
	return nil
}


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
func (msg MsgOracleDeleteSource) Type() string  { return "oracle/MsgDeleteSource" }
func (msg MsgOracleDeleteSource) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
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
** MsgOracleAddSource - struct for adding a source
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
func (msg MsgOracleAddSource) Type() string  { return "oracle/MsgAddSource" }
func (msg MsgOracleAddSource) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
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
** MsgOracleVote - struct for sending a vote
 ********************************************************************/
type MsgOracleVote struct {
	Valcons    string
	Value      string
	Owner      sdk.AccAddress
	SourceName string
	Batch      string
}


// NewMsgOracleVote creates a new MsgOracleVote instance
func NewMsgOracleVote(validatorAddr string, value string, owner sdk.AccAddress, sourceName string, batch string) MsgOracleVote {
	return MsgOracleVote{
		Valcons:    validatorAddr,
		Value:      value,
		Owner:      owner,
		SourceName: sourceName,
		Batch: batch,
	}
}

// nolint
func (msg MsgOracleVote) Route() string { return RouterKey }
func (msg MsgOracleVote) Type() string  { return "oracle/MsgVote" }
func (msg MsgOracleVote) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

// GetSignBytes gets the bytes for the message signer to sign on
func (msg MsgOracleVote) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic validity check for the AnteHandler
func (msg MsgOracleVote) ValidateBasic() error {
	if len(msg.Valcons) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "missing validator address")
	}
	return nil
}















/*********************************************************************
** MsgOracleVoteProof - struct for sending a vote preflight proof
 ********************************************************************/
type MsgOracleVoteProof struct {
	ValidatorAddr string
	VoteSig string
	Owner sdk.AccAddress
	SourceName string
}


// NewMsgOracleVoteProof creates a new MsgOracleVoteProof instance
func NewMsgOracleVoteProof(validatorAddr string, voteSig string, owner sdk.AccAddress, sourceName string) MsgOracleVoteProof {
	return MsgOracleVoteProof{
		ValidatorAddr: validatorAddr,
		VoteSig: voteSig,
		Owner: owner,
		SourceName: sourceName,
	}
}

// nolint
func (msg MsgOracleVoteProof) Route() string { return RouterKey }
func (msg MsgOracleVoteProof) Type() string  { return "oracle/MsgVoteProof" }
func (msg MsgOracleVoteProof) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
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
	if len(msg.VoteSig) < 1 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "missing validator address")
	}
	return nil
}




/*********************************************************************
** MsgOracleSetAdmin - struct for sending a set admin message
 ********************************************************************/
type MsgOracleSetAdmin struct {
	NewAdminAddr sdk.AccAddress
	Owner sdk.AccAddress
}

// NewMsgOracleSetAdmin creates a new MsgOracleSetAdmin instance
func NewMsgOracleSetAdmin(newAdminAddr sdk.AccAddress, owner sdk.AccAddress,) MsgOracleSetAdmin {
	return MsgOracleSetAdmin{
		NewAdminAddr: newAdminAddr,
		Owner: owner,
	}
}

// nolint
func (msg MsgOracleSetAdmin) Route() string { return RouterKey }
func (msg MsgOracleSetAdmin) Type() string  { return "oracle/MsgSetAdmin" }
func (msg MsgOracleSetAdmin) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Owner}
}

// GetSignBytes gets the bytes for the message signer to sign on
func (msg MsgOracleSetAdmin) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic validity check for the AnteHandler
func (msg MsgOracleSetAdmin) ValidateBasic() error {
	if msg.NewAdminAddr == nil {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "Invalid new addmin address")
	}
	return nil
}

