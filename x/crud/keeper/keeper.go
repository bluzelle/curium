package keeper

import (
	"fmt"
	"strconv"

	"github.com/tendermint/tendermint/libs/log"

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
		leaseKey sdk.StoreKey
		mks MaxKeeperSizes
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
	storeKey,
	memKey sdk.StoreKey,
	leaseKey sdk.StoreKey,
	mks MaxKeeperSizes,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
		memKey:   memKey,
		leaseKey: leaseKey,
		mks: mks,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetKVStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.storeKey)
}

func (k Keeper) GetLeaseStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.leaseKey)
}

func (k Keeper) SetLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, leaseBlocks int64) {
	if leaseBlocks == 0 {
		leaseBlocks = k.mks.MaxDefaultLeaseBlocks
	}

	leaseStore.Set(MakeLeaseKey(blockHeight+leaseBlocks, UUID, key), make([]byte, 0))
}

func (k Keeper) DeleteLease(leaseStore sdk.KVStore, UUID string, key string, blockHeight int64, leaseBlocks int64) {
	leaseStore.Delete([]byte(MakeLeaseKey(blockHeight+leaseBlocks, UUID, key)))
}

func (k Keeper) ProcessLeasesAtBlockHeight(ctx sdk.Context, store sdk.KVStore, leaseStore sdk.KVStore, lease int64) {
	prefix := strconv.FormatInt(lease, 10) + "\x00"
	iterator := sdk.KVStorePrefixIterator(leaseStore, []byte(prefix))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {

		// Delete from owner index
		//parts := bytes.Split(iterator.Key()[len(prefix):], []byte("\x00"))
		//uuid := string(parts[0])
		//key := string(parts[1])

		//k.DeleteOwner(store, ownerStore, uuid, key)


		// Delete lease
		fmt.Printf("\n\tdeleting %s, %s\n", prefix, string(iterator.Key()))
		store.Delete(iterator.Key()[len(prefix):])
		leaseStore.Delete(iterator.Key())
	}
}