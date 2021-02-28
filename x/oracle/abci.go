package oracle

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"time"
)

// BeginBlocker check for infraction evidence or downtime of validators
// on every begin block
func BeginBlocker(ctx sdk.Context, req abci.RequestBeginBlock) {
	time.AfterFunc(10 * time.Second, func() {currCtx = &ctx})
}

// EndBlocker called every block, process inflation, update validator set.
func EndBlocker(ctx sdk.Context) {
}
