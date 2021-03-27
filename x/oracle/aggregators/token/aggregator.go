package aggregators

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"strings"
)

var queueStoreKey = types.NewOracleStoreKey(0x10)

type TokenAggregator struct {
}

type AggregatorValue struct {
	Batch    string
	Symbol   string
	InSymbol string
	Value    sdk.Dec
	Count    int64
	Height   int64
}

type AggregatorQueueItem struct {
	SourceName string
	Batch      string
	Symbol     string
	InSymbol   string
	Value      sdk.Dec
	Height     int64
	Weight     int64
}

func NewTokenAggregator() TokenAggregator {
	return TokenAggregator{}
}

func (ta TokenAggregator) SourceValueUpdated(ctx sdk.Context, value types.SourceValue, updateFn func(prefix []byte, key []byte, value interface{})) {
	parts := strings.Split(value.SourceName, "-")
	aggQueueItem := AggregatorQueueItem{
		Batch:      value.Batch,
		SourceName: value.SourceName,
		Symbol:     parts[1],
		InSymbol:   parts[3],
		Value:      value.Value,
		Height:     value.Height,
		Weight:     value.Weight,
	}

	blockStr := fmt.Sprintf("%020d", aggQueueItem.Height)
	key := queueStoreKey.MakeKey(blockStr, aggQueueItem.Batch, aggQueueItem.SourceName)
	updateFn(queueStoreKey.Prefix, key, aggQueueItem)
}
