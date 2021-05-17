package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/torrentClient"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc       codec.Marshaler
		homeDir   string
		storeKey  sdk.StoreKey
		memKey    sdk.StoreKey
		accKeeper *authkeeper.AccountKeeper
		btClient  *torrentClient.TorrentClient
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewKeeper(
	cdc codec.Marshaler,
	homeDir string,
	storeKey,
	memKey sdk.StoreKey,
	accKeeper *authkeeper.AccountKeeper,
	btDirectory string,
	btPort int,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	btClient, err := torrentClient.NewTorrentClient(btDirectory, btPort)
	if err != nil {
		panic(err)
	}
	return &Keeper{
		cdc:       cdc,
		homeDir:   homeDir,
		storeKey:  storeKey,
		memKey:    memKey,
		accKeeper: accKeeper,
		btClient: btClient,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
