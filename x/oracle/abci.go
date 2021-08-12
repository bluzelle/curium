package oracle

import (
	"github.com/bluzelle/curium/app/ante/gasmeter"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"sync"
)

// BeginBlocker check for infraction evidence or downtime of validators
// on every begin block
func BeginBlocker(ctx sdk.Context, req abci.RequestBeginBlock) {
	ctx = ctx.WithGasMeter(gasmeter.NewFreeGasMeter(0))
	currCtx = &ctx
}

var once sync.Once

// EndBlocker called every block, process inflation, update validator set.
func EndBlocker(ctx sdk.Context, am AppModule) {
	once.Do(func () {
		go StartFeeder(am.keeper)
	})
}