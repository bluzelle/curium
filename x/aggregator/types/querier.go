package types

// Query endpoints supported by the aggregator querier
const (
	QueryParams             = "queryParams"
	QuerySearchValues       = "searchValues"
	QuerySearchBatchKeys    = "searchBatchKeys"
	QueryGetAggregatedValue = "getAggregatedValue"
	QueryGetPairValuesHistory = "getPairValuesHistory"
)

type QueryReqSearchValues struct {
	Prefix string
	Reverse bool
	Page uint
	Limit uint
}

type QueryReqGetAggregatorValue struct {
	Batch string
	Pair string
}

type QueryReqSearchBatches struct {
	PreviousBatch string
	Reverse bool
	Limit uint
}

type QueryReqGetPairValuesHistory struct {
	StartBatch string
	EndBatch string
	Step int64
	Symbol string
	InSymbol string
}