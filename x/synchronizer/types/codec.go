package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2

	cdc.RegisterConcrete(&MsgSetConfig{}, "synchronizer/SetConfig", nil)

	cdc.RegisterConcrete(&MsgCreateSource{}, "synchronizer/CreateSource", nil)
	cdc.RegisterConcrete(&MsgUpdateSource{}, "synchronizer/UpdateSource", nil)
	cdc.RegisterConcrete(&MsgDeleteSource{}, "synchronizer/DeleteSource", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSetConfig{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateSource{},
		&MsgUpdateSource{},
		&MsgDeleteSource{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)
