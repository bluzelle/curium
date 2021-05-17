package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/curium"
	"github.com/bluzelle/curium/x/torrentClient"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc         codec.Marshaler
		storeKey    sdk.StoreKey
		memKey      sdk.StoreKey
		btClient    *torrentClient.TorrentClient
		btDirectory string
		btPort      int
		msgBroadcaster curium.MsgBroadcaster
		homeDir string
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewKeeper(
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	btDirectory string,
	btPort int,
	msgBroadcaster curium.MsgBroadcaster,
	homeDir string,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	btClient, err := torrentClient.NewTorrentClient(btDirectory, btPort)
	if err != nil {
		panic(err)
	}
	return &Keeper{
		cdc:         cdc,
		storeKey:    storeKey,
		memKey:      memKey,
		btClient:    btClient,
		btDirectory: btDirectory,
		btPort:      btPort,
		msgBroadcaster: msgBroadcaster,
		homeDir: homeDir,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) RegisterBtPeer(ctx sdk.Context) {
	status, err := curium.GetStatus()
	if err != nil {
		k.Logger(ctx).Error("unable to get node id", err)
	}
	nodeId := status.NodeInfo.Id

	myIp, err := curium.MyRemoteIp()
	if err != nil || myIp == "" {
		k.Logger(ctx).Error("unable to get my ip", err)
	}

	msg := types.MsgRegisterPeer{
		Creator: "",
		Id:      nodeId,
		Address: myIp,
		Port:    uint64(k.btPort),
	}
	result, err := k.msgBroadcaster(ctx, []sdk.Msg{&msg}, "nft")
	fmt.Println(result)
}


