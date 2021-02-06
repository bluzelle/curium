package oracle

import (
	"encoding/hex"
	"fmt"
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/bluzelle/curium/x/oracle/types"
	clientKeys "github.com/cosmos/cosmos-sdk/client/keys"
	"github.com/cosmos/cosmos-sdk/codec"
	cryptoKeys "github.com/cosmos/cosmos-sdk/crypto/keys"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/rpc/core"
	"github.com/tendermint/tendermint/rpc/core/types"
	rpctypes "github.com/tendermint/tendermint/rpc/jsonrpc/types"
	nestedJson "github.com/wenxiang/go-nestedjson"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"sync"
	"time"
)

func getOracleUserAddress() sdk.AccAddress {
	address, _ := sdk.AccAddressFromBech32("bluzelle1ws42h2gjr6q8u5d2teexhrzz9xr9lqrxru50u2")
	return address
}

var logger = log.NewTMLogger(log.NewSyncWriter(os.Stdout))

var oracleUser = struct {
	mnemonic string
}{
	mnemonic: "bone soup garage safe hotel remove rebuild tumble usage marriage skin opinion banana scene focus obtain very soap vocal print symptom winter update hundred",
}


var currCtx *sdk.Context
var cdc codec.Codec
var accountKeeper auth.AccountKeeper

func StartFeeder(oracleKeeper Keeper, accKeeper auth.AccountKeeper, appCdc codec.Codec) {
	accountKeeper = accKeeper
	cdc = appCdc
	waitForCtx()
	feederTick(oracleKeeper)
	//c := cron.New()
	//c.AddFunc("* * * * *", func(){feederTick(crudKeeper)})
	//c.Start()

}

func waitForCtx() {
	for ; currCtx == nil; {
		time.After(time.Second)
	}
}

type SourceAndValue struct {
	source types.Source
	value float64
}

func feederTick(oracleKeeper Keeper) {
	sources, _ := oracleKeeper.ListSources(*currCtx)
	values := fetchValues(sources)
	txhash := sendPreflightMsgs(values)
	time.AfterFunc(time.Second * 20, func() {
		txhash = sendVoteMsgs(values)
	})
	_ = txhash
}


func fetchValues(sources []types.Source) []SourceAndValue {
	var results []SourceAndValue
	wg := sync.WaitGroup{}
	for _, source := range sources {
		wg.Add(1)
		go func(source types.Source) {
			value, err := fetchSource(source)
			if err == nil {
				results = append(results, SourceAndValue{
					source: source,
					 value: value,
				})
			}
			wg.Done()
		}(source)
	}
	wg.Wait()
	return results
}

func fetchSource(source types.Source) (float64, error) {
	resp, err := http.Get(source.Url)
	if resp != nil {
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)

		value, err := readValueFromJson(body, source.Property)
		if err != nil {
			logger.Info(fmt.Sprintf("Error fetching oracle source %s", source.Name))
			logger.Info(err.Error())
		}
		return value, nil
	}
	logger.Info(fmt.Sprintf("Error fetching oracle source %s", source.Name))
	logger.Info(err.Error())
	return 0, err
}

func readValueFromJson(jsonIn []byte, prop string) (float64, error) {
	obj, err := nestedJson.Decode(jsonIn)
	if err != nil {
		return 0, err
	}

	out, err := obj.Float(prop)
	if err != nil {
		outString, err := obj.String(prop)
		if err != nil {
			return 0, err
		}
		out, err = strconv.ParseFloat(outString, 64)
		if err != nil {
			return 0, err
		}
	}

	return out, nil
}

func sendPreflightMsgs(values []SourceAndValue) string {
	var msgs []sdk.Msg
	for _, value := range values {
		msg, _ := generateVoteProofMsg(value)
		msgs = append(msgs, msg)
	}
	result, _ := BroadcastOracleMessages(msgs)
	return hex.EncodeToString(result.Hash)
}

func sendVoteMsgs(values []SourceAndValue) string {
	var msgs []sdk.Msg
	for _, value := range values {
		msg, _ := generateVoteMsg(value)
		msgs = append(msgs, msg)
	}
	result, _ := BroadcastOracleMessages(msgs)
	return hex.EncodeToString(result.Hash)
}

func generateVoteMsg(source SourceAndValue) (types.MsgOracleVote, error) {
		msg := types.NewMsgOracleVote(
			keeper.GetValconsAddress(),
			fmt.Sprintf("%f", source.value),
			getOracleUserAddress(),
			source.source.Name,
			keeper.GetCurrentBatchId(),
		)
		err := msg.ValidateBasic()
		return msg, err
}


func generateVoteProofMsg(source SourceAndValue) (types.MsgOracleVoteProof, error) {
	proof := keeper.CalculateProofSig(fmt.Sprintf("%f", source.value))
	valcons := keeper.GetValconsAddress()
	msg := types.NewMsgOracleVoteProof(valcons, proof, getOracleUserAddress(), source.source.Name)
	err := msg.ValidateBasic()
	if err != nil {
		logger.Info("Error generating vote proof message", source.source.Name)
		return types.MsgOracleVoteProof{}, err
	}
	return msg, nil
}

func BroadcastOracleMessages(msgs []sdk.Msg) (*coretypes.ResultBroadcastTxCommit, error) {
	keybase := clientKeys.NewInMemoryKeyBase()
	account, err := keybase.CreateAccount("oracle", oracleUser.mnemonic, cryptoKeys.DefaultBIP39Passphrase, clientKeys.DefaultKeyPass, "44'/118'/0'/0/0", cryptoKeys.Secp256k1)

	if err != nil {
		logger.Info("Error creating keybase account", err)
	}

	address := account.GetAddress()
	acc := accountKeeper.GetAccount(*currCtx, address)

	// TODO: make sure to dynamically get the chainID
	txBldr := auth.NewTxBuilder(
		utils.GetTxEncoder(&cdc), acc.GetAccountNumber(), acc.GetSequence(), 10000000, 2,
		true, "bluzelle", "memo", nil, sdk.NewDecCoins(sdk.NewDecCoin("ubnt", sdk.NewInt(1000000))),
	).WithKeybase(keybase)

	signedMsg, err := txBldr.BuildAndSign("oracle", clientKeys.DefaultKeyPass, msgs)
	if err == nil {
		rpcCtx := rpctypes.Context{}
		result, err := core.BroadcastTxCommit(&rpcCtx, signedMsg)
		if err != nil {
			logger.Info(fmt.Sprintf("Error transmitting oracle preflight messages"))
		}
		return result, nil
	}

	return nil, err

}
