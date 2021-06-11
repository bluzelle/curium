package synchronizer

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/synchronizer/contract/binance"
	"github.com/bluzelle/curium/x/synchronizer/keeper"
	"github.com/bluzelle/curium/x/synchronizer/types"
	votingtypes "github.com/bluzelle/curium/x/voting/types"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	eth "github.com/ethereum/go-ethereum/ethclient"
	"math/big"
	"os"
	"sync"
	"time"
)

type Network struct {
	Contract  string
	Endpoints []string
}

var networks = map[string]Network{
	"binance": {
		Contract:  "0xE8eE8e2D82A3966e0353CB11Ab6fcfE6F5b5C9dC",
		Endpoints: []string{"https://data-seed-prebsc-1-s1.binance.org:8545"},
	},
	"ethereum": {
		Contract:  "0xBf9d90fE45e0B3069ee4546e878eCcb2b37AF659",
		Endpoints: []string{"https://ropsten.infura.io/v3/bf3a81b958df4776bb0c7e49a11ecbed"},
	},
	"polygon": {
		Contract:  "0x266699A193F68CFD213B995604418740d6278dC4",
		Endpoints: []string{"https://rpc-mumbai.matic.today"},
	},
	"fantom": {
		Contract:  "0xb6fd9f0F6760c4d4ACE488d094E27F5DeDaa6eCC",
		Endpoints: []string{"https://rpc.testnet.fantom.network"},
	},
	"tomochain": {
		Contract:  "0xE2603e3a2C8dF20324e7277c1320Ab7EBb8ee7c2",
		Endpoints: []string{"https://rpc.testnet.tomochain.com"},
	},
}

var doOnce sync.Once
var currCtx sdk.Context
var ticker = time.NewTicker(time.Second * 60)

func StartSynchronizer(ctx sdk.Context, k keeper.Keeper) {
	k.VotingKeeper.RegisterVoteHandler(keeper.NewVoteHandler(k))
	currCtx = ctx
	doOnce.Do(func() {
		go func() {
			for {
				now := time.Now()
				waitTime := now.Truncate(time.Minute).Add(time.Minute).Sub(now)
				c := time.After(waitTime)
				<-c
				runSynchronizer(&k)
			}
		}()
	})
}

func runSynchronizer(k *keeper.Keeper) {
	for name, network := range networks {
		data := fetchDataFromContract(k, name, network)
		creator, err := getSyncUserAddress(k)

		for _, item := range data {
			value := types.SyncOperation{
				Op:       item.Opt,
				Uuid:     name + "-" + item.Uuid,
				Key:      item.Key,
				Value:    []byte(item.Value),
				Bookmark: item.Bookmark.Uint64(),
				Creator:  creator,
			}
			if err != nil {
				k.Logger(currCtx).Error("Unable to retrieve user from keyring", "name", "sync", "error", err)
			}
			k.VotingKeeper.Vote(currCtx, votingtypes.VotingRequest{
				Id:       fmt.Sprintf("%s-%d", name, item.Bookmark.Uint64()),
				VoteType: types.ModuleName,
				Creator:  creator,
				Value:    k.GetCdc().MustMarshalBinaryBare(&value),
				From:     "sync",
			})
		}
	}
}

func fetchDataFromContract(k *keeper.Keeper, name string, network Network) []binance.BluzelleAdapterTransaction {
	ethCtx := context.Background()
	backend, err := eth.Dial(network.Endpoints[0])
	if err != nil {
		fmt.Println(err)
	}

	addr := common.HexToAddress(network.Contract)
	ctr, err := binance.NewBluzelleAdapter(addr, backend)
	if err != nil {
		fmt.Println(err)
	}

	var data []binance.BluzelleAdapterTransaction
	MAX_LOOPS := 1
	for i := 0; i < MAX_LOOPS; i++ {
		callOpts := &bind.CallOpts{Context: ethCtx, Pending: false}
		start, err := readBookmark(k.KeyringDir, name)
		if err != nil {
			start = big.NewInt(0)
		}

		d, err := ctr.GetSynchronizerData(callOpts, start, big.NewInt(20))
		data = append(data, d...)
		k.Logger(currCtx).Info("sync start", "network", name, "start", start)
		end := start.Add(start, big.NewInt(int64(len(d))))
		saveBookmark(k.KeyringDir, name, end)
		k.Logger(currCtx).Info("sync end", "network", name, "end", end)
		k.Logger(currCtx).Info("sync data", "network", name, "data", data)
	}

	return data
}

func getSyncUserAddress(k *keeper.Keeper) (string, error) {
	kr, err := keyring.New("curium", keyring.BackendTest, k.GetKeyringDir(), nil)

	if err != nil {
		return "", err
	}
	key, err := kr.Key("sync")
	if err != nil {
		return "", err
	}

	return key.GetAddress().String(), nil
}

// TODO: Lets just dump the bookmark into a file for now, but later we need to
// incorporate this into the voting.

func saveBookmark(dir string, name string, data *big.Int) error {
	err := os.MkdirAll(dir+"/synchronizer", 0755)
	if err != nil {
		return err
	}
	err = os.WriteFile(dir+"/synchronizer/"+name+"-sync-bookmark", data.Bytes(), 0644)
	return err
}

func readBookmark(dir string, name string) (*big.Int, error) {
	data, err := os.ReadFile(dir + "/synchronizer/" + name + "-sync-bookmark")
	if err != nil {
		return nil, err
	}
	return big.NewInt(0).SetBytes(data), nil
}
