package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgUpsert{}

func NewMsgUpsert(creator string, uuid string, key string, value []byte, lease *Lease) *MsgUpsert {
	return &MsgUpsert{
		Creator: creator,
		Uuid:    uuid,
		Key:     key,
		Value:   value,
		Lease:   lease,
	}
}

func (msg *MsgUpsert) Route() string {
	return RouterKey
}

func (msg *MsgUpsert) Type() string {
	return "UpsertCrudValue"
}

func (msg *MsgUpsert) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpsert) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpsert) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Key) == 0 {
		return sdkerrors.New("crud", 2, "Key cannot be empty")
	}


	return nil
}
