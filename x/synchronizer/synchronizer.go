package synchronizer

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/synchronizer/contract"
	"github.com/bluzelle/curium/x/synchronizer/keeper"
	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/types/tx"
	clienttx "github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/crypto"
	"google.golang.org/grpc"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/simapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	xauthsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	eth "github.com/ethereum/go-ethereum/ethclient"
	"github.com/spf13/viper"
	coretypes "github.com/tendermint/tendermint/rpc/core/types"
	"sync"
	"time"
)

var doOnce sync.Once
var currCtx sdk.Context
var ticker = time.NewTicker(time.Second * 15)

func StartSynchronizer(ctx sdk.Context, k keeper.Keeper) {
	currCtx = ctx
	doOnce.Do(func() {
		go func() {
			for {
				t := <-ticker.C
				runSynchronizer(t, k)
			}
		}()
	})
}

func runSynchronizer(t time.Time, k keeper.Keeper) {
	sources := k.GetAllSource(currCtx)
	var voteMessages []sdk.Msg

	for _, source := range sources {
		data := fetchDataFromContract(currCtx, source)
		for _, item := range data {
			msg, err := generateVoteMsg(source, item, k)
			voteMessages = append(voteMessages, msg)
			if err != nil {
				k.Logger(currCtx).Info("Error creating vote message", "item", item)
			}
		}
	}
	BroadcastVoteMessages(voteMessages, k)
}

func fetchDataFromContract(ctx sdk.Context, source types.Source) []contract.TestingRecord {
	ethCtx := context.Background()
	backend, err := eth.Dial("https://data-seed-prebsc-1-s1.binance.org:8545/")
	if err != nil {
		fmt.Println(err)
	}

	addr := common.HexToAddress("0x4Fe0D5763cF500454E2b105f6AE8b9b66Ea4dD64")
	ctr, err := contract.NewTesting(addr, backend)
	if err != nil {
		fmt.Println(err)
	}
	callOpts := &bind.CallOpts{Context: ethCtx, Pending: false}
	data, err := ctr.GetSynchronizerData(callOpts)
	return data
}

func generateVoteMsg(source types.Source, record contract.TestingRecord, k keeper.Keeper) (sdk.Msg, error) {
	home := viper.GetString("home")
	kr, err := keyring.New("curium", keyring.BackendTest, home + "/.curium", nil)
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
		record.Key,
		record.Value,
		)
	err = voteMsg.ValidateBasic()
	if err != nil {
		k.Logger(currCtx).Info("Error generating vote message", "source", source)
		return nil, err
	}
	return voteMsg, nil
}


func BroadcastVoteMessages(msgs []sdk.Msg, k keeper.Keeper) (*coretypes.ResultBroadcastTxCommit, error) {
		// Choose your codec: Amino or Protobuf. Here, we use Protobuf, given by the
		// following function.
		encCfg := simapp.MakeTestEncodingConfig()

		// Create a new TxBuilder.
		txBuilder := encCfg.TxConfig.NewTxBuilder()

	err := txBuilder.SetMsgs(msgs...)
	if err != nil {
		return nil, err
	}


	txBuilder.SetGasLimit(200000)
	txBuilder.SetFeeAmount(sdk.NewCoins(sdk.NewCoin("ubnt", sdk.NewInt(20000))))
	txBuilder.SetMemo("synchronizer vote")
	txBuilder.SetTimeoutHeight(uint64(currCtx.BlockHeight() + 2))

	home := viper.GetString("home")
	kr, err := keyring.New("curium", keyring.BackendTest, home + "/.curium", nil)
	if err != nil {
		return nil, err
	}
	keys, err := kr.Key("sync")
	if err != nil {
		return nil, err
	}

	addr := keys.GetAddress()
	accnt := k.AccKeeper.GetAccount(currCtx, addr)

	privArmor, err := kr.ExportPrivKeyArmor("sync", "")
	if err != nil {
		return nil, err
	}

	privKey, _, err := crypto.UnarmorDecryptPrivKey(privArmor, "")
	if err != nil {
		return nil, err
	}

	sigV2 := signing.SignatureV2{
		PubKey: keys.GetPubKey(),
		Data: &signing.SingleSignatureData{
			SignMode:  encCfg.TxConfig.SignModeHandler().DefaultMode(),
			Signature: nil,
		},
		Sequence: accnt.GetSequence(),
	}

	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, err
	}

	signerData := xauthsigning.SignerData{
		ChainID:       currCtx.ChainID(),
		AccountNumber: accnt.GetAccountNumber(),
		Sequence:      accnt.GetSequence(),
	}
	_ = signerData
	sigV2, err = clienttx.SignWithPrivKey(
		encCfg.TxConfig.SignModeHandler().DefaultMode(), signerData,
		txBuilder, privKey, encCfg.TxConfig, accnt.GetSequence())
	if err != nil {
		return nil, err
	}

	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, err
	}



	txBytes, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())
	if err != nil {
		return nil, err
	}

	//// Generate a JSON string.
	//txJSONBytes, err := encCfg.TxConfig.TxJSONEncoder()(txBuilder.GetTx())
	//if err != nil {
	//	return nil, err
	//}
	//txJSON := string(txJSONBytes)
	//_ = txJSON



	grpcConn, err := grpc.Dial(
		"127.0.0.1:9090", // Or your gRPC server address.
		grpc.WithInsecure(), // The SDK doesn't support any transport security mechanism.
	)
	if err != nil {
		return nil, err
	}
	defer grpcConn.Close()


	ctx := myCtx{}

	// Broadcast the tx via gRPC. We create a new client for the Protobuf Tx
	// service.
//	var ctx context.Context
	txClient := tx.NewServiceClient(grpcConn)
	// We then call the BroadcastTx method on this client.
	grpcRes, err := txClient.BroadcastTx(
		ctx,
		&tx.BroadcastTxRequest{
			Mode:    tx.BroadcastMode_BROADCAST_MODE_SYNC,
			TxBytes: txBytes, // Proto-binary of the signed transaction, see previous step.
		},
	)
	if err != nil {
		return nil, err
	}

	fmt.Println(grpcRes.TxResponse.Code) // Should be `0` if the tx is successful

	return nil, nil
}

type myCtx struct {
}

func (m myCtx) Deadline() (deadline time.Time, ok bool) {
	return time.Now().Add(time.Second * 10), true
}

func (m myCtx) Done() <-chan struct{} {
	return make(chan struct{})
}

func (m myCtx) Err() error {
	return nil
}

func (m myCtx) Value(key interface{}) interface{} {
	return "value"
}


