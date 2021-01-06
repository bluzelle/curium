package types

import "github.com/cosmos/cosmos-sdk/types"

type Source struct {
	Name     string
	Url      string `json:"url"`
	Property string `json:"property"`
	Owner	types.AccAddress
}

