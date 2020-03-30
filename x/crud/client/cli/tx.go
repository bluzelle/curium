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
	"bufio"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/spf13/cobra"
	"strconv"
)

var leaseValue int64

func GetTxCmd(_ string, cdc *codec.Codec) *cobra.Command {
	crudTxCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "Crud transaction subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}
	crudTxCmd.AddCommand(flags.PostCommands(
		GetCmdCreate(cdc),
		GetCmdRead(cdc),
		GetCmdUpdate(cdc),
		GetCmdDelete(cdc),
		GetCmdKeys(cdc),
		GetCmdHas(cdc),
		GetCmdRename(cdc),
		GetCmdKeyValues(cdc),
		GetCmdCount(cdc),
		GetCmdDeleteAll(cdc),
		GetCmdMultiUpdate(cdc),
		GetCmdGetLease(cdc),
		GetCmdGetNShortestLease(cdc),
	)...)

	return crudTxCmd
}

func GetCmdCreate(cdc *codec.Codec) *cobra.Command {
	cc := cobra.Command{
		Use:   "create [UUID] [key] [value]",
		Short: "create a new entry in the database",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			msg := types.NewMsgCreate(args[0], args[1], args[2], leaseValue, cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}
			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
	cc.PersistentFlags().Int64Var(&leaseValue, "lease", 0, "lease in blocks (default 172800 (10 days))")
	return &cc
}

func GetCmdRead(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "read [UUID] [key]",
		Short: "read an existing entry in the database",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgRead(args[0], args[1], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdUpdate(cdc *codec.Codec) *cobra.Command {
	cc := cobra.Command{
		Use:   "update [UUID] [key] [value]",
		Short: "update an existing entry in the database",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.MsgUpdate{UUID: args[0], Key: args[1], Value: args[2], Lease: leaseValue, Owner: cliCtx.GetFromAddress()}

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}

	cc.PersistentFlags().Int64Var(&leaseValue, "lease", 0, "lease in blocks (default 0 (no change))")
	return &cc
}

func GetCmdDelete(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "delete [UUID] [key]",
		Short: "delete an existing entry in the database",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgDelete(args[0], args[1], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdKeys(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "keys [UUID]",
		Short: "list keys for a UUID in the database",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgKeys(args[0], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdKeyValues(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "keyvalues [UUID]",
		Short: "list keys/values for a UUID in the database",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgKeyValues(args[0], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdHas(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "has [UUID] [key]",
		Short: "returns true if the key value pair exists",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgHas(args[0], args[1], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdRename(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "rename [UUID] [key] [new key]",
		Short: "rename an existing entry in the database",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgRename(args[0], args[1], args[2], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdCount(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "count [UUID]",
		Short: "count of existing entries in the database",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgCount(args[0], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdDeleteAll(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "deleteall [UUID]",
		Short: "delete all entries in the database with ",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.NewMsgDeleteAll(args[0], cliCtx.GetFromAddress())

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdMultiUpdate(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "multiupdate [UUID] [key] [value] <key> <value> ...",
		Short: "update existing entries in the database",
		Args:  cobra.MinimumNArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			// after uuid there should be an even number of k/v pairs...
			argsLen := len(args) - 1

			if (argsLen % 2) == 0 {
				msg := types.NewMsgMultiUpdate(args[0], cliCtx.GetFromAddress(), nil)

				for i := 1; i < argsLen; i += 2 {
					msg.KeyValues = append(msg.KeyValues, types.KeyValue{Key: args[i], Value: args[i+1]})
				}

				err := msg.ValidateBasic()
				if err != nil {
					return err
				}

				return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
			}

			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "incorrect number of k/v arguments")
		},
	}
}

func GetCmdGetLease(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "getlease [UUID] [key]",
		Short: "get the remaining lease blocks for an existing entry",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))
			msg := types.MsgGetLease{args[0], args[1], cliCtx.GetFromAddress()}

			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}

func GetCmdGetNShortestLease(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "getnshortestlease [UUID] [N]",
		Short: "get the N shortest remaining lease blocks for an existing UUID",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			inBuf := bufio.NewReader(cmd.InOrStdin())
			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			N, err := strconv.ParseUint(args[1], 10, 64)

			if err != nil {
				return err
			}

			msg := types.MsgGetNShortestLease{args[0], N, cliCtx.GetFromAddress()}

			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}
