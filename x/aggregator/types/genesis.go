package types

// GenesisState - all aggregator state that must be provided at genesis
type GenesisState struct {
	AggValues map[string]AggregatorValue
	QueueValues map[string]AggregatorQueueItem
}

// NewGenesisState creates a new GenesisState object
func NewGenesisState(aggValues map[string]AggregatorValue, queueValues map[string]AggregatorQueueItem) GenesisState {
	return GenesisState{
		AggValues: aggValues,
		QueueValues: queueValues,
	}
}

// DefaultGenesisState - default GenesisState used by Cosmos Hub
func DefaultGenesisState() GenesisState {
	return GenesisState{
		// TODO: Fill out according to your genesis state, these values will be initialized but empty
	}
}

// ValidateGenesis validates the aggregator genesis parameters
func ValidateGenesis(data GenesisState) error {
	// TODO: Create a sanity check to make sure the state conforms to the modules needs
	return nil
}
