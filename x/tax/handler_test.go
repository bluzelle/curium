package tax_test

import (
	"bytes"
	"testing"

	"github.com/bluzelle/curium/app"
	"github.com/bluzelle/curium/x/tax"
	"github.com/bluzelle/curium/x/tax/internal/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
)

func Test_handleMsgSetBp(t *testing.T) {
	tApp := app.NewTestApp()
	ctx := tApp.NewContext(true, abci.Header{})
	tax.InitGenesis(ctx, tApp.GetTaxKeeper(), tax.DefaultGenesisState())

	collector, err := sdk.AccAddressFromBech32("bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw")
	if err != nil {
		panic(err)
	}

	addr1 := sdk.AccAddress([]byte("my----------address1"))

	// try setting Bp with correct owner
	msg1 := types.NewMsgSetBp(11, 11, collector)
	_, err = tax.HandleMsgSetBp(ctx, tApp.GetTaxKeeper(), msg1)
	require.NoError(t, err)
	feebp1 := tApp.GetTaxKeeper().GetFeeBp(ctx)
	require.True(t, feebp1 == 11)
	trfbp1 := tApp.GetTaxKeeper().GetTransferBp(ctx)
	require.True(t, trfbp1 == 11)

	// try setting Bp with incorrect owner
	msg2 := types.NewMsgSetBp(12, 12, addr1)
	_, err = tax.HandleMsgSetBp(ctx, tApp.GetTaxKeeper(), msg2)
	require.Error(t, err)
	feebp2 := tApp.GetTaxKeeper().GetFeeBp(ctx)
	require.True(t, feebp2 == 11) // not changed
	trfbp2 := tApp.GetTaxKeeper().GetTransferBp(ctx)
	require.True(t, trfbp2 == 11) // not changed
}

func Test_handleMsgSetCollector(t *testing.T) {
	tApp := app.NewTestApp()
	ctx := tApp.NewContext(true, abci.Header{})
	tax.InitGenesis(ctx, tApp.GetTaxKeeper(), tax.DefaultGenesisState())

	collector, err := sdk.AccAddressFromBech32("bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw")
	if err != nil {
		panic(err)
	}

	addr1 := sdk.AccAddress([]byte("my----------address1"))

	// try setting collector with incorrect owner
	msg1 := types.NewMsgSetCollector(addr1, addr1)
	_, err = tax.HandleMsgSetCollector(ctx, tApp.GetTaxKeeper(), msg1)
	require.Error(t, err)
	owner1 := tApp.GetTaxKeeper().GetCollector(ctx)
	require.True(t, !bytes.Equal(owner1, addr1))

	// try setting collector with correct owner
	msg2 := types.NewMsgSetCollector(addr1, collector)
	_, err = tax.HandleMsgSetCollector(ctx, tApp.GetTaxKeeper(), msg2)
	require.NoError(t, err)
	owner2 := tApp.GetTaxKeeper().GetCollector(ctx)
	require.True(t, bytes.Equal(owner2, addr1))
}
