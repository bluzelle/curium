package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
)

type GenesisConfig struct {
	AdminAddress sdk.AccAddress
}

// GenesisState - all oracle state that must be provided at genesis
type GenesisState struct {
	Config GenesisConfig
}

// NewGenesisState creates a new GenesisState object
func NewGenesisState() GenesisState {
	return GenesisState{
		GenesisConfig{},
	}
}

// DefaultGenesisState - default GenesisState used by Cosmos Hub
func DefaultGenesisState() GenesisState {
	return GenesisState{
		GenesisConfig{},
	}
}

// ValidateGenesis validates the oracle genesis parameters
func ValidateGenesis(data GenesisState) error {
	if data.Config.AdminAddress == nil {
		return errors.New("oracle", 1, "Genesis missing oracle admin address")
	}
	return nil
}
