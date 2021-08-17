package gasmeter

import sdk "github.com/cosmos/cosmos-sdk/types"

type ChargingGasMeterInterface interface {
	Charge(ctx sdk.Context) error
	GetGasPrice() sdk.DecCoins
}