package keeper

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/bluzelle/curium/app/ante/gasmeter"
	devel "github.com/bluzelle/curium/types"
	"github.com/cosmos/cosmos-sdk/x/auth/exported"
	"io/ioutil"

	cryptoKeys "github.com/cosmos/cosmos-sdk/crypto/keys"

	"time"

	clientkeys "github.com/cosmos/cosmos-sdk/client/keys"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
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

type MsgBroadcaster func(ctx sdk.Context, msgs []sdk.Msg, from string) chan *MsgBroadcasterResponse

type MsgBroadcasterResponse struct {
	Response *abci.ResponseDeliverTx
	Data     *[]byte
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

type AccountState struct {
	seqNum    uint64
	accntNum  uint64
	requested bool
	reset bool
}

func updateAccountState(accnt exported.Account, state AccountState) (AccountState, error) {
	if state.requested {
		state.seqNum = state.seqNum + 1
		return state, nil
	} else {
		state.accntNum = accnt.GetAccountNumber()
		state.seqNum = accnt.GetSequence()
		state.requested = true
		return state, nil
	}
}

func resetAccountState(accnt exported.Account, state AccountState) (AccountState, error) {
	time.Sleep(6 * time.Second)
	state.accntNum = accnt.GetAccountNumber()
	state.seqNum = accnt.GetSequence()
	state.requested = true
	state.reset = true
	return state, nil
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

func (k Keeper) NewMsgBroadcaster(keyringDir string, cdc *codec.Codec) MsgBroadcaster {
	accKeeper := k.accKeeper

	accntState := AccountState{
		requested: false,
		reset: false,
	}

	return func(ctx sdk.Context, msgs []sdk.Msg, from string) chan *MsgBroadcasterResponse {
		resp := make(chan *MsgBroadcasterResponse)

		go func() {
			defer func() {
				close(resp)
			}()

			DoBroadcast(resp, keyringDir, cdc, k, accKeeper, ctx, msgs, from, accntState)
		}()

		return resp
	}

}

func DoBroadcast(resp chan *MsgBroadcasterResponse, keyringDir string, cdc *codec.Codec, curiumKeeper Keeper, accKeeper *keeper.AccountKeeper, ctx sdk.Context, msgs []sdk.Msg, from string, state AccountState) {

	returnError := func(err error) {
		resp <- &MsgBroadcasterResponse{
			Error: err,
		}
	}

	defer func() {
		r := recover()
		curiumKeeper.Logger(ctx).Error("DoBroadcast", "error", r)

		if r != nil {
			returnError(r.(error))
		} else {
			returnError(errors.New("nil error returned"))
		}
	}()

	kr, err := getKeyring(keyringDir)

	if err != nil {
		returnError(err)
		return
	}

	addr, err := getAccountAddress(kr, from)

	if addr == nil {
		returnError(errors.New("Nft address is nil"))
	}

	if err != nil {
		returnError(err)
		return
	}

	accnt := accKeeper.GetAccount(ctx, addr)

	if accnt == nil {
		returnError(errors.New("from account does not exist"))
		return
	}

	gasPrice, err := getGasPriceUbnt()

	if err != nil {
		returnError(err)
		return
	}

	state, err = updateAccountState(accnt, state)

	if err != nil {
		returnError(err)
		return
	}


	// Create a new TxBuilder.
	txBuilder := auth.NewTxBuilder(
		utils.GetTxEncoder(cdc),
		state.accntNum,
		state.seqNum,
		10000000,
		1,
		false,
		ctx.ChainID(),
		"memo", nil,
		gasPrice,
	).WithKeybase(kr)


	signedMsgs, err := txBuilder.BuildAndSign(from, clientkeys.DefaultKeyPass, msgs)


	if err != nil {
		returnError(err)
		return
	}

	if accnt == nil {
		returnError(sdkerrors.New("curium", 2, "Cannot broadcast message, accnt does not exist"))
		return
	}

	rpcCtx := rpctypes.Context{}

	broadcastResult, err := core.BroadcastTxSync(&rpcCtx, signedMsgs)
	if err != nil {
		returnError(err)
		return
	}

	accntSeqString, err := regexp.Compile("verify correct account sequence")

	if err != nil {
		returnError(err)
		return
	}


	if state.reset {
		returnError(errors.New(broadcastResult.Log))
		return
	}

	if accntSeqString.MatchString(broadcastResult.Log) {
		returnError(errors.New("Sequencing error, retrying broadcast"))
		newAccntState, err := resetAccountState(accnt, state)
		if err != nil {
			returnError(err)
			return
		}

		go func () {
			DoBroadcast(resp, keyringDir, cdc, curiumKeeper, accKeeper, ctx, msgs, from, newAccntState)
		}()
		return
	}

	result, err := pollForTransaction(rpcCtx, broadcastResult.Hash)


	if err != nil {
		returnError(err)
		return
	}

	resp <- &MsgBroadcasterResponse{
		Response: &result.TxResult,
		Data:     &result.TxResult.Data,
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
		return "127.0.0.1", nil
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
