package ante

import (
	"github.com/bluzelle/curium/x/tax"
	taxAnte "github.com/bluzelle/curium/x/tax/ante"
	types2 "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/gov/types"
)

func NewAnteHandler(
	accountKeeper keeper.AccountKeeper,
	supplyKeeper types.SupplyKeeper,
	taxKeeper tax.Keeper,
	bankKeeper bank.Keeper,
	sigGasConsumer ante.SignatureVerificationGasConsumer,
) types2.AnteHandler {
	return types2.ChainAnteDecorators(
		NewSetUpContextDecorator(), // outermost AnteDecorator. SetUpContext must be called first
		ante.NewMempoolFeeDecorator(),
		ante.NewValidateBasicDecorator(),
		ante.NewValidateMemoDecorator(accountKeeper),
		ante.NewConsumeGasForTxSizeDecorator(accountKeeper),
		ante.NewSetPubKeyDecorator(accountKeeper), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(accountKeeper),
		NewDeductFeeDecorator(accountKeeper, supplyKeeper),
		ante.NewSigGasConsumeDecorator(accountKeeper, sigGasConsumer),
		ante.NewSigVerificationDecorator(accountKeeper),
		taxAnte.NewTaxDecorator(
			accountKeeper,
				supplyKeeper,
				taxKeeper,
				bankKeeper,
			),
		ante.NewIncrementSequenceDecorator(accountKeeper), // innermost AnteDecorator
	)
}