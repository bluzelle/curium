package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgUpsertCrudValue{}, "crud/UpsertCrudValue", nil)

	cdc.RegisterConcrete(&MsgCreateCrudValue{}, "crud/CreateCrudValue", nil)
	cdc.RegisterConcrete(&MsgUpdateCrudValue{}, "crud/UpdateCrudValue", nil)
	cdc.RegisterConcrete(&MsgDeleteCrudValue{}, "crud/DeleteCrudValue", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUpsertCrudValue{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateCrudValue{},
		&MsgUpdateCrudValue{},
		&MsgDeleteCrudValue{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)
