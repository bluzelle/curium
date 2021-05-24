package keeper

import (
	"bytes"
	"fmt"
	curiumkeeper "github.com/bluzelle/curium/x/curium/keeper"
	"github.com/cosmos/cosmos-sdk/types/query"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tendermint/tendermint/libs/log"
	"sort"
	"strconv"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc      codec.Marshaler
		curiumKeeper curiumkeeper.Keeper
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
	curiumKeeper curiumkeeper.Keeper,
	storeKey sdk.StoreKey,
	memKey sdk.StoreKey,
	mks MaxKeeperSizes,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		cdc:      cdc,
		curiumKeeper: curiumKeeper,
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

func (k Keeper) GetRemainingLeaseBlocks(ctx *sdk.Context, uuid string, key string) int64 {
	crudValue := k.GetCrudValue(ctx, uuid, key)

	return k.ConvertLeaseToBlocks(crudValue.Lease) + crudValue.Height - ctx.BlockHeight()
}

func (k Keeper) GetNShortestLeaseBlocks(ctx *sdk.Context, owner string, uuid string, num uint32) ([]*types.KeyLease, error) {

	keys, _ := k.GetKeysUnderUuid(ctx, uuid)

	var keyLeases []*types.KeyLease

	for i := range keys {

		remainingBlocks := k.GetRemainingLeaseBlocks(ctx, uuid, keys[i])

		curKeyLease := &types.KeyLease{
			Key:         keys[i],
			LeaseBlocks: remainingBlocks,
		}

		keyLeases = append(keyLeases, curKeyLease)
	}

	sort.Sort(types.KeyLeasesSortable(keyLeases))

	if len(keyLeases) < int(num) {
		return keyLeases, nil
	}
	return keyLeases[:num], nil
}

func (k Keeper) QueryNShortestLeaseBlocks (ctx *sdk.Context, owner string, uuid string, num uint32) ([]*types.KeyLease, error) {

	keys, _ := k.GetKeysUnderUuid(ctx, uuid)

	var keyLeases []*types.KeyLease

	for i := range keys {

		remainingBlocks := k.GetRemainingLeaseBlocks(ctx, uuid, keys[i])

		curKeyLease := &types.KeyLease{
			Key:         keys[i],
			LeaseBlocks: remainingBlocks,
		}

		keyLeases = append(keyLeases, curKeyLease)
	}

	sort.Sort(types.KeyLeasesSortable(keyLeases))

	if len(keyLeases) < int(num) {
		return keyLeases, nil
	}
	return keyLeases[:num], nil
}

func (k Keeper) DeleteLease(ctx *sdk.Context, uuid string, key string) {
	leaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LeaseValueKey))

	crudValue := k.GetCrudValue(ctx, uuid, key)

	expiryBlock := crudValue.Height + k.ConvertLeaseToBlocks(crudValue.Lease)

	leaseStore.Delete(MakeLeaseKey(expiryBlock, uuid, key))
}

func (k Keeper) ProcessLeasesAtBlockHeight(ctx *sdk.Context, lease int64) {
	leasePrefix := []byte(strconv.FormatInt(lease, 10) + "\x00")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CrudValueKey))
	leaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LeaseValueKey))
	iterator := sdk.KVStorePrefixIterator(leaseStore, leasePrefix)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {

		// Delete from owner index
		parts := bytes.Split(iterator.Key()[len(leasePrefix):], []byte("\x00"))
		uuid := string(parts[0])
		key := string(parts[1])

		owner := k.GetOwner(ctx, uuid, key)

		k.DeleteOwner(ctx, owner, uuid, key)

		// Delete lease
		fmt.Printf("\n\tdeleting %s, %s\n", leasePrefix, string(iterator.Key()))
		store.Delete(iterator.Key()[len(leasePrefix):])
		leaseStore.Delete(iterator.Key())
	}
}

func (k Keeper) UpdateLease(ctx *sdk.Context, crudValue *types.CrudValue) {

	//curLeaseBlocks := k.ConvertLeaseToBlocks(crudValue.Lease)

	k.DeleteLease(ctx, crudValue.Uuid, crudValue.Key)

	//calculateLeaseRefund := func() uint64 {
	//	bytes := len(crudValue.Uuid) + len(crudValue.Key) + len(crudValue.Value)
	//	unusedOriginalLease := crudValue.Height + curLeaseBlocks - ctx.BlockHeight()
	//
	//	if unusedOriginalLease <= 0 {
	//		return 0
	//	}
	//
	//	percentUnused := float64(unusedOriginalLease) / float64(curLeaseBlocks)
	//	originalLeaseCost := CalculateGasForLease(crudValue.Lease, bytes)
	//	return uint64(float64(originalLeaseCost) * percentUnused)
	//}
	//
	//// Charge for lease gas
	//func() {
	//	gasForNewLease := CalculateGasForLease(crudValue.Lease, len(crudValue.Uuid)+len(crudValue.Key)+len(crudValue.Value))
	//
	//	blzGasMeter := ctx.GasMeter().(ante.BluzelleGasMeterInterface)
	//
	//	gasRefund := calculateLeaseRefund()
	//	if gasForNewLease > gasRefund {
	//		gasForLease := gasForNewLease - gasRefund
	//		//ctx.GasMeter().ConsumeGas(gasForLease, "lease")
	//		blzGasMeter.ConsumeBillableGas(gasForLease, "lease")
	//	}
	//}()

	crudValue.Height = ctx.BlockHeight()
	//keeper.SetValue(ctx, keeper.GetKVStore(ctx), UUID, key, blzValue)
	k.SetLease(ctx, crudValue.Uuid, crudValue.Key, crudValue.Height, crudValue.Lease)
}

func NewLease(
	Seconds uint32,
	Minutes uint32,
	Hours uint32,
	Days uint32,
	Years uint32,
) *types.Lease {
	return &types.Lease{
		Seconds: Seconds,
		Minutes: Minutes,
		Hours:   Hours,
		Days:    Days,
		Years:   Years,
	}
}

func (k Keeper) Paginate(
	prefixStore sdk.KVStore,
	pageRequest *types.PagingRequest,
	onResult func(key []byte, value []byte) error,
) (*types.PagingResponse, error) {
	if pageRequest == nil {
		pageRequest = &types.PagingRequest{
			StartKey: "",
			Limit:    0,
		}
	}
	wrappedPageRequest := query.PageRequest{
		Key:        []byte(pageRequest.StartKey),
		Offset:     0,
		Limit:      pageRequest.Limit,
		CountTotal: false,
	}
	response, err := query.Paginate(prefixStore, &wrappedPageRequest, onResult)

	if err != nil {
		return nil, err
	}

	return &types.PagingResponse{
		NextKey: string(response.NextKey),
		Total:   response.Total,
	}, nil

}
