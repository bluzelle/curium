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

func CmdUpsertCrudValue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "upsertCrudValue [uuid] [key] [value] [lease]",
		Short: "Broadcast message upsertCrudValue",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUuid := string(args[0])
			argsKey := string(args[1])
			argsValue := []byte(args[2])
			argsLease, err := strconv.ParseInt(args[3], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpsert(clientCtx.GetFromAddress().String(), string(argsUuid), string(argsKey), argsValue, argsLease)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
