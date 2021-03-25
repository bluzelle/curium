package types

import "github.com/cosmos/cosmos-sdk/types"

type AggregatorValue struct {
	Batch    string
	Symbol   string
	InSymbol string
	Value    types.Dec
	Count    int64
	Height   int64
}

type AggregatorQueueItem struct {
	SourceName string
	Batch      string
	Symbol     string
	InSymbol   string
	Value      types.Dec
	Height     int64
	Weight     int64
}

