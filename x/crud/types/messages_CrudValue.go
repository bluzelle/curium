package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreate{}

func NewMsgCreate(creator string, uuid string, key string, value []byte, lease int64) *MsgCreate {
	return &MsgCreate{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Value:   value,
		Lease:   lease,
	}
}

func (msg *MsgCreate) Route() string {
	return RouterKey
}

func (msg *MsgCreate) Type() string {
	return "Create"
}

func (msg *MsgCreate) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreate) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreate) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Lease <= 0 {
		return sdkerrors.New("crud", 2, "Invalid lease time")
	}

	if len(msg.Key) == 0 {
		return sdkerrors.New("crud", 2, "Key cannot be empty")
	}

	return nil
}

var _ sdk.Msg = &MsgUpdate{}

func NewMsgUpdate(creator string, uuid string, key string, value []byte, lease int64) *MsgUpdate {
	return &MsgUpdate{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Value:   value,
		Lease:   lease,
	}
}

func (msg *MsgUpdate) Route() string {
	return RouterKey
}

func (msg *MsgUpdate) Type() string {
	return "UpdateCrudValue"
}

func (msg *MsgUpdate) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdate) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdate) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Key) == 0 {
		return sdkerrors.New("crud", 2, "Key cannot be empty")
	}

	return nil
}

var _ sdk.Msg = &MsgCreate{}

func NewMsgDelete(creator, uuid, key string) *MsgDelete {
	return &MsgDelete{
		Uuid:    uuid,
		Key:     key,
		Creator: creator,
	}
}
func (msg *MsgDelete) Route() string {
	return RouterKey
}

func (msg *MsgDelete) Type() string {
	return "DeleteCrudValue"
}

func (msg *MsgDelete) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDelete) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDelete) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
