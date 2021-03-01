package cli

import (
	"bufio"
	"fmt"
	"github.com/cosmos/cosmos-sdk/client/context"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	_ "github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/codec"
	_ "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/x/auth"
	_ "github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/bluzelle/curium/x/oracle/types"
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd(cdc *codec.Codec) *cobra.Command {
	oracleTxCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	oracleTxCmd.AddCommand(flags.PostCommands(
		// this line is used by starport scaffolding # 1
		GetCmdSourceAdd(cdc),
		GetCmdSourceDelete(cdc),
		GetCmdSetAdmin(cdc),
	)...)

	return oracleTxCmd
}

func GetCmdSetAdmin(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "set-admin <address>",
		Short: "Set a new oracle admin address",
		Args:  cobra.ExactArgs(1), // Does your request require arguments
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			newAdminAddr, err := sdk.AccAddressFromBech32(args[0])
			if err != nil {
				return err
			}

			msg := types.NewMsgOracleSetAdmin(newAdminAddr, cliCtx.GetFromAddress())
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}


func GetCmdSourceAdd(cdc *codec.Codec) *cobra.Command {
 	return &cobra.Command{
 		Use:   "add-source <name> <url> <property>",
 		Short: "Add an oracle source",
 		Args:  cobra.ExactArgs(3), // Does your request require arguments
 		RunE: func(cmd *cobra.Command, args []string) error {
 			cliCtx := context.NewCLIContext().WithCodec(cdc)
 			inBuf := bufio.NewReader(cmd.InOrStdin())
 			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

 			msg := types.NewMsgOracleAddSource(args[0], args[1], args[2], cliCtx.GetFromAddress())
 			err := msg.ValidateBasic()
 			if err != nil {
 				return err
 			}

 			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
 		},
	}
}

func GetCmdSourceDelete(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "delete-source <name> ",
		Short: "Delete an oracle source",
		Args:  cobra.ExactArgs(1), // Does your request require arguments
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			msg := types.NewMsgOracleDeleteSource(args[0], cliCtx.GetFromAddress())
			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

