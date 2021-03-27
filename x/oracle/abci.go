package oracle

import (
	"github.com/bluzelle/curium/app/ante"
	"github.com/bluzelle/curium/x/oracle/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

// BeginBlocker check for infraction evidence or downtime of validators
// on every begin block
func BeginBlocker(ctx sdk.Context, req abci.RequestBeginBlock) {
	ctx = ctx.WithGasMeter(ante.NewDummyGasMeter())
	currCtx = &ctx
}

// EndBlocker called every block, process inflation, update validator set.
func EndBlocker(ctx sdk.Context, k keeper.Keeper) {
	k.CheckAggregateValues(ctx.WithGasMeter(ante.NewDummyGasMeter()))
}
