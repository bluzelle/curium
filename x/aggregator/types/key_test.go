package types_test

import (
	"github.com/bluzelle/curium/x/aggregator/types"
	"github.com/magiconair/properties/assert"
	"testing"
)

func Test_QueueItemKey(t *testing.T) {
	t.Run("it should serialize and deserialize to bytes", func(t *testing.T) {
		bytes := types.QueueItemKey{
			Height:     100,
			Batch:      "2021-03-22-08:13",
			SourceName: "something-blz-in-usdt",
		}.Bytes()

		key := types.QueueItemKeyFromBytes(bytes)
		assert.Equal(t, key.Height, int64(100))
		assert.Equal(t, key.Batch,  "2021-03-22-08:13")
		assert.Equal(t, key.SourceName, "something-blz-in-usdt")
	})
}

func Test_AggStoreKey(t *testing.T) {
	bytes := types.AggStoreKey{
		Batch:    "2021-03-22-08:13",
		Symbol:   "blz",
		InSymbol: "btc",
	}.Bytes()

	key := types.AggStoreKeyFromBytes(bytes)
	assert.Equal(t, key.Batch, "2021-03-22-08:13")
	assert.Equal(t, key.Symbol, "blz")
	assert.Equal(t, key.InSymbol, "btc")
}

