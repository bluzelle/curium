package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
)

// RegisterCodec registers concrete types on codec
func RegisterCodec(cdc *codec.Codec) {
	// this line is used by starport scaffolding # 1
	cdc.RegisterConcrete(MsgOracleAddSource{}, "oracle/MsgAddSource", nil)
	cdc.RegisterConcrete(MsgOracleDeleteSource{}, "oracle/MsgDeleteSource", nil)
	cdc.RegisterConcrete(MsgOracleVoteProof{}, "oracle/MsgVoteProof", nil)
	cdc.RegisterConcrete(MsgOracleVote{}, "oracle/MsgVote", nil)
	cdc.RegisterConcrete(MsgOracleDeleteVotes{}, "oracle/MsgDeleteVotes", nil)
	cdc.RegisterConcrete(MsgOracleSetAdmin{}, "oracle/MsgSetAdmin", nil)
}

// ModuleCdc defines the module codec
var ModuleCdc *codec.Codec

func init() {
	ModuleCdc = codec.New()
	RegisterCodec(ModuleCdc)
	codec.RegisterCrypto(ModuleCdc)
	ModuleCdc.Seal()
}
