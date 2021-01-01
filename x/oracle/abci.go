package oracle

import (
	"github.com/bluzelle/curium/x/crud"
	"github.com/bluzelle/curium/x/oracle/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

// BeginBlocker check for infraction evidence or downtime of validators
// on every begin block
func BeginBlocker(ctx sdk.Context, req abci.RequestBeginBlock, k keeper.Keeper, crudKeeper crud.Keeper) {
	currCtx = &ctx
}

// EndBlocker called every block, process inflation, update validator set.
func EndBlocker(ctx sdk.Context, _ keeper.Keeper, crudKeeper crud.Keeper) {
}
