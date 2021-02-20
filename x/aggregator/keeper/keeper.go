package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/bluzelle/curium/x/aggregator/types"
)

// Keeper of the aggregator store
type Keeper struct {
	oracleKeeper 		oracle.Keeper
	valueQueueStoreKey   sdk.StoreKey
	aggValueStoreKey     sdk.StoreKey
	cdc        *codec.Codec
	paramspace types.ParamSubspace
}

// NewKeeper creates a aggregator keeper
func NewKeeper(cdc *codec.Codec, oracleKeeper oracle.Keeper, valueQueueStoreKey sdk.StoreKey, aggValueStoreKey sdk.StoreKey, paramspace types.ParamSubspace) Keeper {
	keeper := Keeper{
		oracleKeeper: oracleKeeper,
		valueQueueStoreKey:   valueQueueStoreKey,
		aggValueStoreKey:     aggValueStoreKey,
		cdc:        cdc,
//		paramspace: paramspace.WithKeyTable(types.ParamKeyTable()),
	}
	oracleKeeper.RegisterValueUpdatedListener(keeper.SourceValueUpdatedListener)
	return keeper
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetQueueStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.valueQueueStoreKey)
}

func (k Keeper) GetAggValueStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.aggValueStoreKey)
}


func (k Keeper) AddQueueItem(ctx sdk.Context, value oracle.SourceValue) {
	key := []byte(value.Batch + ">" + value.SourceName)
	store := k.GetQueueStore(ctx)
	store.Set(key, k.cdc.MustMarshalBinaryBare(value))
}

func (k Keeper) SourceValueUpdatedListener(ctx sdk.Context, value oracle.SourceValue) {
	k.AddQueueItem(ctx, value)
}

func (k Keeper) AggregateValues(ctx *sdk.Context) {
	fmt.Println("***** AGGREGATE VALUES")

}

