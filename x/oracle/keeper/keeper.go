package keeper

import (
	"fmt"
	"github.com/tendermint/tendermint/libs/log"
	"strings"
	"time"

	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// Keeper of the oracle store
type Keeper struct {
	sourceStoreKey  sdk.StoreKey
	voteStoreKey    sdk.StoreKey
	cdc        *codec.Codec
	paramspace types.ParamSubspace
}

// NewKeeper creates a oracle keeper
func NewKeeper(cdc *codec.Codec, sourceStoreKey sdk.StoreKey, paramspace types.ParamSubspace) Keeper {
	keeper := Keeper{
		sourceStoreKey: sourceStoreKey,
		cdc:       cdc,
		//		paramspace: paramspace.WithKeyTable(types.ParamKeyTable()),
	}
	return keeper
}

func GetCurrentBatchId() string {
	t := time.Date(
		time.Now().Year(),
		time.Now().Month(),
		time.Now().Day(),
		time.Now().Hour(),
		time.Now().Minute(),
		0,
		0,
		time.UTC,
	).String()
	t = strings.Replace(t, ":00 +0000 UTC", "", 1)
	t = strings.Replace(t, " ", "-", -1)
	return t
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

