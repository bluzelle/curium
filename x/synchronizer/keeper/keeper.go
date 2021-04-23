package keeper

import (
	"fmt"
	crudkeeper "github.com/bluzelle/curium/x/crud/keeper"
	crudtypes "github.com/bluzelle/curium/x/crud/types"
	curiumkeeper "github.com/bluzelle/curium/x/curium/keeper"
	votingkeeper "github.com/bluzelle/curium/x/voting/keeper"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/synchronizer/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/Keeper/import
)

type (
	Keeper struct {
		cdc          codec.Marshaler
		storeKey     sdk.StoreKey
		memKey       sdk.StoreKey
		AccKeeper    authkeeper.AccountKeeper
		CrudKeeper   crudkeeper.Keeper
		VotingKeeper votingkeeper.Keeper
		CuriumKeeper curiumkeeper.Keeper
		KeyringDir   string
		// this line is used by starport scaffolding # ibc/Keeper/attribute
	}
)

func NewKeeper(
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	AccKeeper authkeeper.AccountKeeper,
	CrudKeeper crudkeeper.Keeper,
	VotingKeeper votingkeeper.Keeper,
	CuriumKeeper curiumkeeper.Keeper,
	KeyringDir string,
	// this line is used by starport scaffolding # ibc/Keeper/parameter
) *Keeper {
	return &Keeper{
		cdc:          cdc,
		storeKey:     storeKey,
		memKey:       memKey,
		AccKeeper:    AccKeeper,
		CrudKeeper:   CrudKeeper,
		VotingKeeper: VotingKeeper,
		CuriumKeeper: CuriumKeeper,
		KeyringDir:   KeyringDir,
		// this line is used by starport scaffolding # ibc/Keeper/return
	}
}

func (k Keeper) GetKeyringDir() string {
	return k.KeyringDir
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetCdc() codec.Marshaler {
	return k.cdc
}

func (k Keeper) ExecuteOperation(ctx *sdk.Context, syncOp *types.SyncOperation) {
	switch syncOp.Op {
	case "create":
		metaBytes := k.cdc.MustMarshalBinaryBare(&types.SynchronizerValueMeta{
			Bookmark: syncOp.Bookmark,
		})
		k.CrudKeeper.SetCrudValue(ctx, crudtypes.CrudValue{
			Creator:  syncOp.Creator,
			Uuid:     syncOp.Uuid,
			Key:      syncOp.Key,
			Value:    syncOp.Value,
			Lease:    &crudtypes.Lease{Years: 1},
			Height:   ctx.BlockHeight(),
			Metadata: metaBytes,
		})
		break

	case "update":
		metaBytes := k.cdc.MustMarshalBinaryBare(&types.SynchronizerValueMeta{
			Bookmark: syncOp.Bookmark,
		})
		k.CrudKeeper.SetCrudValue(ctx, crudtypes.CrudValue{
			Creator:  syncOp.Creator,
			Uuid:     syncOp.Uuid,
			Key:      syncOp.Key,
			Value:    syncOp.Value,
			Lease:    &crudtypes.Lease{Years: 1},
			Height:   ctx.BlockHeight(),
			Metadata: metaBytes,
		})
		break
	case "delete":
		k.CrudKeeper.RemoveCrudValue(ctx, syncOp.Uuid, syncOp.Key)
	}
}
