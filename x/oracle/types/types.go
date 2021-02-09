package types

import (
	"github.com/cosmos/cosmos-sdk/types"
)


type Source struct {
	Name     string
	Url      string
	Property string
	Owner	types.AccAddress
}

type Vote struct {
	SourceName string
	Batch string
	Value types.Dec
	Valcons string
	Owner types.AccAddress
	Weight types.Dec
}

type SourceValue struct {
	SourceName string
	Batch string
	Value types.Dec
	Owner types.AccAddress
}
