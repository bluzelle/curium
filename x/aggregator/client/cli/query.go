package cli

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"

	"github.com/bluzelle/curium/x/aggregator/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string, cdc *codec.Codec) *cobra.Command {
	// Group aggregator queries under a subcommand
	aggregatorQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	aggregatorQueryCmd.AddCommand(
		flags.GetCommands(
	// this line is used by starport scaffolding # 1
	// TODO: Add query Cmds
		)...,
	)

	return aggregatorQueryCmd
}

// TODO: Add Query Commands
