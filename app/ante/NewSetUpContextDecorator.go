package ante

import (
	"fmt"
	"github.com/bluzelle/curium/app/ante/gasmeter"
	"github.com/bluzelle/curium/x/crud"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"strings"
)

var (
	_ GasTx = (*types.StdTx)(nil) // assert StdTx implements GasTx
)

// GasTx defines a Tx with a GetGas() method which is needed to use SetUpContextDecorator
type GasTx interface {
	sdk.Tx
	GetGas() uint64
}

// SetUpContextDecorator sets the GasMeter in the Context and wraps the next AnteHandler with a defer clause
// to recover from any downstream OutOfGas panics in the AnteHandler chain to return an error with information
// on gas provided and gas used.
// CONTRACT: Must be first decorator in the chain
// CONTRACT: Tx must implement GasTx interface
type SetUpContextDecorator struct{
	gasMeterKeeper *gasmeter.GasMeterKeeper
	supplyKeeper banktypes.SupplyKeeper
	accountKeeper acctypes.AccountKeeper
	crudKeeper	crud.Keeper
	minGasPriceCoins sdk.DecCoins
}

func NewSetUpContextDecorator(gasMeterKeeper *gasmeter.GasMeterKeeper, supplyKeeper banktypes.SupplyKeeper, accountKeeper acctypes.AccountKeeper, crudKeeper crud.Keeper, minGasPriceCoins sdk.DecCoins) SetUpContextDecorator {
	return SetUpContextDecorator{
		gasMeterKeeper:   gasMeterKeeper,
		supplyKeeper:       supplyKeeper,
		accountKeeper:    accountKeeper,
		crudKeeper: crudKeeper,
		minGasPriceCoins: minGasPriceCoins,
	}
}

func (sud SetUpContextDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	// all transactions must implement GasTx

	gasTx, ok := tx.(GasTx)


	if !ok {
		// Set a gas meter with limit 0 as to prevent an infinite gas meter attack
		// during runTx.
		newCtx, _ = SetGasMeter(simulate, ctx, 0, tx, sud.gasMeterKeeper, sud.supplyKeeper, sud.accountKeeper, sud.crudKeeper, sud.minGasPriceCoins)
		return newCtx, sdkerrors.Wrap(sdkerrors.ErrTxDecode, "Tx must be GasTx")
	}

	newCtx, err = SetGasMeter(simulate, ctx, gasTx.GetGas(), tx, sud.gasMeterKeeper, sud.supplyKeeper, sud.accountKeeper, sud.crudKeeper, sud.minGasPriceCoins)

	if err != nil {
		return ctx, err
	}

	// Decorator will catch an OutOfGasPanic caused in the next antehandler
	// AnteHandlers must have their own defer/recover in order for the BaseApp
	// to know how much gas was used! This is because the GasMeter is created in
	// the AnteHandler, but if it panics the context won't be set properly in
	// runTx's recover call.
	defer func() {
		if r := recover(); r != nil {
			switch rType := r.(type) {
			case sdk.ErrorOutOfGas:
				log := fmt.Sprintf(
					"out of gas in location: %v; gasWanted: %d, gasUsed: %d",
					rType.Descriptor, gasTx.GetGas(), newCtx.GasMeter().GasConsumed())

				err = sdkerrors.Wrap(sdkerrors.ErrOutOfGas, log)
			default:
				panic(r)
			}
		}
	}()

	return next(newCtx, tx, simulate)
}

// SetGasMeter returns a new context with a gas meter set from a given context.
func SetGasMeter(simulate bool, ctx sdk.Context, gasLimit uint64, tx sdk.Tx, gk *gasmeter.GasMeterKeeper, supplyKeeper banktypes.SupplyKeeper, accountKeeper acctypes.AccountKeeper, crudKeeper crud.Keeper, minGasPriceCoins sdk.DecCoins) (sdk.Context, error) {
	// In various cases such as simulation and during the genesis block, we do not
	// meter any gas utilization.
	if simulate || ctx.BlockHeight() == 0 {
		return ctx.WithGasMeter(sdk.NewInfiniteGasMeter()), nil
	}

	feeTx := tx.(ante.FeeTx)
	maxGas := feeTx.GetGas()

	maxGasInt := sdk.NewIntFromUint64(maxGas).ToDec()
	feeInt := feeTx.GetFee().AmountOf("ubnt").ToDec()


	gasPrice := feeInt.Quo(maxGasInt)
	gasPriceCoin := sdk.NewDecCoinFromDec("ubnt", gasPrice)
	gasPriceCoins := sdk.NewDecCoins(gasPriceCoin)

	feePayer := feeTx.FeePayer()

	whiteList := getWhitelist(ctx, crudKeeper)
	fmt.Println("WHITELIST", whiteList)
	msgModule := tx.GetMsgs()[0].Route()
	fmt.Println("MSGMODULE", msgModule)
	isOnWhiteList := isOnWhiteList(msgModule, feePayer.String(), whiteList)
	fmt.Println("FEE PAYER", feePayer.String())
	fmt.Println(isOnWhiteList)
	if gasPriceCoins.AmountOf("ubnt").LT(minGasPriceCoins.AmountOf("ubnt")) {
		return ctx, sdkerrors.New("curium", 2, "Specified gas price too low")
	}


	if isOnWhiteList && !simulate && !ctx.IsCheckTx() {
		fmt.Println("ON WHITE LIST, ASSIGNING GAS METER")
		gm := gasmeter.NewFreeGasMeter(gasLimit)
		gk.AddGasMeter(&gm)
		return ctx.WithGasMeter(gm), nil
	}

	if msgModule == "crud" && !simulate && !ctx.IsCheckTx() {
		gm := gasmeter.NewChargingGasMeter(supplyKeeper, accountKeeper, gasLimit, feePayer, gasPriceCoins)

		gk.AddGasMeter(&gm)
		return ctx.WithGasMeter(gm), nil
	}

	gm := gasmeter.NewFreeGasMeter(gasLimit)
	gk.AddGasMeter(&gm)

	return ctx.WithGasMeter(gm), nil
}

func getWhitelist (ctx sdk.Context, crudKeeper crud.Keeper) (string) {
	store := crudKeeper.GetKVStore(ctx)
	whiteListBytes := store.Get([]byte("WHITELIST"))

	return string(whiteListBytes)
}

func isOnWhiteList (msgModule string, sender string, whiteList string) bool {
	onWhiteList := strings.Contains(whiteList, sender)
	return (msgModule == "crud" || msgModule == "oracle" || msgModule == "nft") && onWhiteList

}
