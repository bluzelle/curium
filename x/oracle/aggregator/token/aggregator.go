package aggregator

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
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

func NewTokenAggregator() TokenAggregator {
	return TokenAggregator{}
}

func (ta TokenAggregator) AggregateSourceValues(ctx sdk.Context, store sdk.KVStore, values []types.SourceValue) {
	fmt.Println("FINISH HERE!!!!")
	//for _, value := range(values) {
	//	parts := strings.Split(value.SourceName, "-")

		//blockStr := fmt.Sprintf("%020d", aggQueueItem.Height)
		//key := queueStoreKey.MakeKey(blockStr, aggQueueItem.Batch, aggQueueItem.SourceName)
//		updateFn(queueStoreKey.Prefix, key, aggQueueItem)
//	}
}
