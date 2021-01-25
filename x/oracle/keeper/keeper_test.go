package keeper_test

import (
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/magiconair/properties/assert"
	"testing"
)

func TestGetCurrentBatchId(t *testing.T) {
	k := keeper.Keeper{}

	t.Run("It should return the current time without minutes", func(t *testing.T) {
		assert.Matches(t, k.GetCurrentBatchId(), `^[0-9]*-[0-9]*-[0-9]*-[0-9]*:[0-9]*$`)
	})

}