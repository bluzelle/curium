package types

import "strings"

const (
	// ModuleName is the name of the module
	ModuleName = "oracle"

	// StoreKey to be used when creating the KVStore
	StoreKey = ModuleName

	// RouterKey to be used for routing msgs
	RouterKey = ModuleName

	// QuerierRoute to be used for querier msgs
	QuerierRoute = ModuleName

)

// Oracle store keys
var (
	SourceStoreKey = NewOracleStoreKey(0x01)
	ProofStoreKey  = NewOracleStoreKey(0x02)
	VoteStoreKey   = NewOracleStoreKey(0x03)
	ValueStoreKey  = NewOracleStoreKey(0x04)
	ConfigStoreKey = NewOracleStoreKey(0x05)
)

type OracleStoreKey struct {
	Prefix []byte
}

func NewOracleStoreKey(prefix uint8) OracleStoreKey {
	return OracleStoreKey{
		Prefix: []byte{prefix},
	}
}

func (sk OracleStoreKey) MakeKey(s ...string) []byte {
	return append(sk.Prefix, []byte(strings.Join(s, ">"))...)
}

