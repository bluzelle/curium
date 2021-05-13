package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/app/ante"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/tendermint/tendermint/libs/log"
	"strconv"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc      codec.Marshaler
		storeKey sdk.StoreKey
		memKey   sdk.StoreKey
		mks      MaxKeeperSizes
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

type MaxKeeperSizes struct {
	MaxKeysSize           uint64
	MaxKeyValuesSize      uint64
	MaxDefaultLeaseBlocks int64
}

func MakeCrudValueKey(uuid string, key string) []byte {
	return []byte(uuid + "\x00" + key)
}

func MakeLeaseKey(blockHeight int64, UUID string, key string) []byte {
	return []byte(strconv.FormatInt(blockHeight, 10) + "\x00" + UUID + "\x00" + key)
}

func NewKeeper(
	cdc codec.Marshaler,
	storeKey sdk.StoreKey,
	memKey sdk.StoreKey,
	mks MaxKeeperSizes,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
		memKey:   memKey,
		mks:      mks,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) SetLease(ctx *sdk.Context, UUID string, key string, blockHeight int64, lease *types.Lease) {

	leaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LeaseValueKey))
	leaseBlocks := k.ConvertLeaseToBlocks(lease)

	if leaseBlocks == 0 {
		leaseBlocks = k.mks.MaxDefaultLeaseBlocks
	}

	leaseStore.Set(MakeLeaseKey(blockHeight+leaseBlocks, UUID, key), make([]byte, 0))
}

func (k Keeper) ConvertLeaseToBlocks(lease *types.Lease) int64 {
	return int64(float64(lease.GetSeconds()+lease.GetMinutes()*60+lease.GetHours()*3600+lease.GetDays()*3600*24+lease.GetYears()*365*3600*24) / 5.5)
}

func (k Keeper) DeleteLease(ctx *sdk.Context, UUID string, key string, blockHeight int64, leaseBlocks int64) {
	leaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LeaseValueKey))
	leaseStore.Delete(MakeLeaseKey(blockHeight+leaseBlocks, UUID, key))
}

func (k Keeper) ProcessLeasesAtBlockHeight(ctx *sdk.Context, lease int64) {
	leasePrefix := []byte(strconv.FormatInt(lease, 10) + "\x00")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CrudValueKey))
	leaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LeaseValueKey))
	iterator := sdk.KVStorePrefixIterator(leaseStore, leasePrefix)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {

		// Delete from owner index
		//parts := bytes.Split(iterator.Key()[len(prefix):], []byte("\x00"))
		//uuid := string(parts[0])
		//key := string(parts[1])

		//k.DeleteOwner(store, ownerStore, uuid, key)

		// Delete lease
		fmt.Printf("\n\tdeleting %s, %s\n", leasePrefix, string(iterator.Key()))
		store.Delete(iterator.Key()[len(leasePrefix):])
		leaseStore.Delete(iterator.Key())
	}
}

func (k Keeper) UpdateLease(ctx *sdk.Context, UUID string, key string, lease *types.Lease) {

	blzValue := k.GetCrudValue(ctx, UUID, key)
	curLeaseBlocks := k.ConvertLeaseToBlocks(blzValue.Lease)

	k.DeleteLease(ctx, UUID, key, blzValue.Height, curLeaseBlocks)

	calculateLeaseRefund := func() uint64 {
		bytes := len(UUID) + len(key) + len(blzValue.Value)
		unusedOriginalLease := blzValue.Height + curLeaseBlocks - ctx.BlockHeight()

		if unusedOriginalLease <= 0 {
			return 0
		}

		percentUnused := float64(unusedOriginalLease) / float64(curLeaseBlocks)
		originalLeaseCost := CalculateGasForLease(blzValue.Lease, bytes)
		return uint64(float64(originalLeaseCost) * percentUnused)
	}

	// Charge for lease gas
	func() {
		gasForNewLease := CalculateGasForLease(blzValue.Lease, len(UUID)+len(key)+len(blzValue.Value))

		blzGasMeter := ctx.GasMeter().(ante.BluzelleGasMeterInterface)

		gasRefund := calculateLeaseRefund()
		if gasForNewLease > gasRefund {
			gasForLease := gasForNewLease - gasRefund
			//ctx.GasMeter().ConsumeGas(gasForLease, "lease")
			blzGasMeter.ConsumeBillableGas(gasForLease, "lease")
		}
	}()

	blzValue.Height = ctx.BlockHeight()
	//keeper.SetValue(ctx, keeper.GetKVStore(ctx), UUID, key, blzValue)
	k.SetLease(ctx, UUID, key, blzValue.Height, lease)
}
