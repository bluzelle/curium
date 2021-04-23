package ante

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func CalculateGasFee(tx sdk.Tx, ctx sdk.Context) sdk.Coins {
	var gasPrices sdk.Dec
	gasPrices = ctx.MinGasPrices().AmountOf("ubnt")
	// If I can't get the gas price from the context, get it from the transaction
	if gasPrices.IsZero() {
		stdTx := tx.(sdk.FeeTx)
		fee := stdTx.GetFee().AmountOf("ubnt").Int64()
		gas := stdTx.GetGas()
		gasPrice := float64(fee) / float64(gas)
		gasPrices, _ = sdk.NewDecFromStr(fmt.Sprintf("%f", gasPrice))
	}
	gasConsumed := ctx.GasMeter().GasConsumed()
	gasFee := gasPrices.MulInt64(int64(gasConsumed)).RoundInt64()
	return sdk.NewCoins(sdk.NewCoin("ubnt", sdk.NewInt(gasFee)))
}
