package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle"
	"os"
	"strings"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/aggregator/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var logger = log.NewTMLogger(log.NewSyncWriter(os.Stdout))

// Keeper of the aggregator store
type Keeper struct {
	oracleKeeper       oracle.Keeper
	valueQueueStoreKey sdk.StoreKey
	aggValueStoreKey   sdk.StoreKey
	cdc                *codec.Codec
	paramspace         types.ParamSubspace
}

// NewKeeper creates a aggregator keeper
func NewKeeper(cdc *codec.Codec, oracleKeeper oracle.Keeper, valueQueueStoreKey sdk.StoreKey, aggValueStoreKey sdk.StoreKey, paramspace types.ParamSubspace) Keeper {
	keeper := Keeper{
		oracleKeeper:       oracleKeeper,
		valueQueueStoreKey: valueQueueStoreKey,
		aggValueStoreKey:   aggValueStoreKey,
		cdc:                cdc,
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

func MakeQueueItemKey(value AggregatorQueueItem) []byte {
	return []byte(value.Batch + ">" + value.SourceName)
}

type AggregatorQueueItem struct {
	SourceName string
	Batch string
	Symbol string
	InSymbol string
}

func (k Keeper) AddQueueItem(ctx sdk.Context, value oracle.SourceValue) {
	parts := strings.Split(value.SourceName, "-")
	aggQueueItem := AggregatorQueueItem{
		Batch: value.Batch,
		SourceName: value.SourceName,
		Symbol: parts[1],
		InSymbol: parts[3],
	}
	key := MakeQueueItemKey(aggQueueItem)
	store := k.GetQueueStore(ctx)
	store.Set(key, k.cdc.MustMarshalBinaryBare(aggQueueItem))
}

func (k Keeper) DeleteQueueItem(ctx sdk.Context, value AggregatorQueueItem) {
	key := MakeQueueItemKey(value)
	store := k.GetQueueStore(ctx)
	store.Delete(key)
}

func (k Keeper) VisitQueueItems(ctx sdk.Context, cb func(AggregatorQueueItem)) {
	store := k.GetQueueStore(ctx)
	iterator := store.Iterator(nil, nil)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var value AggregatorQueueItem
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &value)
		cb(value)
		k.DeleteQueueItem(ctx, value)
	}
}

func (k Keeper) SourceValueUpdatedListener(ctx sdk.Context, value oracle.SourceValue) {
	logger.Info("Adding source value to agg queue", "batch", value.Batch, "source", value.SourceName)
	k.AddQueueItem(ctx, value)
}

func (k Keeper) AggregateValues(ctx sdk.Context) {
	logger.Info("Start aggregate values")
	batches := batchQueueItems(ctx, k)
	for batch := range batches {
		logger.Info("Processing batch", "batch", batch, "len", len(batches[batch]))
		processBatch(ctx, k, batches[batch])
	}
	logger.Info("End aggregate values")
}

func processBatch(ctx sdk.Context, k Keeper, values []AggregatorQueueItem) {
	
	fmt.Println(values)
}


func batchQueueItems(ctx sdk.Context, k Keeper) map[string][]AggregatorQueueItem {
	var batches = map[string][]AggregatorQueueItem{}
	k.VisitQueueItems(ctx, func(value AggregatorQueueItem) {
		b := batches[value.Batch]
		if b == nil {
			batches[value.Batch] = make([]AggregatorQueueItem, 0)
		}
		batches[value.Batch] = append(batches[value.Batch], value)
	})
	return batches
}
