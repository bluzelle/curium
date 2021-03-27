package keeper

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) StoreAggregatorValue(ctx sdk.Context, key []byte, value []byte) error {
	// TODO: finish here
	fmt.Println(ctx, key, value)
	return nil
}