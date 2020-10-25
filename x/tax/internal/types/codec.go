package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
)

// ModuleCdc is codec for this module
var ModuleCdc = codec.New()

func init() {
	RegisterCodec(ModuleCdc)
}

// RegisterCodec register codecs for this module
func RegisterCodec(cdc *codec.Codec) {
	cdc.RegisterConcrete(MsgSetCollector{}, "tax/collector", nil)
	cdc.RegisterConcrete(MsgSetPercentage{}, "tax/percentage", nil)
}
