package types

import "github.com/cosmos/cosmos-sdk/types"

type Source struct {
	Name     string
	Url      string
	Property string
	Owner	types.AccAddress
}

type Vote struct {
	Name string
	Batch string
	Value float64
	ValidatorAddress string
}

