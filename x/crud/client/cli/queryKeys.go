package cli

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdKeysQuery() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "keys [uuid]",
		Short: "query all keys existing under specified uuid",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryKeysRequest{
				Uuid: args[0],
				Pagination: &types.PagingRequest{
					StartKey: string(pageReq.Key),
					Limit:    pageReq.Limit,
				},
			}

			res, err := queryClient.Keys(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}


