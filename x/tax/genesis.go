package tax

import (
	"errors"

	"github.com/bluzelle/curium/x/tax/internal/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

type GenesisState struct {
	Collector  sdk.AccAddress
	Percentage int
}

func NewGenesisState() GenesisState {
	return GenesisState{}
}

func ValidateGenesis(data GenesisState) error {
	if data.Collector.Empty() && data.Percentage > 0 {
		return errors.New("tax collector is empty but tax percentage is not zero")
	}
	return nil
}

func DefaultGenesisState() GenesisState {
	return GenesisState{
		Collector:  sdk.AccAddress("tax-address"),
		Percentage: 1,
	}
}

func InitGenesis(ctx sdk.Context, k keeper.IKeeper, data GenesisState) []abci.ValidatorUpdate {
	k.SetCollector(ctx, data.Collector)
	k.SetPercentage(ctx, data.Percentage)
	return []abci.ValidatorUpdate{}
}

func ExportGenesis(ctx sdk.Context, k keeper.IKeeper) GenesisState {
	collector := k.GetCollector(ctx)
	percentage := k.GetPercentage(ctx)
	return GenesisState{
		Collector:  collector,
		Percentage: percentage,
	}
}
