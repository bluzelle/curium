package tax

import (
	"errors"

	"github.com/bluzelle/curium/x/tax/internal/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

type GenesisState struct {
	Collector sdk.AccAddress
	FeeBp     int64
	TrfBp     int64
}

func NewGenesisState() GenesisState {
	return GenesisState{}
}

func ValidateGenesis(data GenesisState) error {
	if data.Collector.Empty() && data.FeeBp > 0 {
		return errors.New("tax collector is empty but fee tax bp is not zero")
	}
	if data.Collector.Empty() && data.TrfBp > 0 {
		return errors.New("tax collector is empty but transfer tax bp is not zero")
	}
	return nil
}

func DefaultGenesisState() GenesisState {
	// $ blzcli keys add tax_owner --recover --keyring-backend=test
	// address: bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
	// pubkey: bluzellepub1addwnpepq0r59990s6ljrucwnsf085p2lkugecf87gljr45cgalkfk623f88sr7re7n
	// mnemonic: day rabbit mom clown bleak brown large lobster reduce accuse violin where address click dynamic myself buyer daughter situate today wheel thumb sudden drill
	collector, err := sdk.AccAddressFromBech32("bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw")
	if err != nil {
		panic(err)
	}
	return GenesisState{
		Collector: collector,
		FeeBp:     100,
		TrfBp:     100,
	}
}

func InitGenesis(ctx sdk.Context, k keeper.IKeeper, data GenesisState) []abci.ValidatorUpdate {
	k.SetCollector(ctx, data.Collector)
	k.SetFeeBp(ctx, data.FeeBp)
	k.SetTrfBp(ctx, data.TrfBp)
	return []abci.ValidatorUpdate{}
}

func ExportGenesis(ctx sdk.Context, k keeper.IKeeper) GenesisState {
	collector := k.GetCollector(ctx)
	feebp := k.GetFeeBp(ctx)
	trfbp := k.GetTrfBp(ctx)
	return GenesisState{
		Collector: collector,
		FeeBp:     feebp,
		TrfBp:     trfbp,
	}
}
