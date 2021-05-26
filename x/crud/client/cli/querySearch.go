package cli

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdSearchQuery() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "search [uuid] [searchString]",
		Short: "search by key in specified uuid",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QuerySearchRequest{
				Uuid:         args[0],
				SearchString: args[1],
			}

			res, err := queryClient.Search(context.Background(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
