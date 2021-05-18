package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdGetNShortestLeases() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "GetNShortestLeases [uuid] [num]",
		Short: "Broadcast message GetNShortestLeases",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUuid := string(args[0])
			argsNum, _ := strconv.ParseUint(string(args[1]), 10, 32)

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgGetNShortestLeases(clientCtx.GetFromAddress().String(), string(argsUuid), uint32(argsNum))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
