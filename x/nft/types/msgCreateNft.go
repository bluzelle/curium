package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var UPLOAD_MAX_SIZE = uint64(150)


type MsgCreateNft struct {
	Id      string
	Hash    string
	Vendor string
	UserId string
	Creator string
	Mime    string
	Meta    string
	Size    uint64
}

type MsgCreateNftResponse struct {
	Id      string    `json:"id"`
	Token   string	  `json:"token"`
}


func (msg *MsgCreateNft) Route() string {
	return RouterKey
}

func (msg *MsgCreateNft) Type() string {
	return "CreateNft"
}

func (msg *MsgCreateNft) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateNft) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateNft) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Size > UPLOAD_MAX_SIZE * 1024 * 1024 {
		return sdkerrors.New("nft", 2, "upload too large")
	}

	return nil
}