package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RegisterPeer(goCtx context.Context, msg *types.MsgRegisterPeer) (*types.MsgRegisterPeerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := k.CheckIsNftAdmin(msg.Creator)
	if err != nil {
		return nil, err
	}

	store := k.GetPeerStore(ctx)
	var peer types.Peer
	peer.Id = msg.Id
	peer.Address = msg.Address
	peer.Port = msg.Port
	store.Set([]byte(msg.Id), k.cdc.MustMarshalBinaryBare(&peer))

	return &types.MsgRegisterPeerResponse{}, nil
}
