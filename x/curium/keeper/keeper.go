package keeper

import (
	"encoding/json"
	"fmt"
	"github.com/ethereum/go-ethereum/common/math"
	"io"
	"net/http"
	"regexp"
	"time"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/curium/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc      codec.Marshaler
		storeKey sdk.StoreKey
		memKey   sdk.StoreKey
		rpcPort  uint64
	}
)

func NewKeeper(cdc codec.Marshaler, storeKey, memKey sdk.StoreKey, laddr string) *Keeper {
	regex, _ := regexp.Compile(".*:")
	port, _ := math.ParseUint64(regex.ReplaceAllString(laddr, ""))
	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
		memKey:   memKey,
		rpcPort: port,
	}
}
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

var lastBlockTime time.Time

func (k Keeper) IsCaughtUp() bool {
	result := false
	if !lastBlockTime.IsZero() && time.Now().Sub(lastBlockTime) > time.Second*5 {
		result = true
	}
	lastBlockTime = time.Now()
	return result
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
	bz, err := httpGet("https://api.ipify.org?format=json")
	if err != nil {return "", err}
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
	body, err := io.ReadAll(resp.Body)
	return body, err
}

