package oracle

import (
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"time"
)

var currCtx *sdk.Context

func StartOracle(oracleKeeper Keeper, accountKeeper auth.AccountKeeper, cdc *codec.Codec) {
	waitForCtx()
	Run(oracleKeeper, accountKeeper, cdc)
}

func Run(oracleKeeper Keeper, accountKeeper auth.AccountKeeper, cdc *codec.Codec) {
	if keeper.IsValidator() {
		RunFeeder(oracleKeeper, accountKeeper, cdc)
	}
}

func waitForCtx() {
	for ; currCtx == nil; {
		time.After(time.Second)
	}
}


