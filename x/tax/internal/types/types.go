package types

import sdk "github.com/cosmos/cosmos-sdk/types"

// TaxInfo is struct for tax querying
type TaxInfo struct {
	Collector sdk.AccAddress
	FeeBp     int64
	TrfBp     int64
}
