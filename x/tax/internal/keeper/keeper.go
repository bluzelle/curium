package keeper

import (
	"github.com/bluzelle/curium/x/tax/internal/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IKeeper interface for this keeper
type IKeeper interface {
	GetCodec() *codec.Codec
	SetCollector(ctx sdk.Context, collector sdk.AccAddress)
	SetPercentage(ctx sdk.Context, percentage int64)
	GetCollector(ctx sdk.Context) sdk.AccAddress
	GetPercentage(ctx sdk.Context) int64
	GetTaxInfo(ctx sdk.Context) types.TaxInfo
}

// constants
var (
	KeyCollector  = []byte("collector")
	KeyPercentage = []byte("percentage")
)

// Keeper manage storage for this module
type Keeper struct {
	storeKey sdk.StoreKey
	cdc      *codec.Codec
}

// NewKeeper returns new instance of Keeper
func NewKeeper(storeKey sdk.StoreKey, cdc *codec.Codec) Keeper {
	return Keeper{
		storeKey: storeKey,
		cdc:      cdc,
	}
}

// GetKVStore returns KVStore
func (k Keeper) GetKVStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.storeKey)
}

// GetCodec returns keeper codec
func (k Keeper) GetCodec() *codec.Codec {
	return k.cdc
}

// SetCollector set collector
func (k Keeper) SetCollector(ctx sdk.Context, collector sdk.AccAddress) {
	store := k.GetKVStore(ctx)
	store.Set(KeyCollector, k.cdc.MustMarshalBinaryBare(collector))
}

// GetCollector returns collector
func (k Keeper) GetCollector(ctx sdk.Context) sdk.AccAddress {
	store := k.GetKVStore(ctx)
	var collector sdk.AccAddress
	bz := store.Get(KeyCollector)
	k.cdc.MustUnmarshalBinaryBare(bz, &collector)
	return collector
}

// SetPercentage set collector
func (k Keeper) SetPercentage(ctx sdk.Context, percentage int64) {
	store := k.GetKVStore(ctx)
	store.Set(KeyPercentage, k.cdc.MustMarshalBinaryBare(percentage))
}

// GetPercentage returns collector
func (k Keeper) GetPercentage(ctx sdk.Context) int64 {
	store := k.GetKVStore(ctx)
	var percentage int64
	bz := store.Get(KeyPercentage)
	k.cdc.MustUnmarshalBinaryBare(bz, &percentage)
	return percentage
}

// GetTaxInfo return tax info in a struct
func (k Keeper) GetTaxInfo(ctx sdk.Context) types.TaxInfo {
	return types.TaxInfo{
		Collector:  k.GetCollector(ctx),
		Percentage: k.GetPercentage(ctx),
	}
}
