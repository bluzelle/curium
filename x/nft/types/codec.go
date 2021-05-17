package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgRegisterPeer{}, "nft/RegisterPeer", nil)

	cdc.RegisterConcrete(&MsgPublishFile{}, "nft/PublishFile", nil)

	cdc.RegisterConcrete(&MsgFileReceived{}, "nft/FileReceived", nil)

	cdc.RegisterConcrete(&MsgCreateNft{}, "nft/CreateNft", nil)
	cdc.RegisterConcrete(&MsgUpdateNft{}, "nft/UpdateNft", nil)
	cdc.RegisterConcrete(&MsgDeleteNft{}, "nft/DeleteNft", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRegisterPeer{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgPublishFile{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgFileReceived{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateNft{},
		&MsgUpdateNft{},
		&MsgDeleteNft{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)
