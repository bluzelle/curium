package aggregator

import (
	"fmt"
	"github.com/bluzelle/curium/app/ante/gasmeter"

	"github.com/bluzelle/curium/x/aggregator/keeper"
	"github.com/bluzelle/curium/x/aggregator/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewHandler creates an sdk.Handler for all the aggregator type messages
func NewHandler(k keeper.Keeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		ctx = ctx.WithEventManager(sdk.NewEventManager()).WithGasMeter(gasmeter.NewFreeGasMeter(0))
		switch msg := msg.(type) {
		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName,  msg)
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	}
}



