package keeper_test

import (
	bluzellechain "github.com/bluzelle/curium/types"
	"github.com/bluzelle/curium/x/aggregator/keeper"
	"github.com/bluzelle/curium/x/aggregator/types"
	"github.com/bluzelle/curium/x/oracle"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/server/mock"
	storeTypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"testing"
)

func getKeeper() (keeper.Keeper, sdk.AccAddress, sdk.Context) {
	ms := mock.NewCommitMultiStore()
	queueStoreKey := sdk.NewKVStoreKey(types.ValueQueueStoreKey)
	valueStoreKey := sdk.NewKVStoreKey(types.AggValueStoreKey)

	ms.MountStoreWithDB(queueStoreKey, storeTypes.StoreTypeDB, nil)
	ms.MountStoreWithDB(valueStoreKey, storeTypes.StoreTypeDB, nil)

	ctx := sdk.NewContext(ms, abci.Header{}, false, nil)
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(bluzellechain.Bech32PrefixAccAddr, bluzellechain.Bech32PrefixAccPub)
	config.SetBech32PrefixForValidator(bluzellechain.Bech32PrefixValAddr, bluzellechain.Bech32PrefixValPub)
	config.SetBech32PrefixForConsensusNode(bluzellechain.Bech32PrefixConsAddr, bluzellechain.Bech32PrefixConsPub)

	addr, _ := sdk.AccAddressFromBech32("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23")
 	keeper := keeper.NewKeeper(codec.New(), oracle.Keeper{}, queueStoreKey, valueStoreKey, nil)

	return keeper, addr, ctx
}


func Test_GetAggValueBatches(t *testing.T) {
	t.Run("It should set a default limit of 50", func(t *testing.T) {
		keeper, _, ctx := getKeeper()
		store := keeper.GetAggValueStore(ctx)

		for i := 0; i < 1000; i++ {
			store.Set([]byte(string(i % 100)+ ">testing"), make([]byte, 0))
		}

		// TODO: Finish here
		//batches := keeper.GetAggValueBatches(ctx, "", 10, true)
		//fmt.Println(batches)


	})
}