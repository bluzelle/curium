package aggregator

import (
	"github.com/bluzelle/curium/x/aggregator/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"time"
)

// BeginBlocker check for infraction evidence or downtime of validators
// on every begin block
func BeginBlocker(ctx sdk.Context, req abci.RequestBeginBlock, k keeper.Keeper) {
	time.AfterFunc(10 * time.Second, func() {currCtx = &ctx})
}

