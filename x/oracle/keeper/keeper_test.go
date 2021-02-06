package keeper_test

import (
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/magiconair/properties/assert"
	"testing"
)

func TestGetCurrentBatchId(t *testing.T) {
	t.Run("It should return the current time without minutes", func(t *testing.T) {
		assert.Matches(t, keeper.GetCurrentBatchId(), `^[0-9]*-[0-9]*-[0-9]*-[0-9]*:[0-9]*$`)
	})
}

func TestCalculateProofSig(t *testing.T) {
	t.Run("It should return a sig for valcons and value", func(t *testing.T) {
		sig := keeper.CalculateProofSig("bluzellevalcons12345", "12345")
		assert.Equal(t, sig, "6d1fcd8cafcf00f1d704af6af0e1fa20e5432ce9c71d6e5da33c8b2f787c968a")
	})
}

