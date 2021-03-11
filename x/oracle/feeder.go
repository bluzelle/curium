package oracle

import (
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/bluzelle/curium/x/oracle/types"
	clientKeys "github.com/cosmos/cosmos-sdk/client/keys"
	"github.com/cosmos/cosmos-sdk/codec"
	cryptoKeys "github.com/cosmos/cosmos-sdk/crypto/keys"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/robfig/cron/v3"
	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/rpc/core"
	"github.com/tendermint/tendermint/rpc/core/types"
	rpctypes "github.com/tendermint/tendermint/rpc/jsonrpc/types"
	nestedJson "github.com/wenxiang/go-nestedjson"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

var logger = log.NewTMLogger(log.NewSyncWriter(os.Stdout))

var accountKeeper auth.AccountKeeper

func RunFeeder(oracleKeeper Keeper, accKeeper auth.AccountKeeper, cdc *codec.Codec) {
	logger.Info("Starting oracle feeder service")
	accountKeeper = accKeeper

	c := cron.New()
	c.AddFunc("* * * * *", func() {
		if !oracleKeeper.IsValidator(*currCtx) {
			logger.Info("Not running feeder, host is not a validator")
			return
		}
		logger.Info("Oracle feeder run", "Valcons", keeper.GetValconsAddress())
		GetValueAndSendProofAndVote(oracleKeeper, cdc)
	})
	c.Start()
}

type SourceAndValue struct {
	source types.Source
	value  float64
}

func GetValueAndSendProofAndVote(oracleKeeper Keeper, cdc *codec.Codec) {
	sources, _ := oracleKeeper.ListSources(*currCtx)
	logger.Info("Oracle fetching from sources", "count", len(sources))
	if len(sources) > 0 {
		values := fetchValues(sources)
		sendPreflightMsgs(values, cdc)
		time.AfterFunc(time.Second*20, func() {
			sendVoteMsgs(values, cdc)
		})
	}
}

func fetchValues(sources []types.Source) []SourceAndValue {
	var results = make([]SourceAndValue, 0)
	wg := sync.WaitGroup{}
	for _, source := range sources {
		wg.Add(1)
		go func(source types.Source) {
			defer func() {
				if err := recover(); err != nil {
					logger.Error("panic occurred fetching source", "source", source.Name, "err", err)
				}
			}()
			value, err := fetchSource(source)
			if err == nil {
				results = append(results, SourceAndValue{
					source: source,
					value:  value,
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
	if err == nil {
		defer func() {
			err := resp.Body.Close()
			if err != nil {
				logger.Info("Error closing http connection", source.Url)
			}
		}()

		body, err := ioutil.ReadAll(resp.Body)

		value, err := readValueFromJson(body, source.Property)
		if err != nil {
			logger.Info("Error fetching oracle source", "name", source.Name)
			logger.Info(err.Error())
		}
		return value, nil
	}
	logger.Info("Error fetching oracle source", "name", source.Name)
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

func sendPreflightMsgs(values []SourceAndValue, cdc *codec.Codec) string {
	var msgs []sdk.Msg
	for _, value := range values {
		msg, _ := generateVoteProofMsg(cdc, value)
		msgs = append(msgs, msg)
	}
	logger.Info("Sending oracle proof messages", "count", len(msgs))
	result, _ := BroadcastOracleMessages(msgs, cdc)
	logger.Info("Oracle proof messages sent", "hash", result.Hash)
	return hex.EncodeToString(result.Hash)
}

func sendVoteMsgs(values []SourceAndValue, cdc *codec.Codec) string {
	var msgs []sdk.Msg
	for _, value := range values {
		msg, _ := generateVoteMsg(cdc, value)
		msgs = append(msgs, msg)
	}
	logger.Info("Sending feeder vote messages", "count", len(msgs))
	result, _ := BroadcastOracleMessages(msgs, cdc)
	logger.Info("Feeder vote messages sent", "hash", result.Hash)
	return hex.EncodeToString(result.Hash)
}

func generateVoteMsg(cdc *codec.Codec, source SourceAndValue) (types.MsgOracleVote, error) {
	config, err := readOracleConfig()
	if err != nil {
		return types.MsgOracleVote{}, err
	}
	msg := types.NewMsgOracleVote(
		keeper.GetValconsAddress(),
		fmt.Sprintf("%.12f", source.value),
		config.UserAddress,
		source.source.Name,
		getCurrentBatchId(),
	)
	err = msg.ValidateBasic()
	return msg, err
}

func getCurrentBatchId() string {
	t := time.Date(
		time.Now().Year(),
		time.Now().Month(),
		time.Now().Day(),
		time.Now().Hour(),
		time.Now().Minute(),
		0,
		0,
		time.UTC,
	).String()
	t = strings.Replace(t, ":00 +0000 UTC", "", 1)
	t = strings.Replace(t, " ", "-", -1)
	return t
}


func generateVoteProofMsg(cdc *codec.Codec, source SourceAndValue) (types.MsgOracleVoteProof, error) {
	config, err := readOracleConfig()
	if err != nil {
		return types.MsgOracleVoteProof{}, err
	}

	proof := keeper.CalculateProofSig(fmt.Sprintf("%.12f", source.value))
	valcons := keeper.GetValconsAddress()
	msg := types.NewMsgOracleVoteProof(valcons, proof, config.UserAddress, source.source.Name)
	err = msg.ValidateBasic()
	if err != nil {
		logger.Info("Error generating vote proof message", source.source.Name)
		return types.MsgOracleVoteProof{}, err
	}
	return msg, nil
}

func BroadcastOracleMessages(msgs []sdk.Msg, cdc *codec.Codec) (*coretypes.ResultBroadcastTxCommit, error) {
	config, err := readOracleConfig()
	if err != nil {
		return nil, err
	}

	keybase := clientKeys.NewInMemoryKeyBase()
	account, err := keybase.CreateAccount("oracle", config.UserMnemonic, cryptoKeys.DefaultBIP39Passphrase, clientKeys.DefaultKeyPass, "44'/118'/0'/0/0", cryptoKeys.Secp256k1)

	if err != nil {
		logger.Info("Error creating keybase account", err)
	}

	address := account.GetAddress()
	acc := accountKeeper.GetAccount(*currCtx, address)

	minGasPrice := strings.Replace(viper.GetString("minimum-gas-prices"), "ubnt", "", 1)
	gasPrice, _ := sdk.NewDecFromStr(minGasPrice)
	txBldr := auth.NewTxBuilder(
		utils.GetTxEncoder(cdc),
		acc.GetAccountNumber(),
		acc.GetSequence(),
		10000000,
		1,
		false,
		currCtx.ChainID(),
		"memo", nil,
		sdk.NewDecCoins(sdk.NewDecCoinFromDec("ubnt", gasPrice)),
	).WithKeybase(keybase)

	signedMsg, err := txBldr.BuildAndSign("oracle", clientKeys.DefaultKeyPass, msgs)
	if err == nil {
		rpcCtx := rpctypes.Context{}
		result, err := core.BroadcastTxCommit(&rpcCtx, signedMsg)
		if err != nil {
			logger.Info("Error transmitting feeder messages")
		}
		return result, nil
	}

	return nil, err

}

var currCtx *sdk.Context

func StartFeeder(oracleKeeper Keeper, accountKeeper auth.AccountKeeper, cdc *codec.Codec) {
	defer func() {
		if err := recover(); err != nil {
			logger.Error("panic occurred:", "err", err)
		}
	}()
	waitForCtx()
	RunFeeder(oracleKeeper, accountKeeper, cdc)
}

func waitForCtx() {
	for currCtx == nil {
		logger.Info("Feeder waiting for context")
		time.Sleep(5 * time.Second)
	}
}

func readOracleConfig() (types.OracleConfig, error) {
	address, err := sdk.AccAddressFromBech32(viper.GetString("oracle-user-address"))
	if err != nil {
		errors.New("unable to read oracle address from app.toml")
	}

	return types.OracleConfig{
		UserAddress:  address,
		UserMnemonic: viper.GetString("oracle-user-mnemonic"),
	}, nil
}
