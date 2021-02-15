package types

const (
	// ModuleName is the name of the module
	ModuleName = "aggregator"

	// StoreKey to be used when creating the KVStore
	ValueQueueStoreKey = "ValueQueue"
	AggValueStoreKey = "AggValue"

	// RouterKey to be used for routing msgs
	RouterKey = ModuleName

	// QuerierRoute to be used for querier msgs
	QuerierRoute = ModuleName
)
