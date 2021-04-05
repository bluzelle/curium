package cli

import (
	"context"
	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdListSource() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-source",
		Short: "list all source",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllSourceRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.SourceAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowSource() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-source [id]",
		Short: "shows a source",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			name := args[0]

			params := &types.QueryGetSourceRequest{
				Name: name,
			}

			res, err := queryClient.Source(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
