package oracle

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"github.com/bluzelle/curium/x/oracle/types"
	clientKeys "github.com/cosmos/cosmos-sdk/client/keys"
	"github.com/cosmos/cosmos-sdk/codec"
	cryptoKeys "github.com/cosmos/cosmos-sdk/crypto/keys"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/tendermint/tendermint/libs/log"
	pvm "github.com/tendermint/tendermint/privval"
	"github.com/tendermint/tendermint/rpc/core"
	"github.com/tendermint/tendermint/rpc/core/types"
	rpctypes "github.com/tendermint/tendermint/rpc/jsonrpc/types"
	nestedJson "github.com/wenxiang/go-nestedjson"
	"io/ioutil"
	"net/http"
	"os"
	"os/user"
	"strconv"
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

type JSONResponse map[string]interface{}

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

func getPrivateValidator() *pvm.FilePV {
	usr, _ := user.Current()
	homedir := usr.HomeDir
	return pvm.LoadFilePV(homedir+"/.blzd/config/priv_validator_key.json", homedir+"/.blzd/data/priv_validator_state.json")
}

func getValconsAddress() string {
	return (sdk.ConsAddress)(getPrivateValidator().GetAddress()).String()
}

type SourceAndValue struct {
	types.Source
	value float64
}

func feederTick(oracleKeeper Keeper) {
	sources, _ := oracleKeeper.ListSources(*currCtx)
	mapSources(sources, vote)
}

func vote(source types.Source, value float64) {
	sendPreflightMsg(source, value)
	time.AfterFunc(time.Second * 20, func() {
		sendVoteMsg(source, value)
	})
}

func mapSources(sources []types.Source, fn func(types.Source, float64)) {
	for _, source := range sources {
		value, _ := fetchSource(source)
		fn(source, value)
	}
}

func fetchSource(source types.Source) (float64, error) {
	resp, err := http.Get(source.Url)
	if err != nil {
		logger.Info(fmt.Sprintf("Error fetching oracle source %s", source.Name))
		logger.Info(err.Error())
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	value, err := readValueFromJson(body, source.Property)
	if err != nil {
		logger.Info(fmt.Sprintf("Error fetching oracle source %s", source.Name))
		logger.Info(err.Error())
	}
	return value, nil
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

func sendPreflightMsg(source types.Source, value float64) {
	valConsAdd := getValconsAddress()
	proofStr := fmt.Sprintf("%s%f", valConsAdd, value)
	proof := []byte(proofStr)
	sum := sha256.Sum256(proof)
	msg := types.NewMsgOracleVoteProof(valConsAdd, hex.EncodeToString(sum[:]), getOracleUserAddress(), source.Name)
	err := msg.ValidateBasic()
	if err == nil {
		result, _ := BroadcastOracleMessage(source, msg)
		txhash := hex.EncodeToString(result.Hash)
		fmt.Println("Proof hash:", txhash)
	}

}

func sendVoteMsg(source types.Source, value float64) {
	msg := types.NewMsgOracleVote(
		getValconsAddress(),
		fmt.Sprintf("%f", value),
		getOracleUserAddress(),
		source.Name,
	)
	err := msg.ValidateBasic()
	if err == nil {
		result, _ := BroadcastOracleMessage(source, msg)
		txhash := hex.EncodeToString(result.Hash)
		fmt.Println("Vote hash:", txhash)
	}
}

func BroadcastOracleMessage(source types.Source, msg sdk.Msg) (*coretypes.ResultBroadcastTxCommit, error) {
	keybase := clientKeys.NewInMemoryKeyBase()
	account, err := keybase.CreateAccount("oracle", oracleUser.mnemonic, cryptoKeys.DefaultBIP39Passphrase, clientKeys.DefaultKeyPass, "44'/118'/0'/0/0", cryptoKeys.Secp256k1)

	if err != nil {
		logger.Info("Error creating keybase account", err)
	}
	msgs := []sdk.Msg{msg}

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
			logger.Info(fmt.Sprintf("Error transmitting oracle preflight for %s"), source.Name)
		}
		return result, nil
	}

	return nil, err

}
