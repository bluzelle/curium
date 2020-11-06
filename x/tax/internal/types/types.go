package types

import sdk "github.com/cosmos/cosmos-sdk/types"

// TaxInfo is struct for tax querying
type TaxInfo struct {
	Collector sdk.AccAddress
	Bp        int64
}
