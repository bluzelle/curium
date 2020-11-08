package tax

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestNewGenesisState(t *testing.T) {
	newGenesis := NewGenesisState()
	require.True(t, newGenesis.Collector.Empty())
	require.True(t, newGenesis.FeeBp == 0)
	require.True(t, newGenesis.TrfBp == 0)
}

func TestValidateGenesis(t *testing.T) {
	genesis := GenesisState{
		FeeBp: 100, // 1.00%
	}
	require.Error(t, ValidateGenesis(genesis))
}

func TestInitGenesis(t *testing.T) {
}
