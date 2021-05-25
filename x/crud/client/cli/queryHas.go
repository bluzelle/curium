package cli

import (
	"context"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdHasQuery() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "has [uuid] [key]",
		Short: "uuid key",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryHasRequest{
				Uuid: args[0],
				Key: args[1],
			}

			res, err := queryClient.Has(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
