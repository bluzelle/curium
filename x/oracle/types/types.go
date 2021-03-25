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
	Weight  int64
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
	Height int64
	Count int64
	Weight int64
}

type LocalOracleConfig struct {
	UserAddress types.AccAddress
	UserMnemonic string
}

type ValueUpdateListener func(sdk.Context, SourceValue)
