package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

func CmdCreate() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create [uuid] [key] [value] [lease]",
		Short: "Creates a new key/value",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUuid := string(args[0])
			argsKey := string(args[1])
			argsValue := string(args[2])
			argsLease := string(args[3])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			lease, err := strconv.ParseInt(argsLease, 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreate(clientCtx.GetFromAddress().String(), string(argsUuid), string(argsKey), []byte(argsValue), lease)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateCrudValue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-CrudValue [uuid] [key] [value] [lease]",
		Short: "Update a CrudValue",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {

			argsUuid := string(args[0])
			argsKey := string(args[1])
			argsValue := string(args[2])
			argsLease := string(args[3])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			lease, err := strconv.ParseInt(argsLease, 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdate(clientCtx.GetFromAddress().String(), string(argsUuid), string(argsKey), []byte(argsValue), lease)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteCrudValue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-CrudValue [uuid] [key]",
		Short: "Delete a Key",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDelete(clientCtx.GetFromAddress().String(), args[0], args[1])
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
