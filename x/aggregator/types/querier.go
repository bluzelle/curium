package types

// Query endpoints supported by the aggregator querier
const (
	QueryParams = "queryParams"
	QuerySearchValues = "searchValues"
	QuerySearchBatchKeys = "searchBatchKeys"
)

type QueryReqSearchValues struct {
	Prefix string
	Reverse bool
	Page uint
	Limit uint
}

type QueryReqSearchBatches struct {
	PreviousBatch string
	Reverse bool
	Limit uint
}