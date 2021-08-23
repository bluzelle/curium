package keeper

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestAccountInfo(t *testing.T) {
	t.Run("GetAccountInfo()", func(t *testing.T) {
		t.Run("should return the account info for a given key", func(t *testing.T) {
			info := NewAccountInfo()
			info.SetAcctInfo("scott", AccountInfoItem{
				Seq: 1,
				AccNum: 3,
			})
			assert.Equal(t, uint64(1), info.GetAcctInfo("scott").Seq)
			assert.Equal(t, uint64(3), info.GetAcctInfo("scott").AccNum)
		})

		t.Run("should return nil if no account exists", func(t *testing.T) {
			info := NewAccountInfo()
			assert.Nil(t, info.GetAcctInfo("fake"))
		})
	})

	t.Run("IncrementSeq()", func(t *testing.T) {
		t.Run("should increment the sequence number of an account", func(t *testing.T) {
			info := NewAccountInfo()
			info.SetAcctInfo("scott", AccountInfoItem{
				AccNum: 3,
				Seq:    1,
			})
			info.IncrementSeq("scott")
			assert.Equal(t, uint64(3), info.GetAcctInfo("scott").AccNum)
			assert.Equal(t, uint64(2), info.GetAcctInfo("scott").Seq)
		})
	})
}
