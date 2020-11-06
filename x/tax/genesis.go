package tax

import (
	"errors"

	"github.com/bluzelle/curium/x/tax/internal/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

type GenesisState struct {
	Collector sdk.AccAddress
	Bp        int64
}

func NewGenesisState() GenesisState {
	return GenesisState{}
}

func ValidateGenesis(data GenesisState) error {
	if data.Collector.Empty() && data.Bp > 0 {
		return errors.New("tax collector is empty but tax bp is not zero")
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
		Bp:        100,
	}
}

func InitGenesis(ctx sdk.Context, k keeper.IKeeper, data GenesisState) []abci.ValidatorUpdate {
	k.SetCollector(ctx, data.Collector)
	k.SetBp(ctx, data.Bp)
	return []abci.ValidatorUpdate{}
}

func ExportGenesis(ctx sdk.Context, k keeper.IKeeper) GenesisState {
	collector := k.GetCollector(ctx)
	bp := k.GetBp(ctx)
	return GenesisState{
		Collector: collector,
		Bp:        bp,
	}
}
