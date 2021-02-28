package types

const (
	// ModuleName is the name of the module
	ModuleName = "oracle"

	// StoreKey to be used when creating the KVStore
	SourceStoreKey = ModuleName + "Source"
	ProofStoreKey = ModuleName + "Proofs"
	VoteStoreKey = ModuleName + "Votes"
	ValueStoreKey = ModuleName + "Values"
	ConfigStoreKey = ModuleName + "Config"

	// RouterKey to be used for routing msgs
	RouterKey = ModuleName

	// QuerierRoute to be used for querier msgs
	QuerierRoute = ModuleName
)
