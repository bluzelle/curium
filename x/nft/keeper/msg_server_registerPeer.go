package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RegisterPeer(goCtx context.Context, msg *types.MsgRegisterPeer) (*types.MsgRegisterPeerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := k.GetPeerStore(ctx)
	var peer types.Peer
	peer.Id = msg.Id
	peer.Address = msg.Address
	peer.Port = msg.Port
	store.Set([]byte(msg.Id), k.cdc.MustMarshalBinaryBare(&peer))

	if k.GetMyNodeId(ctx) != msg.Id {
		k.btClient.AddPeer(msg.Id, msg.Address, int(msg.Port))
	}

	return &types.MsgRegisterPeerResponse{}, nil
}
