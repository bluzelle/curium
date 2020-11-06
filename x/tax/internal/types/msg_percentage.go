package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// MsgSetBp defines a message to modify collector
type MsgSetBp struct {
	NewBp    int64
	Proposer sdk.AccAddress
}

// NewMsgSetBp returns a new instance of MsgSetBp
func NewMsgSetBp(newBp int64, proposer sdk.AccAddress) MsgSetBp {
	return MsgSetBp{
		NewBp:    newBp,
		Proposer: proposer,
	}
}

// Route returns MsgSetBp message route
func (msg MsgSetBp) Route() string { return RouterKey }

// Type returns MsgSetBp message type
func (msg MsgSetBp) Type() string { return "set_bp" }

// ValidateBasic do basic validation for MsgSetBp
func (msg MsgSetBp) ValidateBasic() error {
	if msg.Proposer.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "proposer should not be empty address")
	}
	if msg.NewBp < 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "tax should not be negative")
	}
	if msg.NewBp > 100 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "tax should not exceed 100%")
	}

	return nil
}

// GetSignBytes collect sign bytes from message
func (msg MsgSetBp) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners return signers of this message
func (msg MsgSetBp) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Proposer}
}
