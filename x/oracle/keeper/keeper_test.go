package keeper_test

import (
	"github.com/bluzelle/curium/app"
	"github.com/bluzelle/curium/x/oracle/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/magiconair/properties/assert"
	"testing"
)

func getKeeper() keeper.Keeper {
	return keeper.NewKeeper(app.MakeCodec(), sdk.NewKVStoreKey("source"), nil)
}

func TestGetCurrentBatchId(t *testing.T) {
	t.Run("It should return the current time without minutes", func(t *testing.T) {
		assert.Matches(t, keeper.GetCurrentBatchId(), `^[0-9]*-[0-9]*-[0-9]*-[0-9]*:[0-9]*$`)
	})
}

func TestCalculateProofHash(t *testing.T) {
	t.Run("It should return a hash for valcons and value", func(t *testing.T) {
		hash := keeper.CalculateProofHash("bluzellevalcons12345", "12345")
		assert.Equal(t, hash, "6d1fcd8cafcf00f1d704af6af0e1fa20e5432ce9c71d6e5da33c8b2f787c968a")
	})
}

