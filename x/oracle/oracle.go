package oracle

import (
	"errors"
	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/spf13/viper"
	"time"
)

var currCtx *sdk.Context

func StartOracle(oracleKeeper Keeper, accountKeeper auth.AccountKeeper, cdc *codec.Codec) {
	waitForCtx()
	Run(oracleKeeper, accountKeeper, cdc)
}

func Run(oracleKeeper Keeper, accountKeeper auth.AccountKeeper, cdc *codec.Codec) {
		RunFeeder(oracleKeeper, accountKeeper, cdc)
}

func waitForCtx() {
	for currCtx == nil {
		logger.Info("Oracle waiting for context")
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