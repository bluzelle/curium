package types

import (
	"github.com/anacrolix/torrent/metainfo"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/zeebo/bencode"
)

type MsgPublishFile struct {
	Creator  string `json:"creator,omitempty"`
	Id       string `json:"id,omitempty"`
	Vendor	 string `json:"vendor,omitempty"`
	Metainfo []byte `json:"metainfo,omitempty"`
}

type MsgPublishFileResponse struct {

}

func (msg *MsgPublishFile) Route() string {
	return RouterKey
}

func (msg *MsgPublishFile) Type() string {
	return "PublishFile"
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

	var metaInfo metainfo.MetaInfo
	err = bencode.DecodeBytes(msg.Metainfo, &metaInfo)
	if err != nil {
		return err
	}

	if len(metaInfo.Announce) > 0 ||
		metaInfo.AnnounceList != nil ||
		metaInfo.Nodes != nil ||
		metaInfo.UrlList != nil {
		return sdkerrors.New("nft", 2, "Invalid torrent metainfo in publish")
	}

	return nil
}
