package types

const (
	// ModuleName defines the module name
	ModuleName = "crud"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_capability"

	// this line is used by starport scaffolding # ibc/keys/name
)

// this line is used by starport scaffolding # ibc/keys/port

func KeyPrefix(p string) []byte {
	return []byte(p)
}

func UuidPrefix(p string, uuid string) []byte {
	return append(KeyPrefix(p), []byte(uuid)...)
}

func OwnerPrefix(p string, owner string) []byte {
	return append(KeyPrefix(p), []byte(owner)...)
}

const (
	CrudValueKey  = "CrudValue-value-"
	LeaseValueKey = "LeaseValue-value-"
	OwnerValueKey = "OwnerValue-value-"
)
