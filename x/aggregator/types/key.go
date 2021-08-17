package types

import (
	"fmt"
	"strconv"
	"strings"
)

const (
	// ModuleName is the name of the module
	ModuleName = "aggregator"

	// StoreKey to be used when creating the KVStore
	StoreKey = ModuleName

	// RouterKey to be used for routing msgs
	RouterKey = ModuleName

	// QuerierRoute to be used for querier msgs
	QuerierRoute = ModuleName

	// Store prefixes for various records
	AggValueStorePrefix = "V"
	QueueStorePrefix = "Q"


)

type QueueItemKey struct {
	Height     int64
	Batch      string
	SourceName string
}

func (qik QueueItemKey) Bytes() []byte {
	blockStr := fmt.Sprintf("%020d", qik.Height)
	return []byte(QueueStorePrefix + blockStr + ">" + qik.Batch + ">" + qik.SourceName)
}

func QueueItemKeyFromBytes(bytes []byte) QueueItemKey {
	parts := strings.Split(string(bytes[1:]), ">")
	height, _ := strconv.ParseInt(parts[0], 10, 64)
	return QueueItemKey{
		Height: height,
		Batch: parts[1],
		SourceName: parts[2],
	}
}

type AggStoreKey struct {
	Batch    string
	Symbol   string
	InSymbol string
}

func (ask AggStoreKey) Bytes() []byte {
	return []byte(AggValueStorePrefix + ask.Batch + ">" + ask.Symbol + "-" + ask.InSymbol)
}

func AggStoreKeyFromBytes(bytes []byte) AggStoreKey {
	parts := strings.Split(string(bytes[1:]), ">")
	symbolParts := strings.Split(parts[1], "-")
	return AggStoreKey{
		Batch: parts[0],
		Symbol: symbolParts[0],
		InSymbol: symbolParts[1],
	}
}


