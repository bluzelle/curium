package oracle

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"github.com/bluzelle/curium/x/crud"
	"github.com/bluzelle/curium/x/oracle/types"
	clientKeys "github.com/cosmos/cosmos-sdk/client/keys"
	"github.com/cosmos/cosmos-sdk/codec"
	cryptoKeys "github.com/cosmos/cosmos-sdk/crypto/keys"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/go-resty/resty/v2"
	"github.com/tendermint/tendermint/libs/log"
	pvm "github.com/tendermint/tendermint/privval"
	"github.com/tendermint/tendermint/rpc/core"
	rpctypes "github.com/tendermint/tendermint/rpc/jsonrpc/types"
	"net/url"
	"os"
	"os/user"
	"strconv"
	"time"
)

var logger = log.NewTMLogger(log.NewSyncWriter(os.Stdout))


var oracleUser = struct{
	//address  string
	//pubkey   string
	mnemonic string
}{
	//address: "bluzelle1ws42h2gjr6q8u5d2teexhrzz9xr9lqrxru50u2",
	//pubkey: "bluzellepub1addwnpepq0yg97vrptalxxwy6rykm85jdeam9eqcgy0v3s0reuzcsvsekzakgp8d7mc",
	mnemonic: "bone soup garage safe hotel remove rebuild tumble usage marriage skin opinion banana scene focus obtain very soap vocal print symptom winter update hundred",
}

type JSONResponse map[string]interface{}


var currCtx *sdk.Context
var cdc codec.Codec
var accountKeeper auth.AccountKeeper

func StartFeeder(crudKeeper crud.Keeper, accKeeper auth.AccountKeeper, appCdc codec.Codec ) {
	accountKeeper = accKeeper
	cdc = appCdc
	time.AfterFunc(1000, func() {
		for ; currCtx == nil; {
			time.After(time.Second)
		}

		feederTick(crudKeeper)
		//c := cron.New()
		//c.AddFunc("* * * * *", func(){feederTick(crudKeeper)})
		//c.Start()
	})
}

func getPrivateValidator() *pvm.FilePV {
	usr, _ := user.Current()
	homedir := usr.HomeDir
	return pvm.LoadFilePV(homedir + "/.blzd/config/priv_validator_key.json", homedir + "/.blzd/data/priv_validator_state.json")
}

func getValconsAddress() string {
	return (sdk.ConsAddress)(getPrivateValidator().GetAddress()).String()
}

func feederTick(crudKeeper crud.Keeper) {

	result := crudKeeper.Search(*currCtx, crudKeeper.GetKVStore(*currCtx), "oracle", "source", 1, 100, "asc", nil)
		keyValues := result.KeyValues


		for _, v := range keyValues {
			source := types.Source{}
			json.Unmarshal([]byte(decodeSafe(v.Value)), &source)
			source.Name = v.Key

			value, err := fetchFromSource(source)

			if err == nil {
				sendPreflightMsg(source, value)
			} else {
				logger.Info("Feeder: unable to fetch from Source " + "(" + source.Url + ")" + err.Error())
			}

		}
}

func sendPreflightMsg(source types.Source, value float64) {
	keybase := clientKeys.NewInMemoryKeyBase()
	account, err := keybase.CreateAccount("oracle", oracleUser.mnemonic, cryptoKeys.DefaultBIP39Passphrase, clientKeys.DefaultKeyPass, "44'/118'/0'/0/0", cryptoKeys.Secp256k1)

	if(err != nil) {
		logger.Info("Error creating keybase account", err)
	}

	valConsAdd := getValconsAddress()

	proofStr := fmt.Sprintf("%s%f", valConsAdd, value)
	proof := []byte(proofStr)
	sum := sha256.Sum256(proof)
	owner, _ := sdk.AccAddressFromBech32("bluzelle1ws42h2gjr6q8u5d2teexhrzz9xr9lqrxru50u2")
	msg := types.NewMsgOracleVoteProof(valConsAdd, string(sum[:]), owner)
	err = msg.ValidateBasic()

	if err == nil {
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
			core.BroadcastTxCommit(&rpcCtx, signedMsg)
		}

	}
}

func fetchFromSource(source types.Source) (float64, error) {
	client := resty.New()

	resp, err := client.R().
		EnableTrace().
		Get(source.Url)

	if err != nil {
		return 0, err
	}

	var respBody JSONResponse

	json.Unmarshal(resp.Body(), &respBody)

	value  := respBody[source.Property]

	switch i := value.(type) {
	case string:
		f, err := strconv.ParseFloat(i, 32)
		return f, err
	}
	return 0, nil

}

func decodeSafe(str string) string {
	raw, _ := url.PathUnescape(str)
	return raw
	//decodeURI(str)
	//.replace( / %../g, x => Some(x)
	//.map(x => x.replace('%', ''))
	//.map(x => parseInt(x, 16))
	//.map(String.fromCharCode)
	//.join()
	//)
}


