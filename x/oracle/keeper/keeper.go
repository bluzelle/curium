package keeper

import (
	"fmt"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// Keeper of the oracle store
type Keeper struct {
	sourceKey   sdk.StoreKey
	cdc        *codec.Codec
	paramspace types.ParamSubspace
}

// NewKeeper creates a oracle keeper
func NewKeeper(cdc *codec.Codec, sourceKey sdk.StoreKey, paramspace types.ParamSubspace) Keeper {
	keeper := Keeper{
		sourceKey:   sourceKey,
		cdc:        cdc,
//		paramspace: paramspace.WithKeyTable(types.ParamKeyTable()),
	}
	return keeper
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// Get returns the pubkey from the adddress-pubkey relation
func (k Keeper) GetSourceStore(ctx sdk.Context) (sdk.KVStore) {
	return ctx.KVStore(k.sourceKey)
}

func (k Keeper) AddSource(ctx sdk.Context, name string, source types.Source) {
	store := k.GetSourceStore(ctx)
	store.Set([]byte(name), []byte(k.cdc.MustMarshalBinaryLengthPrefixed(source)))
}

func (k Keeper) GetSource(ctx sdk.Context, name string) (types.Source, error) {
	store := k.GetSourceStore(ctx)
	var source types.Source
	err := k.cdc.UnmarshalBinaryLengthPrefixed(store.Get([]byte(name)), &source)
	return source, err
}

func (k Keeper) DeleteSource(ctx sdk.Context, name string) error {
	store := k.GetSourceStore(ctx)
	store.Delete([]byte(name))
	return nil
}


func (k Keeper) ListSources(ctx sdk.Context) ([]types.Source, error) {
	store := k.GetSourceStore(ctx)
	iterator := store.Iterator(nil, nil)
	defer iterator.Close()
	var sources = make([]types.Source, 0)
	for ; iterator.Valid(); iterator.Next() {
		var source types.Source
		value := iterator.Value()
		k.cdc.UnmarshalBinaryLengthPrefixed(value, &source)
		sources = append(sources, source)
	}
	return sources, nil
}

