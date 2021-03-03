package types

// Query endpoints supported by the aggregator querier
const (
	QueryParams = "queryParams"
	QuerySearchValues = "searchValues"
)

type QueryReqSearchValues struct {
	Prefix string
}