package cli

import (
	"bufio"
	"strconv"

	"github.com/bluzelle/curium/x/tax/internal/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/spf13/cobra"
)

func GetTxCmd(_ string, cdc *codec.Codec) *cobra.Command {
	taxTxCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "tax transaction subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}
	taxTxCmd.AddCommand(flags.PostCommands(
		GetCmdSetCollector(cdc),
		GetCmdSetPercentage(cdc),
	)...)

	return taxTxCmd
}

func GetCmdSetCollector(cdc *codec.Codec) *cobra.Command {
	cc := cobra.Command{
		Use:   "collector [address]",
		Short: "set collector of tax module",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			collector, err := sdk.AccAddressFromBech32(args[0])
			if err != nil {
				return err
			}

			msg := types.NewMsgSetCollector(collector, cliCtx.GetFromAddress())

			err = msg.ValidateBasic()
			if err != nil {
				return err
			}
			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}

	return &cc
}

func GetCmdSetPercentage(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "percentage [integer]",
		Short: "set percentage of tax",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			percentage, err := strconv.Atoi(args[0])
			if err != nil {
				return err
			}

			msg := types.NewMsgSetPercentage(percentage, cliCtx.GetFromAddress())

			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}
