package aggregator_old

import (
	"github.com/bluzelle/curium/app/ante"
	"github.com/bluzelle/curium/x/aggregator_old/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func EndBlocker(ctx sdk.Context, k keeper.Keeper) {
	k.AggregateValues(ctx.WithGasMeter(ante.NewDummyGasMeter()))
}