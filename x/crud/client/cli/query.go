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
	"fmt"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/spf13/cobra"
	"strconv"
)

func GetQueryCmd(storeKey string, cdc *codec.Codec) *cobra.Command {
	crudQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "Querying commands for the crud module",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	crudQueryCmd.AddCommand(flags.GetCommands(
		GetCmdQRead(storeKey, cdc),
		GetCmdQHas(storeKey, cdc),
		GetCmdQKeys(storeKey, cdc),
		GetCmdQSearch(storeKey, cdc),
		GetCmdQKeyValues(storeKey, cdc),
		GetCmdQCount(storeKey, cdc),
		GetCmdQGetLease(storeKey, cdc),
		GetCmdQGetNShortestLeases(storeKey, cdc),
		GetCmdQOwner(storeKey, cdc),
	)...)

	return crudQueryCmd
}

func GetCmdQOwner(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "owner [UUID] [key]",
		Short: "owner UUID key",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			key := args[1]
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/owner/%s/%s", queryRoute, UUID, key), nil)

			if err != nil {
				fmt.Printf("could get owner for key - %s : %s\n", UUID, key)
				return nil
			}

			var out types.QueryResultOwner
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQRead(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "read [UUID] [key]",
		Short: "read UUID key",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			key := args[1]
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/read/%s/%s", queryRoute, UUID, key), nil)

			if err != nil {
				fmt.Printf("could not read key - %s : %s\n", UUID, key)
				return nil
			}
			var out types.QueryResultRead
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQHas(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "has [UUID] [key]",
		Short: "has UUID key",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			key := args[1]
			res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/has/%s/%s", queryRoute, UUID, key), nil)

			var out types.QueryResultHas
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQKeys(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "keys [UUID]",
		Short: "keys UUID",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/keys/%s", queryRoute, UUID), nil)

			var out types.QueryResultKeys
			cdc.MustUnmarshalJSON(res, &out)

			// ensure we don't lose the fact that the keys list is empty...
			if out.Keys == nil {
				out.Keys = make([]string, 0)
			}

			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQSearch(queryRoute string, cdc *codec.Codec) *cobra.Command {
	reverse := false
	cmd := &cobra.Command{
		Use:   "search [UUID] [prefix] [page] [limit]",
		Short: "search UUID prefix [page] [limit]",
		Args:  cobra.MinimumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			prefix := args[1]

			direction := "asc"
			if reverse {
				direction = "desc"
			}

			if len(args) < 3 {
				args = append(args, "1")
			}

			if len(args) < 4 {
				args = append(args, "100")
			}

			page := args[2]
			limit := args[3]
			res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/search/%s/%s/%s/%s/%s", queryRoute, UUID, prefix, page, limit, direction), nil)

			var out types.QueryResultSearch
			cdc.MustUnmarshalJSON(res, &out)

			// ensure we don't lose the fact that the keyvalues list is empty...
			if out.KeyValues == nil {
				out.KeyValues = make([]types.KeyValue, 0)
			}

			return cliCtx.PrintOutput(out)
		},
	}
	cmd.Flags().BoolVar(&reverse, "reverse", false, "Search in descending order")
	return cmd

}


func GetCmdQKeyValues(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "keyvalues [UUID]",
		Short: "keyvalues UUID",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/keyvalues/%s", queryRoute, UUID), nil)

			var out types.QueryResultKeyValues
			cdc.MustUnmarshalJSON(res, &out)

			// ensure we don't lose the fact that the keyvalues list is empty...
			if out.KeyValues == nil {
				out.KeyValues = make([]types.KeyValue, 0)
			}

			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQCount(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "count [UUID]",
		Short: "count UUID",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/count/%s", queryRoute, UUID), nil)

			var out types.QueryResultCount
			cdc.MustUnmarshalJSON(res, &out)

			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQGetLease(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "getlease [UUID] [key]",
		Short: "getlease UUID key",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			key := args[1]
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/getlease/%s/%s", queryRoute, UUID, key), nil)

			if err != nil {
				fmt.Printf("could not read key - %s : %s\n", UUID, key)
				return nil
			}
			var out types.QueryResultLease
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdQGetNShortestLeases(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "getnshortestleases [UUID] [N]",
		Short: "getnshortestleases UUID N",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			UUID := args[0]
			N, err := strconv.ParseUint(args[1], 10, 64)

			if err != nil {
				fmt.Println(err.Error())
				return nil
			}

			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/getnshortestleases/%s/%d", queryRoute, UUID, N), nil)

			var out types.QueryResultNShortestLeaseKeys
			cdc.MustUnmarshalJSON(res, &out)

			// ensure we don't lose the fact that the keys list is empty...
			if out.KeyLeases == nil {
				out.KeyLeases = make([]types.KeyLease, 0)
			}

			return cliCtx.PrintOutput(out)
		},
	}
}
