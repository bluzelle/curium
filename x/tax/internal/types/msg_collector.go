package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// MsgSetCollector defines a message to modify collector
type MsgSetCollector struct {
	NewCollector sdk.AccAddress
	Proposer     sdk.AccAddress
}

// NewMsgSetCollector returns a new instance of MsgSetCollector
func NewMsgSetCollector(newCollector, proposer sdk.AccAddress) MsgSetCollector {

	return MsgSetCollector{
		NewCollector: newCollector,
		Proposer:     proposer,
	}
}

// Route returns MsgSetCollector message route
func (msg MsgSetCollector) Route() string { return RouterKey }

// Type returns MsgSetCollector message type
func (msg MsgSetCollector) Type() string { return "set_collector" }

// ValidateBasic do basic validation for MsgSetCollector
func (msg MsgSetCollector) ValidateBasic() error {
	if msg.Proposer.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "proposer should not be empty address")
	}
	if msg.NewCollector.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "tax collector should not be empty address")
	}

	return nil
}

// GetSignBytes collect sign bytes from message
func (msg MsgSetCollector) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners return signers of this message
func (msg MsgSetCollector) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Proposer}
}
