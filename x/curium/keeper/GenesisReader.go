package keeper

import (
	"encoding/json"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/viper"
	"io/ioutil"
)

type genesisData struct {
	ChainId string `json:"chain_id"`
}

func readGenesisJson() (*genesisData, error) {
	fileName := viper.GetString(flags.FlagHome) + "/config/genesis.json"
	bz, err := ioutil.ReadFile(fileName)
	if err != nil {
		return nil, err
	}
	var data = genesisData{}
	json.Unmarshal(bz, &data)
	return &data, nil

}

func readChainId() (string, error) {
	g, err := readGenesisJson()
	if (err != nil) {
		return "", err
	}
	return g.ChainId, nil
}