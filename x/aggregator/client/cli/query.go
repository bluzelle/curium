package cli

import (
	"fmt"
	"github.com/bluzelle/curium/x/aggregator/keeper"
	"github.com/cosmos/cosmos-sdk/client/context"
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
			GetCmdQSearchValues(queryRoute, cdc),
	// this line is used by starport scaffolding # 1
		)...,
	)

	return aggregatorQueryCmd
}

func GetCmdQSearchValues(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "search-values",
		Short: "Search aggregator values",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			data := types.QueryReqSearchValues{
				Prefix: args[0],
			}
			json := cdc.MustMarshalJSON(data)
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/%s", queryRoute, types.QuerySearchValues), json)

			if err != nil {
				fmt.Printf("Error: %s", err)
				return nil
			}

			var out []keeper.AggregatorValue
			cdc.MustUnmarshalJSON(res, &out)

			return cliCtx.PrintOutput(out)
		},
	}
}
