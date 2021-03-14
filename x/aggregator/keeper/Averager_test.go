package keeper_test

import (
	"github.com/bluzelle/curium/x/aggregator/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestAverager(t *testing.T) {
	t.Run("It should provide an average", func(t *testing.T) {
		x := keeper.NewAverager()
		x.Add(sdk.NewDec(10), 100)
		x.Add(sdk.NewDec(20), 100)
		x.Add(sdk.NewDec(30), 100)
		assert.True(t, x.CalculateAverage().Equal(sdk.NewDec(20)))
	})
}
