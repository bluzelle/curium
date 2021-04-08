package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdSynchronizerVote() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "SynchronizerVote [op] [uuid] [key] [value]",
		Short: "Broadcast message SynchronizerVote",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsOp := string(args[0])
			argsUuid := string(args[1])
			argsKey := string(args[2])
			argsValue := string(args[3])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSynchronizerVote(clientCtx.GetFromAddress().String(), string(argsUuid), string(argsOp), string(argsKey), string(argsValue), uint64(0))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
