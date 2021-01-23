package types

import "github.com/cosmos/cosmos-sdk/types"

type Source struct {
	Name     string `json:"name"`
	Url      string `json:"url"`
	Property string `json:"property"`
	Owner	types.AccAddress `json:"owner"`
}

type Vote struct {
	Name string
	Batch string
	Value float64
	ValidatorAddress string
}

