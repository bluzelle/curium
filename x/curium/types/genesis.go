package types

type GenesisState struct {
}

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesisState returns the default Capability genesis state
func DefaultGenesisState() *GenesisState {
	return &GenesisState{
	}
}

// ValidateGenesis performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) ValidateGenesis() error {

	return nil
}
