package types

import "fmt"

type GenesisState struct {
	NftList []*Nft
}

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesisState returns the default Capability genesis state
func DefaultGenesisState() *GenesisState {
	return &GenesisState{
		// this line is used by starport scaffolding # ibc/genesistype/default
		// this line is used by starport scaffolding # genesis/types/default
		NftList: []*Nft{},
	}
}

// ValidateGenesis performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) ValidateGenesis() error {

	// this line is used by starport scaffolding # genesis/types/validate
	// Check for duplicated ID in nft
	nftIdMap := make(map[string]bool)

	for _, elem := range gs.NftList {
		if _, ok := nftIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for nft")
		}
		nftIdMap[elem.Id] = true
	}

	return nil
}
