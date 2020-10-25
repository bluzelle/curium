package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// MsgSetPercentage defines a message to modify collector
type MsgSetPercentage struct {
	NewPercentage int
	Proposer      sdk.AccAddress
}

// NewMsgSetPercentage returns a new instance of MsgSetPercentage
func NewMsgSetPercentage(newPercentage int, proposer sdk.AccAddress) MsgSetPercentage {

	return MsgSetPercentage{
		NewPercentage: newPercentage,
		Proposer:      proposer,
	}
}

// Route returns MsgSetPercentage message route
func (msg MsgSetPercentage) Route() string { return RouterKey }

// Type returns MsgSetPercentage message type
func (msg MsgSetPercentage) Type() string { return "set_percentage" }

// ValidateBasic do basic validation for MsgSetPercentage
func (msg MsgSetPercentage) ValidateBasic() error {
	if msg.Proposer.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "proposer should not be empty address")
	}
	if msg.NewPercentage < 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "tax should not be negative")
	}
	if msg.NewPercentage > 100 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "tax should not exceed 100%")
	}

	return nil
}

// GetSignBytes collect sign bytes from message
func (msg MsgSetPercentage) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners return signers of this message
func (msg MsgSetPercentage) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Proposer}
}
