package synchronizer

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/curium"
	"github.com/bluzelle/curium/x/synchronizer/contract/binance"
	"github.com/bluzelle/curium/x/synchronizer/keeper"
	"github.com/bluzelle/curium/x/synchronizer/types"
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
const CONTRACT_ADDRESS = "0xcC4ce1b888EfBeff226592fb23c64F69a1Ee7Db2"

var doOnce sync.Once
var currCtx sdk.Context
var ticker = time.NewTicker(time.Second * 15)

func StartSynchronizer(ctx sdk.Context, k keeper.Keeper) {
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
	var voteMessages []sdk.Msg

	for _, source := range sources {
		data := fetchDataFromContract(k, source)
		for _, item := range data {
			msg, err := generateVoteMsg(source, item, k)
			voteMessages = append(voteMessages, msg)
			if err != nil {
				k.Logger(currCtx).Info("Error creating vote message", "item", item)
			}
		}
	}
	if len(voteMessages) > 0 {
		curium.BroadcastMessages(currCtx, voteMessages, k.AccKeeper, "sync", k.GetKeyringDir())
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
		fmt.Println("*********************************************************************")
		fmt.Println("*********************************************************************")
		fmt.Println("*********************************************************************")
		fmt.Println("*********************************************************************")
		fmt.Println("***** start=", start)

		end := start.Add(start, big.NewInt(int64(len(d))))
		saveBookmark(k.KeyringDir, end)
		fmt.Println("**** end=", end)
		fmt.Println("**** d=", data)
		fmt.Println("********************************************************************")
	}

	return data
}

func generateVoteMsg(source types.Source, record binance.BluzelleAdapterTransaction, k keeper.Keeper) (sdk.Msg, error) {
	kr, err := keyring.New("curium", keyring.BackendTest, k.GetKeyringDir(), nil)

	if err != nil {
		return nil, err
	}
	key, err := kr.Key("sync")
	if err != nil {
		return nil, err
	}

	voteMsg := types.NewMsgSynchronizerVote(
		key.GetAddress().String(),
		record.Opt,
		"binance-"+record.Uuid,
		record.Key,
		record.Value,
		record.Bookmark.Uint64(),
		)
	err = voteMsg.ValidateBasic()
	if err != nil {
		k.Logger(currCtx).Info("Error generating vote message", "source", source)
		return nil, err
	}
	return voteMsg, nil
}

// TODO: Lets just dump the bookmark into a file for now, but later we need to
// incorporate this into the voting.

func saveBookmark(dir string, data *big.Int) error {
	err := os.WriteFile(dir + "/sync-bookmark", data.Bytes(), 0644)
	return err
}

func readBookmark(dir string) (*big.Int, error) {
	data, err := os.ReadFile(dir + "/sync-bookmark")
	if err != nil {
		return nil, err
	}
	return big.NewInt(0).SetBytes(data), nil
}


