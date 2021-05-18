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

func CmdRenewLeasesAll() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "RenewLeasesAll [uuid] [lease]",
		Short: "Broadcast message RenewLeasesAll",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUuid := string(args[0])
			argsLease, err := strconv.ParseUint(args[3], 10, 32)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRenewLeasesAll(clientCtx.GetFromAddress().String(), string(argsUuid),  &types.Lease{Seconds: uint32(argsLease)})
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
