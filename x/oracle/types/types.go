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
	Value types.Dec
	Valcons string
	Owner types.AccAddress
	Weight types.Dec
	Height int64
}

type SourceValue struct {
	SourceName string
	Batch string
	Value types.Dec
	Owner types.AccAddress
	Height int64
}

type OracleConfig struct {
	UserAddress types.AccAddress
	UserMnemonic string
}

type ValueUpdateListener func(sdk.Context, SourceValue)
