package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle"
	storeIterator "github.com/cosmos/cosmos-sdk/store/types"
	"os"
	"regexp"
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
	storeKey 		   sdk.StoreKey
	cdc                *codec.Codec
	paramspace         types.ParamSubspace
}

// NewKeeper creates a aggregator keeper
func NewKeeper(cdc *codec.Codec, oracleKeeper oracle.Keeper, storeKey sdk.StoreKey, _ types.ParamSubspace) Keeper {
	keeper := Keeper{
		oracleKeeper:       oracleKeeper,
		storeKey: storeKey,
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

func (k Keeper) GetStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.storeKey)
}

func (k Keeper) AddQueueItem(ctx sdk.Context, value oracle.SourceValue) {
	parts := strings.Split(value.SourceName, "-")
	aggQueueItem := types.AggregatorQueueItem{
		Batch:      value.Batch,
		SourceName: value.SourceName,
		Symbol:     parts[1],
		InSymbol:   parts[3],
		Value:      value.Value,
		Height:	    value.Height,
		Weight:     value.Weight,
	}
	key := types.QueueItemKey{
		Height: aggQueueItem.Height,
		Batch: aggQueueItem.Batch,
		SourceName: aggQueueItem.SourceName,
	}.Bytes()

	store := k.GetStore(ctx)
	store.Set(key, k.cdc.MustMarshalBinaryBare(aggQueueItem))
}

func (k Keeper) DeleteQueueItem(ctx sdk.Context, value types.AggregatorQueueItem) {
	key := types.QueueItemKey{
		Height:     value.Height,
		Batch:      value.Batch,
		SourceName: value.SourceName,
	}.Bytes()

	store := k.GetStore(ctx)
	store.Delete(key)
}

func (k Keeper) VisitQueueItems(ctx sdk.Context, cb func(types.AggregatorQueueItem)) {
	store := k.GetStore(ctx)
	iterator := sdk.KVStorePrefixIterator(store, []byte(types.QueueStorePrefix))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var value types.AggregatorQueueItem
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &value)
		cb(value)
		k.DeleteQueueItem(ctx, value)
	}
}

func (k Keeper) SourceValueUpdatedListener(ctx sdk.Context, value oracle.SourceValue) {
	k.AddQueueItem(ctx, value)
}

func (k Keeper) isQueueReadyForProcessing(ctx sdk.Context) bool {
	const BLOCKS_TO_WAIT = 2
	store := k.GetStore(ctx)
	iterator := sdk.KVStoreReversePrefixIterator(store, []byte(types.QueueStorePrefix))
	defer iterator.Close()
	if iterator.Valid() {
		var item types.AggregatorQueueItem
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &item)
		return item.Height + BLOCKS_TO_WAIT < ctx.BlockHeight()
	}
	return false
}

func (k Keeper) AggregateValues(ctx sdk.Context) {
	if !k.isQueueReadyForProcessing(ctx) {
		return
	}
	batches := batchQueueItems(ctx, k)
	for batch := range batches {
		logger.Info("Aggregator processing batch", "batch", batch, "len", len(batches[batch]))
		processBatch(ctx, k, batches[batch])
	}
}

func filterZeroValues(values []types.AggregatorQueueItem) []types.AggregatorQueueItem {
	var out []types.AggregatorQueueItem
	for _, item := range values {
		if item.Value.IsZero() || item.Value.IsNil() {
			continue
		}
		out = append(out, item)
	}
	return out
}

func processBatch(ctx sdk.Context, k Keeper, values []types.AggregatorQueueItem) {
	fixupUsdItems(values)
	values = filterZeroValues(values)
	values = addInverses(values)

	averagers := make(map[string]Averager)

	for _, value := range values {
		key := value.Symbol + "-" + value.InSymbol
		x := averagers[key]
		x.Add(value.Value, value.Weight)
		averagers[key] = x
	}

	store := k.GetStore(ctx)

	for key, averager := range averagers {
		parts := strings.Split(key, "-")
		storeKey := types.AggStoreKey{
			Batch: values[0].Batch,
			Symbol: parts[0],
			InSymbol: parts[1],
		}.Bytes()

		value := types.AggregatorValue{
			Batch:    values[0].Batch,
			Symbol:   parts[0],
			InSymbol: parts[1],
			Value:    averager.CalculateAverage(),
			Count:    averager.Count,
			Height:		values[0].Height,
		}
		store.Set(storeKey, k.cdc.MustMarshalBinaryBare(value))
	}
}


func addInverses(values []types.AggregatorQueueItem) []types.AggregatorQueueItem {
	var newValues []types.AggregatorQueueItem
	for _, value := range values {
		newValues = append(newValues, types.AggregatorQueueItem{
			SourceName: value.SourceName + "-inverse",
			Batch:      value.Batch,
			Symbol:     value.InSymbol,
			InSymbol:   value.Symbol,
			Value:      sdk.NewDec(1).Quo(value.Value),
			Weight:		value.Weight,
		})
	}
	return append(values, newValues...)
}

func fixupUsdItems(values []types.AggregatorQueueItem) {
	for i, value := range values {
		if value.Symbol == "usdt" || value.Symbol == "usdc" {
			values[i].Symbol = "usd"
		}
		if value.InSymbol == "usdt" || value.InSymbol == "usdc" {
			values[i].InSymbol = "usd"
		}
	}
}

func batchQueueItems(ctx sdk.Context, k Keeper) map[string][]types.AggregatorQueueItem {
	var batches = map[string][]types.AggregatorQueueItem{}
	k.VisitQueueItems(ctx, func(value types.AggregatorQueueItem) {
		b := batches[value.Batch]
		if b == nil {
			batches[value.Batch] = make([]types.AggregatorQueueItem, 0)
		}
		batches[value.Batch] = append(batches[value.Batch], value)
	})
	return batches
}

func (k Keeper) SearchAggValueBatchKeys(ctx sdk.Context, previousKey string, limit uint, reverse bool) []string {
	isInRange := func(key string) bool {
		if len(previousKey) == 0 {
			return true
		}

		if reverse && key < previousKey {
			return true
		}
		if !reverse && key > previousKey {
			return true
		}
		return false
	}

	var batches = make([]string, 0)
	store := k.GetStore(ctx)

	if limit == 0 {
		limit = 50
	}

	var iterator sdk.Iterator

	if reverse {
		iterator = sdk.KVStoreReversePrefixIterator(store, []byte(types.AggValueStorePrefix))
	} else {
		iterator = store.Iterator(nil, nil)
	}
	defer iterator.Close()

	var re = regexp.MustCompile(`([^>]*).*`)
	var prevBatch string

	for ;iterator.Valid(); iterator.Next() {
		key := string(iterator.Key()[1:])
		batch := re.ReplaceAllString(key, `$1`)

		if isInRange(batch) {

			if batch != prevBatch {
				batches = append(batches, batch)
			}
			prevBatch = batch
		}

		if uint(len(batches)) == limit {
			break
		}
	}

	return batches
}

func (k Keeper) GetAggregatedValue(ctx sdk.Context, batch string, pair string) types.AggregatorValue {
	store := k.GetStore(ctx)
	parts := strings.Split(pair, "-")
	storeKey := types.AggStoreKey{
		Batch: batch,
		Symbol: parts[0],
		InSymbol: parts[1],
	}.Bytes()
	bz := store.Get(storeKey)
	var value types.AggregatorValue
	k.cdc.MustUnmarshalBinaryBare(bz, &value)
	return value
}

func (k Keeper) SearchValues(ctx sdk.Context, prefix string, page uint, limit uint, reverse bool) []types.AggregatorValue {
	if page == 0 {
		page = 1
	}
	if limit == 0 {
		limit = 100
	}
	var iterator sdk.Iterator
	if reverse {
		iterator = storeIterator.KVStoreReversePrefixIteratorPaginated(k.GetStore(ctx), []byte(types.AggValueStorePrefix + prefix), page, limit)
	} else {
		iterator = storeIterator.KVStorePrefixIteratorPaginated(k.GetStore(ctx), []byte(types.AggValueStorePrefix + prefix), page, limit)
	}
	defer iterator.Close()
	values := make([]types.AggregatorValue, 0)

	for ; iterator.Valid(); iterator.Next() {
		if ctx.GasMeter().IsPastLimit() {
			break
		}

		var v types.AggregatorValue
		value := iterator.Value()
		k.cdc.MustUnmarshalBinaryBare(value, &v)
		values = append(values, v)
	}
	return values
}


type HistoryResult struct {
	Batch string
	Value sdk.Dec
}

func (k Keeper) GetPairValuesHistory(ctx sdk.Context, startBatch string, endBatch string, step int64, symbol string, inSymbol string) []HistoryResult {
	store := k.GetStore(ctx)
	var results []HistoryResult

	start := []byte(types.AggValueStorePrefix + startBatch)
	var end []byte
	if len(endBatch) == 0 {
		end = sdk.PrefixEndBytes([]byte(types.AggValueStorePrefix))
	} else {
		end = []byte(types.AggValueStorePrefix + endBatch)
	}

	iterator := store.Iterator(start, end)
	currentStep := int64(0)

	for ; iterator.Valid(); iterator.Next() {
		bytes := iterator.Key()
		key := types.AggStoreKeyFromBytes(bytes)

		if key.Symbol == symbol && key.InSymbol == inSymbol {
			currentStep++
			if currentStep >=  step {
				currentStep = 0
				var aggValue types.AggregatorValue
				k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &aggValue)
				results = append(results, HistoryResult{Batch: aggValue.Batch, Value: aggValue.Value})
			}
		}
		if len(results) > 99 {
			break
		}
	}
	return results
}

func (k Keeper) DumpAggValues(ctx sdk.Context) map[string]types.AggregatorValue {
	iterator := sdk.KVStorePrefixIterator(k.GetStore(ctx), []byte(types.AggValueStorePrefix))
	results := make(map[string]types.AggregatorValue)
	for ; iterator.Valid(); iterator.Next() {
		var value types.AggregatorValue
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &value)
		results[string(iterator.Key())] = value
	}
	return results
}

func (k Keeper) DumpQueueItems(ctx sdk.Context) map[string]types.AggregatorQueueItem {
	iterator := sdk.KVStorePrefixIterator(k.GetStore(ctx), []byte(types.QueueStorePrefix))
	results := make(map[string]types.AggregatorQueueItem)
	for ; iterator.Valid(); iterator.Next() {
		var value types.AggregatorQueueItem
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &value)
		results[string(iterator.Key())] = value
	}
	return results
}
