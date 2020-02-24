package crud

import (
	"github.com/bluzelle/curium/x/crud/internal/types"
	"testing"
)

func TestNewGenesisState(t *testing.T) {
	sut := NewGenesisState(nil)
	if len(sut.BlzValues) > 0 {
		t.Error("Expected empty BlzValues in new genesis state")
	}
}

func TestValidateGenesis(t *testing.T) {
	blzValues := []types.BLZValue{}

	genesisState := NewGenesisState(blzValues)

	err := ValidateGenesis(genesisState)

	if err != nil {
		t.Error("Expected nil error")
	}

	blzValues = append(blzValues, types.BLZValue{
		"test", []byte("notnilowner"),
	})

	err = ValidateGenesis(genesisState)

	if err != nil {
		t.Error("Expected error due to empty owner")
	}

	blzValues = append(blzValues, types.BLZValue{
		"test",
		nil,
	})

	err = ValidateGenesis(genesisState)

	if err != nil {
		t.Error("Expected error due to empty owner")
	}

}

func TestDefaultGenesisState(t *testing.T) {

}

func TestInitGenesis(t *testing.T) {

}

func TestExportGenesis(t *testing.T) {

}
