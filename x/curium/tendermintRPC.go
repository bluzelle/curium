package curium

import (
	"encoding/json"
	"io"
	"net/http"
)

type NetInfoResult struct {
	Result NetInfo `json:"result"`
}

type NetInfo struct {
	Peers []struct {
		Ip       string `json:"remote_ip"`
		NodeInfo struct {
			Id string `json"id"`
			Moniker string `json:"moniker"`
		} `json:"node_info"`
	} `json:"peers"`
}

func GetNetInfo() (*NetInfo, error) {
	info, err := httpGet("https://client.sentry.testnet.private.bluzelle.com:26657/net_info")
	if err != nil {
		return &NetInfo{}, err
	}

	var netInfoResult NetInfoResult

	json.Unmarshal(info, &netInfoResult)
	netInfo := netInfoResult.Result
	return &netInfo, nil
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
