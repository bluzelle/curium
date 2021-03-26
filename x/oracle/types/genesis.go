package types

import (
	"github.com/cosmos/cosmos-sdk/types/errors"
)

// GenesisState - all oracle state that must be provided at genesis
type GenesisState struct {
	Config GlobalOracleConfig
	Sources map[string] Source
}

// NewGenesisState creates a new GenesisState object
func NewGenesisState(config GlobalOracleConfig, sources map[string] Source) GenesisState {
	return GenesisState{
		Config: config,
		Sources: sources,
	}
}

// DefaultGenesisState - default GenesisState used by Cosmos Hub
func DefaultGenesisState() GenesisState {
	return GenesisState{
		Config: GlobalOracleConfig{},
		Sources: map[string] Source{},
	}
}

// ValidateGenesis validates the oracle genesis parameters
func ValidateGenesis(data GenesisState) error {
	if data.Config.AdminAddress == nil {
		return errors.New("oracle", 1, "Genesis missing oracle admin address")
	}
	return nil
}
