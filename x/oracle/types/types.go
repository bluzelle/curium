package types

import (
	"github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
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
	Value string
	Valcons string
	Owner types.AccAddress
	Weight sdk.Dec
}

