package cli

import (
	"fmt"

	"github.com/bluzelle/curium/x/tax/internal/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/spf13/cobra"
)

func GetQueryCmd(storeKey string, cdc *codec.Codec) *cobra.Command {
	taxQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "Querying commands for the tax module",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	taxQueryCmd.AddCommand(flags.GetCommands(
		GetCmdQTaxInfo(storeKey, cdc),
	)...)

	return taxQueryCmd
}

func GetCmdQTaxInfo(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "info",
		Short: "show tax info",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			key := args[1]
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/owner/%s/%s", queryRoute, UUID, key), nil)

			if err != nil {
				fmt.Printf("could get owner for key - %s : %s\n", UUID, key)
				return nil
			}

			var out types.TaxInfo
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}
