package cli

import (
    "strconv"
	"github.com/spf13/cobra"

    "github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/bluzelle/curium/x/synchronizer/types"
)

var _ = strconv.Itoa(0)

func CmdSynchronizerVote() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "SynchronizerVote [op] [key] [value]",
		Short: "Broadcast message SynchronizerVote",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
      argsOp := string(args[0])
      argsKey := string(args[1])
      argsValue := string(args[2])
      
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSynchronizerVote(clientCtx.GetFromAddress().String(), string(argsOp), string(argsKey), string(argsValue))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

    return cmd
}