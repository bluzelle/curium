// Copyright (C) 2020 Bluzelle
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License, version 3,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

package cli

import (
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/spf13/cobra"
)

func GetTxCmd(_ string, cdc *codec.Codec) *cobra.Command {
	crudTxCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "Crud transaction subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}
	crudTxCmd.AddCommand(client.PostCommands(
		GetCmdBLZCreate(cdc),
		GetCmdBLZRead(cdc),
		GetCmdBLZUpdate(cdc),
		GetCmdBLZDelete(cdc),
		GetCmdBLZKeys(cdc),
		GetCmdBLZHas(cdc),
		GetCmdBLZRename(cdc),
	)...)

	return crudTxCmd
}

func GetCmdBLZCreate(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "create [UUID] [key] [value]",
		Short: "create a new entry in the database",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			txBldr := auth.NewTxBuilderFromCLI().WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgBLZCreate(args[0], args[1], args[2], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdBLZRead(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "read [UUID] [key]",
		Short: "read an existing entry in the database",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			txBldr := auth.NewTxBuilderFromCLI().WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgBLZRead(args[0], args[1], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdBLZUpdate(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "update [UUID] [key] [value]",
		Short: "update an existing entry in the database",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			txBldr := auth.NewTxBuilderFromCLI().WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgBLZUpdate(args[0], args[1], args[2], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdBLZDelete(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "delete [UUID] [key]",
		Short: "delete an existing entry in the database",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			txBldr := auth.NewTxBuilderFromCLI().WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgBLZDelete(args[0], args[1], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdBLZKeys(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "keys [UUID]",
		Short: "list keys for a UUID in the database",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			txBldr := auth.NewTxBuilderFromCLI().WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgBLZKeys(args[0], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdBLZHas(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "has [UUID] [key]",
		Short: "returns true if the key value pair exists",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			txBldr := auth.NewTxBuilderFromCLI().WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgBLZHas(args[0], args[1], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdBLZRename(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "rename [UUID] [key] [new key]",
		Short: "rename an existing entry in the database",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			txBldr := auth.NewTxBuilderFromCLI().WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgBLZRename(args[0], args[1], args[2], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}
