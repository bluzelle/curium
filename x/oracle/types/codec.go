package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
)

// RegisterCodec registers concrete types on codec
func RegisterCodec(cdc *codec.Codec) {
	// this line is used by starport scaffolding # 1
	cdc.RegisterConcrete(MsgOracleAddSource{}, "oracle/addsource", nil)
	cdc.RegisterConcrete(MsgOracleDeleteSource{}, "oracle/deletesource", nil)
//	cdc.RegisterConcrete(MsgOracleVoteProof{}, "oracle/voteproof", nil)



}

// ModuleCdc defines the module codec
var ModuleCdc *codec.Codec

func init() {
	ModuleCdc = codec.New()
	RegisterCodec(ModuleCdc)
	codec.RegisterCrypto(ModuleCdc)
	ModuleCdc.Seal()
}
