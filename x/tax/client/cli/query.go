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

// GetQueryCmd returns module query commands
func GetQueryCmd(storeKey string, cdc *codec.Codec) *cobra.Command {
	taxQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "Querying commands for the tax module",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 0,
		RunE:                       client.ValidateCmd,
	}

	taxQueryCmd.AddCommand(flags.GetCommands(
		GetCmdQTaxInfo(storeKey, cdc),
	)...)

	return taxQueryCmd
}

// GetCmdQTaxInfo returns tax info by query
func GetCmdQTaxInfo(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "info",
		Short: "show tax info",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/tax_info", queryRoute), nil)

			if err != nil {
				fmt.Println("could get tax info ", err)
				return nil
			}

			var out types.TaxInfo
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}
