package aggregator

import (
	"github.com/bluzelle/curium/x/aggregator/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"time"
)


func EndBlocker(ctx sdk.Context, k keeper.Keeper) {
	if time.Now().Second() > 40 {
		k.AggregateValues(ctx)
	}
}