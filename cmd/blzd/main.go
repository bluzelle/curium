// Copyright (C) 2020 Bluzelle
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License, version 3,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

package main

import (
	"encoding/json"
	"io"

	"github.com/cosmos/cosmos-sdk/client/debug"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/x/auth"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/x/staking"

	bluzellechain "github.com/bluzelle/curium/types"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/tendermint/tendermint/libs/cli"
	"github.com/tendermint/tendermint/libs/log"

	sdk "github.com/cosmos/cosmos-sdk/types"
	genutilcli "github.com/cosmos/cosmos-sdk/x/genutil/client/cli"
	abci "github.com/tendermint/tendermint/abci/types"
	tmtypes "github.com/tendermint/tendermint/types"
	dbm "github.com/tendermint/tm-db"

	"github.com/bluzelle/curium/app"
)

func main() {
	cobra.EnableCommandSorting = false

	cdc := app.MakeCodec()

	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(bluzellechain.Bech32PrefixAccAddr, bluzellechain.Bech32PrefixAccPub)
	config.SetBech32PrefixForValidator(bluzellechain.Bech32PrefixValAddr, bluzellechain.Bech32PrefixValPub)
	config.SetBech32PrefixForConsensusNode(bluzellechain.Bech32PrefixConsAddr, bluzellechain.Bech32PrefixConsPub)
	config.Seal()

	ctx := server.NewDefaultContext()

	rootCmd := &cobra.Command{
		Use:   "blzd",
		Short: "Bluzelle CRUD Daemon (server)",

		PersistentPreRunE: server.PersistentPreRunEFn(ctx),
	}
	// CLI commands to initialize the chain
	rootCmd.AddCommand(genutilcli.InitCmd(ctx, cdc, app.ModuleBasics, app.DefaultNodeHome))
	rootCmd.AddCommand(genutilcli.CollectGenTxsCmd(ctx, cdc, auth.GenesisAccountIterator{}, app.DefaultNodeHome))
	rootCmd.AddCommand(genutilcli.MigrateGenesisCmd(ctx, cdc))
	rootCmd.AddCommand(
		genutilcli.GenTxCmd(
			ctx, cdc, app.ModuleBasics, staking.AppModuleBasic{},
			auth.GenesisAccountIterator{}, app.DefaultNodeHome, app.DefaultCLIHome,
		),
	)
	rootCmd.AddCommand(genutilcli.ValidateGenesisCmd(ctx, cdc, app.ModuleBasics))
	// AddGenesisAccountCmd allows users to add accounts to the genesis file
//	rootCmd.AddCommand(AddGenesisAccountCmd(ctx, cdc, app.DefaultNodeHome, app.DefaultCLIHome))
	rootCmd.AddCommand(flags.NewCompletionCmd(rootCmd, true))
	rootCmd.AddCommand(debug.Cmd(cdc))

	server.AddCommands(ctx, cdc, rootCmd, newApp, exportAppStateAndTMValidators)

	// prepare and add flags
	executor := cli.PrepareBaseCmd(rootCmd, "DB", app.DefaultNodeHome)
	err := executor.Execute()
	if err != nil {
		panic(err)
	}
}

func newApp(logger log.Logger, db dbm.DB, _ io.Writer) abci.Application {
	pruningOpts, err := server.GetPruningOptionsFromFlags()
	if err != nil {
		panic(err)
	}

	return app.NewCRUDApp(logger,
		db,
		baseapp.SetMinGasPrices(viper.GetString(server.FlagMinGasPrices)),
		baseapp.SetPruning(pruningOpts),
		baseapp.SetHaltHeight(viper.GetUint64(server.FlagHaltHeight)),
		baseapp.SetHaltTime(viper.GetUint64(server.FlagHaltTime)))
}

func exportAppStateAndTMValidators(
	logger log.Logger, db dbm.DB, _ io.Writer, height int64, forZeroHeight bool, jailWhiteList []string,
) (json.RawMessage, []tmtypes.GenesisValidator, error) {

	if height != -1 {
		blzApp := app.NewCRUDApp(logger, db)
		err := blzApp.LoadHeight(height)
		if err != nil {
			return nil, nil, err
		}
		return blzApp.ExportAppStateAndValidators(forZeroHeight, jailWhiteList)
	}

	blzApp := app.NewCRUDApp(logger, db)

	return blzApp.ExportAppStateAndValidators(forZeroHeight, jailWhiteList)
}
