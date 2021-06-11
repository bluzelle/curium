package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/curium"
	"github.com/bluzelle/curium/x/torrentClient"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/tendermint/tendermint/libs/log"

	curiumkeeper "github.com/bluzelle/curium/x/curium/keeper"
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc            codec.Marshaler
		storeKey       sdk.StoreKey
		memKey         sdk.StoreKey
		btClient       *torrentClient.TorrentClient
		btDirectory    string
		btPort         int
		msgBroadcaster curium.MsgBroadcaster
		homeDir        string
		keyringReader  *curium.KeyRingReader
		curiumKeeper   *curiumkeeper.Keeper
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
	keyringReader *curium.KeyRingReader,
	curiumKeeper *curiumkeeper.Keeper,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	btClient, err := torrentClient.NewTorrentClient(btDirectory, btPort)
	if ensureNftUserExists(keyringReader) == false {
		panic("nft user does not exist in keyring")
	}
	if err != nil {
		panic(err)
	}
	return &Keeper{
		cdc:            cdc,
		storeKey:       storeKey,
		memKey:         memKey,
		btClient:       btClient,
		btDirectory:    btDirectory,
		btPort:         btPort,
		msgBroadcaster: msgBroadcaster,
		homeDir:        homeDir,
		keyringReader:  keyringReader,
		curiumKeeper:   curiumKeeper,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func ensureNftUserExists(reader *curium.KeyRingReader) bool {
	_, err := reader.GetAddress("nft")
	return err == nil
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetPeerStore(ctx sdk.Context) prefix.Store {
	return prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PeerKey))
}

func (k Keeper) CheckIsNftAdmin(address string) error {
	nftAdmin, err := k.keyringReader.GetAddress("nft")
	if err != nil {
		return sdkerrors.New("nft", 1, fmt.Sprintf("peer request with invalid admin: %s", err.Error()))
	}
	if address != nftAdmin.String() {
		return sdkerrors.New("nft", 1, fmt.Sprintf("peer request with invalid admin: %s", address))
	}
	return nil
}

func (k Keeper) GetMyNodeId(ctx sdk.Context) string {
	status, err := k.curiumKeeper.GetStatus()
	if err != nil {
		k.Logger(ctx).Error("unable to get node id", err)
	}
	return status.NodeInfo.Id
}

func (k Keeper) BroadcastRegisterBtPeer(ctx sdk.Context) {
	nodeId := k.GetMyNodeId(ctx)

	myIp, err := k.curiumKeeper.MyRemoteIp()
	if err != nil || myIp == "" {
		k.Logger(ctx).Error("unable to get my ip", err)
	}

	creator, err := k.keyringReader.GetAddress("nft")
	if err != nil {
		k.Logger(ctx).Error("unable to get address of nft account")
	}
	msg := types.MsgRegisterPeer{
		Creator: creator.String(),
		Id:      nodeId,
		Address: myIp,
		Port:    uint64(k.btPort),
	}
	result, err := k.msgBroadcaster(ctx, []sdk.Msg{&msg}, "nft")
	if err != nil {
		k.Logger(ctx).Error("unable to broadcast register peer message", err)
	}
	if result != nil {
		fmt.Println(result)
	}
}
