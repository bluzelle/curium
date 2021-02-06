package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
)

// RegisterCodec registers concrete types on codec
func RegisterCodec(cdc *codec.Codec) {
	// this line is used by starport scaffolding # 1
	cdc.RegisterConcrete(MsgOracleAddSource{}, "oracle/MsgOracleAddSource", nil)
	cdc.RegisterConcrete(MsgOracleDeleteSource{}, "oracle/MsgOracleDeleteSource", nil)
	cdc.RegisterConcrete(MsgOracleVoteProof{}, "oracle/MsgOracleVoteProof", nil)
	cdc.RegisterConcrete(MsgOracleVote{}, "oracle/MsgOracleVote", nil)
	cdc.RegisterConcrete(MsgOracleDeleteVotes{}, "oracle/MsgOracleDeleteVotes", nil)
}

// ModuleCdc defines the module codec
var ModuleCdc *codec.Codec

func init() {
	ModuleCdc = codec.New()
	RegisterCodec(ModuleCdc)
	codec.RegisterCrypto(ModuleCdc)
	ModuleCdc.Seal()
}
