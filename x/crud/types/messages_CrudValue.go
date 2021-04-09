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
	return nil
}

var _ sdk.Msg = &MsgUpdateCrudValue{}

func NewMsgUpdateCrudValue(creator string, uuid string, key string, value []byte, lease int64) *MsgUpdateCrudValue {
	return &MsgUpdateCrudValue{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Value:   value,
		Lease:   lease,
	}
}

func (msg *MsgUpdateCrudValue) Route() string {
	return RouterKey
}

func (msg *MsgUpdateCrudValue) Type() string {
	return "UpdateCrudValue"
}

func (msg *MsgUpdateCrudValue) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateCrudValue) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateCrudValue) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgCreate{}

func NewMsgDeleteCrudValue(creator, uuid, key string) *MsgDeleteCrudValue {
	return &MsgDeleteCrudValue{
		Uuid:    uuid,
		Key:     key,
		Creator: creator,
	}
}
func (msg *MsgDeleteCrudValue) Route() string {
	return RouterKey
}

func (msg *MsgDeleteCrudValue) Type() string {
	return "DeleteCrudValue"
}

func (msg *MsgDeleteCrudValue) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteCrudValue) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteCrudValue) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
