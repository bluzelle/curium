package keeper

import (
	"encoding/json"
	"errors"
	"fmt"
	accountFetcherTypes "github.com/bluzelle/curium/app/accountFetcher/types"
	"github.com/bluzelle/curium/app/ante/gasmeter"
	devel "github.com/bluzelle/curium/types"
	"io/ioutil"
	"net"
	"strings"

	cryptoKeys "github.com/cosmos/cosmos-sdk/crypto/keys"

	"time"

	clientkeys "github.com/cosmos/cosmos-sdk/client/keys"

	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/spf13/viper"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/rpc/core"
	coretypes "github.com/tendermint/tendermint/rpc/core/types"
	rpctypes "github.com/tendermint/tendermint/rpc/jsonrpc/types"
	"net/http"
	"regexp"

	"github.com/bluzelle/curium/x/curium/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc            *codec.Codec
		storeKey       sdk.StoreKey
		memKey         sdk.StoreKey
		rpcPort        uint64
		accKeeper      *keeper.AccountKeeper
		GasMeterKeeper *gasmeter.GasMeterKeeper
	}
)

type MsgBroadcaster func(msgs []sdk.Msg, from string) chan *MsgBroadcasterResponse

type MsgBroadcasterResponse struct {
	Response *abci.ResponseDeliverTx
	Data     *[]byte
	Hash     *string
	Error    error
}

type KeyringReader struct{ keyringDir string }

func NewKeyringReader(keyringDir string) *KeyringReader {
	return &KeyringReader{
		keyringDir: keyringDir,
	}
}

func NewKeeper(cdc *codec.Codec, storeKey, memKey sdk.StoreKey, laddr string, accKeeper keeper.AccountKeeper, gasMeterKeeper *gasmeter.GasMeterKeeper) *Keeper {
	regex, _ := regexp.Compile(".*:")
	port, _ := math.ParseUint64(regex.ReplaceAllString(laddr, ""))
	return &Keeper{
		cdc:            cdc,
		storeKey:       storeKey,
		memKey:         memKey,
		rpcPort:        port,
		accKeeper:      &accKeeper,
		GasMeterKeeper: gasMeterKeeper,
	}
}


func getKeyring(keyringDir string) (cryptoKeys.Keybase, error) {
	return cryptoKeys.NewKeyring("BluzelleService", cryptoKeys.BackendTest, keyringDir, nil)
}

func getAccountAddress(keyring cryptoKeys.Keybase, from string) (sdk.AccAddress, error) {

	keyringKeys, err := keyring.Get(from)

	if err != nil {
		return nil, err
	}

	return keyringKeys.GetAddress(), nil
}

func (reader KeyringReader) GetAddress(from string) (sdk.AccAddress, error) {
	keyring, err := getKeyring(reader.keyringDir)

	if err != nil {
		return nil, err
	}

	return getAccountAddress(keyring, from)

}

func getGasPriceUbnt() (sdk.DecCoins, error) {
	minGasPriceString := viper.GetString("minimum-gas-prices")
	return sdk.ParseDecCoins(minGasPriceString)
}

func pollForTransaction(ctx rpctypes.Context, hash []byte) (*coretypes.ResultTx, error) {
	result, err := core.Tx(&ctx, hash, false)
	deadline, _ := ctx.Context().Deadline()
	if time.Now().Before(deadline) {
		return nil, errors.New("timeout deadline exceeded")
	}
	if err != nil {
		time.Sleep(500 * time.Millisecond)
		return pollForTransaction(ctx, hash)
	}
	return result, nil
}


func (k Keeper) checkTransmitFromQueueThread(msgBroadcastQueue *MsgBroadcastQueue, keyringDir string, cdc *codec.Codec, accInfo *AccountInfo) {
	queueTicker := time.NewTicker(1000 * time.Millisecond)
	var queuePaused = false

	go func() {
		for {
			<-queueTicker.C

			if !queuePaused && !msgBroadcastQueue.IsEmpty() {
				item := msgBroadcastQueue.Pop()
				go func() {
					result := DoBroadcast(keyringDir, cdc, accInfo, item.Msgs, item.From)
					if result.Error != nil {
						if item.RetryCount == 0 {
							fmt.Println("**** Broadcast error (retrying)", result.Error, "msg", item.Msgs[0].Route() + "/" + item.Msgs[0].Type())
							queuePaused = true
							item.IncrementRetry()
							msgBroadcastQueue.Push(item)
							time.AfterFunc(6*time.Second, func() { queuePaused = false })
							return
						}
						item.Resp <- &MsgBroadcasterResponse {
							Error: result.Error,
						}
					}
					item.Resp <- result
					close(item.Resp)
				}()
			}
		}
	}()

}


func (k Keeper) NewMsgBroadcaster(keyringDir string, cdc *codec.Codec, acctFetcher accountFetcherTypes.AccountFetcherFn) MsgBroadcaster {
	var accInfo = NewAccountInfo(acctFetcher)
	var msgBroadcastQueue = NewMsgBroadcastQueue()

	k.checkTransmitFromQueueThread(msgBroadcastQueue, keyringDir, cdc, accInfo)

	return func(msgs []sdk.Msg, from string) chan *MsgBroadcasterResponse {
		resp := make(chan *MsgBroadcasterResponse)

		msgBroadcastQueue.Push(&MsgBroadcastQueueItem{
			Msgs:       msgs,
			From:       from,
			Resp:       resp,
		})

		return resp
	}
}

func DoBroadcast(keyringDir string, cdc *codec.Codec, accInfo *AccountInfo, msgs []sdk.Msg, from string) *MsgBroadcasterResponse {

	if !devel.IsDevelopment() {
		defer func() {
			r := recover()
			fmt.Println("DoBroadcast", "error", r)
		}()
	}

	kr, err := getKeyring(keyringDir)

	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}

	accnt, err := accInfo.Next(from)
	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}

	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}

	gasPrice, err := getGasPriceUbnt()

	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}



	chainId, err := readChainId()
	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}

	// Create a new TxBuilder.
	txBuilder := auth.NewTxBuilder(
		utils.GetTxEncoder(cdc),
		accnt.AccNum,
		accnt.Seq,
		10000000,
		1,
		false,
		chainId,
		"memo", nil,
		gasPrice,
	).WithKeybase(kr)


	signedMsgs, err := txBuilder.BuildAndSign(from, clientkeys.DefaultKeyPass, msgs)


	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}

	rpcCtx := rpctypes.Context{}

	broadcastResult, err := core.BroadcastTxSync(&rpcCtx, signedMsgs)

	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}

	if strings.Contains(broadcastResult.Log, "signature verification failed") {
		return &MsgBroadcasterResponse{Error: errors.New(broadcastResult.Log)}
	}


	result, err := pollForTransaction(rpcCtx, broadcastResult.Hash)


	if err != nil {
		return &MsgBroadcasterResponse{Error: err}
	}
	hash := result.Hash.String()

	return &MsgBroadcasterResponse{
		Response: &result.TxResult,
		Data:     &result.TxResult.Data,
		Hash: 	  &hash,
	}

}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

type NetInfoResult struct {
	Result NetInfo `json:"result"`
}

type NetInfo struct {
	Peers []struct {
		Ip       string `json:"remote_ip"`
		NodeInfo struct {
			Id      string `json"id"`
			Moniker string `json:"moniker"`
		} `json:"node_info"`
	} `json:"peers"`
}

type StatusResult struct {
	Result Status `json:"result"`
}
type Status struct {
	NodeInfo struct {
		Id      string `json:"id""`
		Moniker string `json:"moniker"`
	} `json:"node_info"`
}

func (k Keeper) GetStatus() (*Status, error) {
	status, err := httpGet(fmt.Sprintf("http://localhost:%d/status", k.rpcPort))
	if err != nil {
		return nil, err
	}

	var statusResult StatusResult

	json.Unmarshal(status, &statusResult)
	s := statusResult.Result
	return &s, nil
}

func (k Keeper) GetNetInfo() (*NetInfo, error) {
	info, err := httpGet(fmt.Sprintf("http://localhost:%d/net_info", k.rpcPort))
	if err != nil {
		return nil, err
	}

	var netInfoResult NetInfoResult

	json.Unmarshal(info, &netInfoResult)
	netInfo := netInfoResult.Result
	return &netInfo, nil
}

func (k Keeper) MyRemoteIp() (string, error) {
	if devel.IsDevelopment() {
			conn, err := net.Dial("udp", "8.8.8.8:80")
			if err != nil {
			fmt.Println("Unable to determine external ip", err)
		}
			defer conn.Close()

			localAddr := conn.LocalAddr().(*net.UDPAddr)

			return localAddr.IP.String(), nil
	}
	bz, err := httpGet("https://api.ipify.org?format=json")
	if err != nil {
		return "", err
	}
	var result map[string]string
	json.Unmarshal(bz, &result)
	return result["ip"], nil
}

func httpGet(url string) ([]byte, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	return body, err
}
