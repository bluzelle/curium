package cli

import (
	"fmt"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"

	"github.com/bluzelle/curium/x/oracle/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string, cdc *codec.Codec) *cobra.Command {
	// Group oracle queries under a subcommand
	oracleQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	oracleQueryCmd.AddCommand(
		flags.GetCommands(
			// this line is used by starport scaffolding # 1
			GetCmdQListSources(queryRoute, cdc),
			GetCmdQSearchVotes(queryRoute, cdc),
			GetCmdQSearchSourceValues(queryRoute, cdc),
		)...,
	)

	return oracleQueryCmd
}

func GetCmdQListSources(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "list-sources",
		Short: "List oracle sources",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/listsources", queryRoute), nil)

			if err != nil {
				fmt.Printf("Error: %s", err)
				return nil
			}

			var out types.QueryResultListSources
			cdc.MustUnmarshalJSON(res, &out)
			if out == nil {
				out = make(types.QueryResultListSources, 0)
			}
			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQSearchVotes(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "search-votes",
		Short: "Search oracle votes",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			data := types.SearchVotesQueryRequest{
				Prefix: args[0],
			}
			json := cdc.MustMarshalJSON(data)
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/searchvotes", queryRoute), json)

			if err != nil {
				fmt.Printf("Error: %s", err)
				return nil
			}

			var out []types.Vote
			cdc.MustUnmarshalJSON(res, &out)

			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQSearchSourceValues(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "search-source-values",
		Short: "Search source values",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			data := types.SearchSourceValuesQueryRequest{
				Prefix: args[0],
			}
			json := cdc.MustMarshalJSON(data)
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/searchSourceValues", queryRoute), json)

			if err != nil {
				fmt.Printf("Error: %s", err)
				return nil
			}

			var out []types.SourceValue
			cdc.MustUnmarshalJSON(res, &out)

			return cliCtx.PrintOutput(out)
		},
	}
}

