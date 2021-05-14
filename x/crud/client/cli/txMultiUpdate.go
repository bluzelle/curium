package cli

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/spf13/cobra"
	"strconv"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdMultiUpdate() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "MultiUpdate [uuid] [keyValues]",
		Short: "Broadcast message MultiUpdate",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUuid := string(args[0])
			//argsKeyValues := string(args[1])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			// after uuid there should be an even number of k/v pairs...
			argsLen := len(args) - 1

			if (argsLen % 2) == 0 {
				msg := types.NewMsgMultiUpdate(string(clientCtx.GetFromAddress()), argsUuid, nil)

				for i := 1; i < argsLen; i += 2 {
					msg.KeyValues = append(msg.KeyValues, &types.KeyValue{Key: args[i], Value: []byte(args[i+1])})
				}

				err := msg.ValidateBasic()
				if err != nil {
					return err
				}

				return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
			}

			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "incorrect number of k/v arguments")

		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
