package ante

import (
	"github.com/bluzelle/curium/app/ante/gasmeter"
	"github.com/bluzelle/curium/x/crud"
	nft "github.com/bluzelle/curium/x/nft/keeper"
	"github.com/bluzelle/curium/x/tax"
	sdk "github.com/cosmos/cosmos-sdk/types"
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
	crudKeeper crud.Keeper,
	nftKeeper  *nft.Keeper,
	sigGasConsumer ante.SignatureVerificationGasConsumer,
	gasMeterKeeper *gasmeter.GasMeterKeeper,
	minGasPriceCoins sdk.DecCoins,
) sdk.AnteHandler {
	return sdk.ChainAnteDecorators(
		NewSetUpContextDecorator(gasMeterKeeper, supplyKeeper, accountKeeper, crudKeeper, minGasPriceCoins), // outermost AnteDecorator. SetUpContext must be called first
		NewMempoolFeeDecorator(),
		ante.NewValidateBasicDecorator(),
		ante.NewValidateMemoDecorator(accountKeeper),
		ante.NewConsumeGasForTxSizeDecorator(accountKeeper),
		ante.NewSetPubKeyDecorator(accountKeeper), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(accountKeeper),
		ante.NewSigGasConsumeDecorator(accountKeeper, sigGasConsumer),
		ante.NewSigVerificationDecorator(accountKeeper),
		NewTaxDecorator(
			accountKeeper,
				supplyKeeper,
				taxKeeper,
				bankKeeper,
			),
		ante.NewIncrementSequenceDecorator(accountKeeper), // innermost AnteDecorator
		NewNftChecksAnteHandler(*nftKeeper),
	)
}