package oracle

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/x/auth"
)


func StartOracle(oracleKeeper Keeper, accountKeeper auth.AccountKeeper, cdc *codec.Codec) {
	Run(oracleKeeper, accountKeeper, cdc)
}

func Run(oracleKeeper Keeper, accountKeeper auth.AccountKeeper, cdc *codec.Codec) {
	RunFeeder(oracleKeeper, accountKeeper, cdc)

}