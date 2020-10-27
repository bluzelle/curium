package tax

import (
	"errors"

	"github.com/bluzelle/curium/x/tax/internal/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

type GenesisState struct {
	Collector  sdk.AccAddress
	Percentage int64
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
	// $ blzcli keys add tax_owner
	// address: bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
	// pubkey: bluzellepub1addwnpepq0r59990s6ljrucwnsf085p2lkugecf87gljr45cgalkfk623f88sr7re7n
	// mnemonic: day rabbit mom clown bleak brown large lobster reduce accuse violin where address click dynamic myself buyer daughter situate today wheel thumb sudden drill
	collector, _ := sdk.AccAddressFromBech32("bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw")
	return GenesisState{
		Collector:  collector,
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
