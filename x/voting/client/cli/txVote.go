package cli

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/spf13/cobra"
	"strconv"

	"github.com/bluzelle/curium/x/voting/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdVote() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "vote [valcons] [voteType] [from] [id] [batch]",
		Short: "Broadcast message vote",
		Args:  cobra.ExactArgs(5),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsValcons := string(args[0])
			argsVoteType := string(args[1])
			argsFrom := string(args[2])
			argsId, ok := math.ParseUint64(args[3])
			if !ok {
				return sdkerrors.New("voting", 2, "invalid vote id")
			}
			argsBatch := string(args[4])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgVote(clientCtx.GetFromAddress().String(), string(argsValcons), string(argsVoteType), string(argsFrom), argsId, string(argsBatch))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
