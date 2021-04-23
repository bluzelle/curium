package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgChunk{}

func NewMsgChunk(creator string, id uint64, chunk uint64, data []byte) *MsgChunk {
	return &MsgChunk{
		Creator: creator,
		Id:      id,
		Chunk:   chunk,
		Data:    data,
	}
}

func (msg *MsgChunk) Route() string {
	return RouterKey
}

func (msg *MsgChunk) Type() string {
	return "Chunk"
}

func (msg *MsgChunk) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgChunk) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgChunk) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
