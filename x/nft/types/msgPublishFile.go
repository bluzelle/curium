package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

type MsgPublishFile struct {
	Creator  string `json:"creator,omitempty"`
	Id       string `json:"id,omitempty"`
	Vendor	 string `json:"vendor,omitempty"`
	UserId	 string `json:"UserId,omitempty"`
	Hash     string `json:"hash,omitempty"`
	Mime     string `json:"mime,omitempty"`
	Metainfo []byte `json:"metainfo,omitempty"`
}

type MsgPublishFileResponse struct {

}

func (msg *MsgPublishFile) Route() string {
	return RouterKey
}

func (msg *MsgPublishFile) Type() string {
	return "CreateNft"
}

func (msg *MsgPublishFile) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgPublishFile) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgPublishFile) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
