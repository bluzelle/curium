package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/app/ante/gasmeter"
	"github.com/bluzelle/curium/x/tax/internal/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authTypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	govTypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/tendermint/tendermint/libs/log"
)

// IKeeper interface for this keeper
type IKeeper interface {
	GetCodec() *codec.Codec
	SetCollector(ctx sdk.Context, collector sdk.AccAddress)
	SetFeeBp(ctx sdk.Context, bp int64)
	SetTransferBp(ctx sdk.Context, bp int64)
	GetCollector(ctx sdk.Context) sdk.AccAddress
	GetFeeBp(ctx sdk.Context) int64
	GetTransferBp(ctx sdk.Context) int64
	GetTaxInfo(ctx sdk.Context) types.TaxInfo
}

// constants
var (
	KeyCollector  = []byte("collector")
	KeyFeeBp      = []byte("fee_bp")
	KeyTransferBp = []byte("transfer_bp")
)

// Keeper manage storage for this module
type Keeper struct {
	storeKey     sdk.StoreKey
	cdc          *codec.Codec
	supplyKeeper govTypes.SupplyKeeper
}

// NewKeeper returns new instance of Keeper
func NewKeeper(storeKey sdk.StoreKey, cdc *codec.Codec, supplyKeeper govTypes.SupplyKeeper) Keeper {
	return Keeper{
		storeKey:     storeKey,
		cdc:          cdc,
		supplyKeeper: supplyKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
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

// SetFeeBp set fee basis point
func (k Keeper) SetFeeBp(ctx sdk.Context, bp int64) {
	store := k.GetKVStore(ctx)
	store.Set(KeyFeeBp, k.cdc.MustMarshalBinaryBare(bp))
}

// GetFeeBp returns fee basis point
func (k Keeper) GetFeeBp(ctx sdk.Context) int64 {
	store := k.GetKVStore(ctx)
	var bp int64
	bz := store.Get(KeyFeeBp)
	k.cdc.MustUnmarshalBinaryBare(bz, &bp)
	return bp
}

// SetTransferBp set fee basis point
func (k Keeper) SetTransferBp(ctx sdk.Context, bp int64) {
	store := k.GetKVStore(ctx)
	store.Set(KeyTransferBp, k.cdc.MustMarshalBinaryBare(bp))
}

// GetTransferBp returns fee basis point
func (k Keeper) GetTransferBp(ctx sdk.Context) int64 {
	store := k.GetKVStore(ctx)
	var bp int64
	bz := store.Get(KeyTransferBp)
	k.cdc.MustUnmarshalBinaryBare(bz, &bp)
	return bp
}

// GetTaxInfo return tax info in a struct
func (k Keeper) GetTaxInfo(ctx sdk.Context) types.TaxInfo {
	return types.TaxInfo{
		Collector:  k.GetCollector(ctx),
		FeeBp:      k.GetFeeBp(ctx),
		TransferBp: k.GetTransferBp(ctx),
	}
}

func (k Keeper) ChargeFeeTax(ctx sdk.Context, gasMeter sdk.GasMeter) error {
	gasFee := calculateGasFee(gasMeter)
	taxFees := sdk.NewCoins(sdk.NewInt64Coin("ubnt", gasFee.AmountOf("ubnt").Int64() * k.GetFeeBp(ctx) / 10000))

	if !taxFees.IsZero() {
		err := k.supplyKeeper.SendCoinsFromModuleToAccount(ctx, authTypes.FeeCollectorName, k.GetCollector(ctx), taxFees)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}
	}

	return nil
}

func calculateGasFee(gasMeter sdk.GasMeter) sdk.Coins {

	gasMeterInterface := gasMeter.(gasmeter.ChargingGasMeterInterface)
	gasPrice := gasMeterInterface.GetGasPrice().AmountOf("ubnt")
	gasConsumed := gasMeter.GasConsumed()

	gasFee := gasPrice.MulInt64(int64(gasConsumed)).RoundInt64()
	return sdk.NewCoins(sdk.NewCoin("ubnt", sdk.NewInt(gasFee)))

}