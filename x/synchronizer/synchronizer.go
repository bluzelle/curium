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

//const CONTRACT_ADDRESS = "0x4Fe0D5763cF500454E2b105f6AE8b9b66Ea4dD64"
//const CONTRACT_ADDRESS = "0x55866CCc07b810d004c67B029BB5bc4b445D0201"
//const CONTRACT_ADDRESS = "0xe6C18bFB430743C98920244a25cd64EeC584326C"
//const CONTRACT_ADDRESS = "0x2a811c36C1fA9e071146e2A231c620e30EbF1Fd9"
//const CONTRACT_ADDRESS = "0x001e89c476c717484dB772C56b9B36E37EF2795c"
const CONTRACT_ADDRESS = "0xA2102C0a071917E2CaF6588AF95838b0DBb669Cd"

var doOnce sync.Once
var currCtx sdk.Context
var ticker = time.NewTicker(time.Second * 15)

func StartSynchronizer(ctx sdk.Context, k keeper.Keeper) {
	k.VotingKeeper.RegisterVoteHandler(keeper.NewVoteHandler(k))
	currCtx = ctx
	doOnce.Do(func() {
		go func() {
			for {
				_ = <-ticker.C
				runSynchronizer(k)
			}
		}()
	})
}

func runSynchronizer(k keeper.Keeper) {
	sources := k.GetAllSource(currCtx)

	for _, source := range sources {
		data := fetchDataFromContract(k, source)
		creator, err := getSyncUserAddress(k)

		for _, item := range data {
			value := types.SyncOperation{
				Op:       item.Opt,
				Uuid:     "binance-" + item.Uuid,
				Key:      item.Key,
				Value:    []byte(item.Value),
				Bookmark: item.Bookmark.Uint64(),
				Creator:  creator,
			}
			if err != nil {
				k.Logger(currCtx).Error("Unable to retrieve user from keyring", "name", "sync", "error", err)
			}
			k.VotingKeeper.Vote(currCtx, votingtypes.VotingRequest{
				Id:       item.Bookmark.Uint64(),
				VoteType: types.ModuleName,
				Creator:  creator,
				Value:    k.GetCdc().MustMarshalBinaryBare(&value),
				From:     "sync",
			})
		}
	}
}

func fetchDataFromContract(k keeper.Keeper, source types.Source) []binance.BluzelleAdapterTransaction {
	ethCtx := context.Background()
	backend, err := eth.Dial(source.Url)
	if err != nil {
		fmt.Println(err)
	}

	addr := common.HexToAddress(CONTRACT_ADDRESS)
	ctr, err := binance.NewBluzelleAdapter(addr, backend)
	if err != nil {
		fmt.Println(err)
	}

	var data []binance.BluzelleAdapterTransaction
	MAX_LOOPS := 1
	for i := 0; i < MAX_LOOPS; i++ {
		callOpts := &bind.CallOpts{Context: ethCtx, Pending: false}
		start, err := readBookmark(k.KeyringDir)
		if err != nil {
			start = big.NewInt(0)
		}

		d, err := ctr.GetSynchronizerData(callOpts, start, big.NewInt(20))
		data = append(data, d...)
		fmt.Println("******************* Synchronizer **************************************************")
		fmt.Println("***** start=", start)

		end := start.Add(start, big.NewInt(int64(len(d))))
		saveBookmark(k.KeyringDir, end)
		fmt.Println("**** end=", end)
		fmt.Println("**** d=", data)
		fmt.Println("********************************************************************")
	}

	return data
}

func getSyncUserAddress(k keeper.Keeper) (string, error) {
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

func saveBookmark(dir string, data *big.Int) error {
	err := os.WriteFile(dir+"/sync-bookmark", data.Bytes(), 0644)
	return err
}

func readBookmark(dir string) (*big.Int, error) {
	data, err := os.ReadFile(dir + "/sync-bookmark")
	if err != nil {
		return nil, err
	}
	return big.NewInt(0).SetBytes(data), nil
}
