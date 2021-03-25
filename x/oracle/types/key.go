package types




const (
	// ModuleName is the name of the module
	ModuleName = "oracle"

	// StoreKey to be used when creating the KVStore
	StoreKey = ModuleName

	// RouterKey to be used for routing msgs
	RouterKey = ModuleName

	// QuerierRoute to be used for querier msgs
	QuerierRoute = ModuleName

	// Store prefixes
	SourceStorePrefix = "SO"
	ProofStorePrefix  = "PR"
	VoteStorePrefix   = "VO"
	ValueStorePrefix  = "VA"
	ConfigStorePrefix = "CO"
)
