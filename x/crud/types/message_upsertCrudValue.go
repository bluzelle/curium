package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgUpsertCrudValue{}

func NewMsgUpsertCrudValue(creator string, uuid string, key string, value string, lease int64) *MsgUpsertCrudValue {
	return &MsgUpsertCrudValue{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Value:   value,
		Lease:   lease,
	}
}

func (msg *MsgUpsertCrudValue) Route() string {
	return RouterKey
}

func (msg *MsgUpsertCrudValue) Type() string {
	return "UpsertCrudValue"
}

func (msg *MsgUpsertCrudValue) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpsertCrudValue) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpsertCrudValue) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
