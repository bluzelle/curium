package cli

import (
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/spf13/cobra"
	"strconv"

	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdRegisterPeer() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "registerPeer [id] [address] [port]",
		Short: "Broadcast message registerPeer",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsId := string(args[0])
			argsAddress := string(args[1])
			argsPort, _ := math.ParseUint64(args[2])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRegisterPeer(clientCtx.GetFromAddress().String(), string(argsId), string(argsAddress), uint64(argsPort))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
