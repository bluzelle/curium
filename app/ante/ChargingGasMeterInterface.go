package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

type ChargingGasMeterInterface interface {
	GasConsumed() sdk.Gas
	GasConsumedToLimit() sdk.Gas
	Limit() sdk.Gas
	ConsumeGas(amount sdk.Gas, descriptor string)
	IsPastLimit() bool
	IsOutOfGas() bool
	String() string
	Charge(ctx *sdk.Context, bankKeeper authtypes.BankKeeper, accountKeeper authante.AccountKeeper) error
}