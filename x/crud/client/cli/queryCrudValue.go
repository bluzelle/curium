package cli

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdListCrudValue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-CrudValue",
		Short: "list all CrudValue",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllCrudValueRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.CrudValueAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowCrudValue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-CrudValue [uuid] [key]",
		Short: "shows a CrudValue",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetCrudValueRequest{
				Uuid: args[0],
				Key:  args[1],
			}

			res, err := queryClient.CrudValue(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
