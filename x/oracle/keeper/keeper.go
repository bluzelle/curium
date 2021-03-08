package keeper

import (
	"fmt"
	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/staking"
	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/privval"
	"os"
)

var logger = log.NewTMLogger(log.NewSyncWriter(os.Stdout))

var valueUpdateListeners []types.ValueUpdateListener = make([]types.ValueUpdateListener, 0)


// Keeper of the oracle store
type Keeper struct {
	sourceStoreKey sdk.StoreKey
	configStoreKey sdk.StoreKey
	proofStoreKey  sdk.StoreKey
	voteStoreKey   sdk.StoreKey
	valueStoreKey  sdk.StoreKey
	valueQueueStoreKey sdk.StoreKey
	stakingKeeper  staking.Keeper
	cdc            *codec.Codec
	paramspace     types.ParamSubspace
}

// NewKeeper creates a oracle keeper
func NewKeeper(cdc *codec.Codec, sourceStoreKey sdk.StoreKey, configStoreKey sdk.StoreKey, proofStoreKey sdk.StoreKey, voteStoreKey sdk.StoreKey, valueStoreKey sdk.StoreKey, stakingKeeper staking.Keeper, paramspace types.ParamSubspace) Keeper {
	keeper := Keeper{
		sourceStoreKey: sourceStoreKey,
		configStoreKey: configStoreKey,
		proofStoreKey:  proofStoreKey,
		voteStoreKey:   voteStoreKey,
		valueStoreKey:  valueStoreKey,
		stakingKeeper:  stakingKeeper,
		cdc:            cdc,
		//		paramspace: paramspace.WithKeyTable(types.ParamKeyTable()),
	}
	return keeper
}


// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetValidator(ctx sdk.Context, valcons string) (validator staking.Validator, found bool) {
	consAddr, _ := sdk.ConsAddressFromBech32(valcons)
	return k.stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
}

func (k Keeper) IsValidator(ctx sdk.Context) bool {
	valcons := GetValconsAddress()
	validator, _ := k.GetValidator(ctx, valcons)
	return !validator.DelegatorShares.IsNil() && !validator.DelegatorShares.IsZero()
}

func GetPrivateValidator() *privval.FilePV {
	homedir := viper.GetString(flags.FlagHome)
	return privval.LoadFilePV(homedir+"/config/priv_validator_key.json", homedir+"/data/priv_validator_state.json")
}

func GetValconsAddress() string {
	validator := GetPrivateValidator()
	address := validator.GetAddress()
	consAddress := (sdk.ConsAddress)(address)
	addressString := consAddress.String()
	return addressString
}
