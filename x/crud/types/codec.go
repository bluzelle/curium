package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgGetNShortestLeases{}, "crud/GetNShortestLeases", nil)

	cdc.RegisterConcrete(&MsgKeys{}, "crud/Keys", nil)

	cdc.RegisterConcrete(&MsgRename{}, "crud/Rename", nil)

	cdc.RegisterConcrete(&MsgMultiUpdate{}, "crud/MultiUpdate", nil)

	cdc.RegisterConcrete(&MsgDeleteAll{}, "crud/DeleteAll", nil)

	cdc.RegisterConcrete(&MsgKeyValues{}, "crud/KeyValues", nil)

	cdc.RegisterConcrete(&MsgHas{}, "crud/Has", nil)

	cdc.RegisterConcrete(&MsgGetLease{}, "crud/GetLease", nil)

	cdc.RegisterConcrete(&MsgRead{}, "crud/Read", nil)

	cdc.RegisterConcrete(&MsgUpsert{}, "crud/Upsert", nil)

	cdc.RegisterConcrete(&MsgCreate{}, "crud/Create", nil)
	cdc.RegisterConcrete(&MsgUpdate{}, "crud/Update", nil)
	cdc.RegisterConcrete(&MsgDelete{}, "crud/Delete", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgGetNShortestLeases{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgKeys{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRename{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgMultiUpdate{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgDeleteAll{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgKeyValues{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgHas{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgGetLease{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRead{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUpsert{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreate{},
		&MsgUpdate{},
		&MsgDelete{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)
