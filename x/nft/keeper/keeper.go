package keeper

import (
	"errors"
	"fmt"
	"github.com/bluzelle/curium/x/crud"
	"github.com/bluzelle/curium/x/curium"
	"github.com/bluzelle/curium/x/curium/keeper"
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/tendermint/tendermint/libs/log"
	"os"
	"strings"
	"sync"
)

var btClient     *TorrentClient


type (
	Keeper struct {
		Cdc            *codec.Codec
		storeKey       sdk.StoreKey
		memKey     sdk.StoreKey
		NftBaseDir string
		NftUsername string
		BtPort     int
		MsgBroadcaster curium.MsgBroadcaster
		curiumKeeper   *curium.Keeper
		crudKeeper     *crud.Keeper
		KeyringReader *keeper.KeyringReader
		UploadTokenManager *types.UploadTokenManager
	}
)

func NewKeeper (
	cdc *codec.Codec,
	storeKey,
	memKey sdk.StoreKey,
	nftUsername string,
	nftBaseDir string,
	btPort int,
	msgBroadcaster curium.MsgBroadcaster,
	curiumKeeper *curium.Keeper,
	crudKeeper *crud.Keeper,
	keyringReader *keeper.KeyringReader,
	uploadTokenManager *types.UploadTokenManager,
) *Keeper {

	return &Keeper{
		Cdc:            cdc,
		storeKey:       storeKey,
		memKey:         memKey,
		NftUsername: nftUsername,
		NftBaseDir:    nftBaseDir,
		BtPort:         btPort,
		MsgBroadcaster: msgBroadcaster,
		curiumKeeper:   curiumKeeper,
		crudKeeper: crudKeeper,
		KeyringReader:  keyringReader,
		UploadTokenManager: uploadTokenManager,
	}
}

func (k Keeper) IsAuthorized(ctx sdk.Context, addr sdk.AccAddress) bool {
	whitelist := k.crudKeeper.GetValue(ctx, k.crudKeeper.GetKVStore(ctx), "bluzelle", "nft-whitelist").Value
	return strings.Contains(whitelist, addr.String())
}

func (k Keeper) GetNftUploadDir() string {
	return k.NftBaseDir + "/nft-upload"
}

func (k Keeper) GetNftDir() string {
	return k.NftBaseDir + "/nft"
}

func (k *Keeper) GetBtPort() int {
	return k.BtPort
}

func (k *Keeper) GetBtClient() (*TorrentClient) {
	return btClient
}

func (k *Keeper) SetBtClient(newBtClient *TorrentClient) {
	btClient = newBtClient
}

func (k Keeper) GetCdc() *codec.Codec {
	return k.Cdc
}

func (k Keeper) CheckNftUserExists(ctx sdk.Context, reader *curium.KeyringReader, accKeeper auth.AccountKeeper) error {
	address, err := reader.GetAddress(k.NftUsername)

	if err != nil {
		return err
	}

	account := accKeeper.GetAccount(ctx, address)

	if account == nil {
		return errors.New("Nft account does not exist yet")
	}

	return nil
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) getPeerStore(ctx sdk.Context) prefix.Store {
	return prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PeerKey))
}

func (k Keeper) AddPeer(ctx sdk.Context, peer *types.Peer) {
	store := k.getPeerStore(ctx)
	store.Set([]byte(peer.Id), k.Cdc.MustMarshalBinaryBare(peer))
}

func (k Keeper) GetPeers(ctx sdk.Context) []types.Peer {
	store := k.getPeerStore(ctx)
	iterator := store.Iterator(nil, nil)
	var peers[]types.Peer
	for ;iterator.Valid(); iterator.Next() {
		var peer types.Peer
		k.Cdc.MustUnmarshalBinaryBare(iterator.Value(), &peer)
		peers = append(peers, peer)
	}
	return peers
}

func (k Keeper) CheckIsNftAdmin(address string) error {
	nftAdmin, err := k.KeyringReader.GetAddress(k.NftUsername)
	if err != nil {
		return sdkerrors.New("nft", 1, fmt.Sprintf("peer request with invalid admin: %s", err.Error()))
	}
	if address != nftAdmin.String() {
		return sdkerrors.New("nft", 1, fmt.Sprintf("peer request with invalid admin: %s", address))
	}
	return nil
}

func (k Keeper) GetMyNodeId(ctx sdk.Context) (string, error) {
	status, err := k.curiumKeeper.GetStatus()
	if err != nil || status == nil {
		logger := k.Logger(ctx)
		logger.Error("unable to get node id", err)
		return "", err
	}
	return status.NodeInfo.Id, nil
}

func (k Keeper) BroadcastRegisterBtPeer(ctx sdk.Context) error {
	nodeId, err := k.GetMyNodeId(ctx)
	if err != nil {
		return err
	}

	myIp, err := k.curiumKeeper.MyRemoteIp()
	if err != nil || myIp == "" {
		return err
	}


	creator, err := k.KeyringReader.GetAddress(k.NftUsername)
	if err != nil {
		return err
	}
	msg := types.MsgRegisterPeer{
		Creator: creator.String(),
		Id:      nodeId,
		Address: myIp,
		Port:    uint64(k.BtPort),
	}

	result :=  <- k.MsgBroadcaster([]sdk.Msg{&msg}, k.NftUsername)

	if result != nil && result.Error != nil {
		k.Logger(ctx).Error("unable to broadcast register peer message", err)
		return err
	}

	return nil
}

func (k Keeper) EnsureNftDirExists () {
	if _, err := os.Stat(k.GetNftDir()); err != nil {
		os.Mkdir(k.GetNftDir(), 0777)
	}
}

var newBtClientOnce sync.Once

func EnsureBtClient(ctx sdk.Context, k Keeper) {
	newBtClientOnce.Do(func() {
		startTorrentClient(ctx, k)
	})
}

func startTorrentClient(ctx sdk.Context, k Keeper) {
	k.EnsureNftDirExists()
	btClient, err := NewTorrentClient(k.GetNftDir(), k.GetBtPort())
	if err != nil {
		k.Logger(ctx).Error("Error creating btClient", "error", err)
		return
	}

	k.SetBtClient(btClient)
}


