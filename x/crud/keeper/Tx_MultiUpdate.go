package keeper

import (
	"context"


	"github.com/bluzelle/curium/x/crud/types"

)

func (k msgServer) MultiUpdate(goCtx context.Context, msg *types.MsgMultiUpdate) (*types.MsgMultiUpdateResponse, error) {


	for i := range msg.KeyValues[:] {
		newUpdateRequest := types.NewMsgUpdate(
			msg.Creator,
			msg.Uuid,
			msg.KeyValues[i].Key,
			msg.KeyValues[i].Value,
			msg.KeyValues[i].Lease,
			)

		_, err := k.Update(goCtx, newUpdateRequest)
		if err != nil {
			return nil, err
		}

	}

	return &types.MsgMultiUpdateResponse{}, nil
}
