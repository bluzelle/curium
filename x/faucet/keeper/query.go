package keeper

import (
	// this line is used by starport scaffolding # 1
	"github.com/bluzelle/curium/x/faucet/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	abci "github.com/tendermint/tendermint/abci/types"
)

func NewQuerier(k Keeper, legacyQuerierCdc *codec.LegacyAmino) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		var (
			res []byte
			err error
		)

		switch path[0] {
		case "mint":
			return mintHandler(k, ctx, req.Data)
		// this line is used by starport scaffolding # 1
		default:
			err = sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "unknown %s query endpoint: %s", types.ModuleName, path[0])
		}

		return res, err
	}
}

func mintHandler(k Keeper, ctx sdk.Context, data []byte) ([]byte, error) {
	addr, err := k.keyringReader.GetAddress("minter")
	if err != nil {
		return nil, err
	}

	msg := types.MsgMint{
		Creator: addr.String(),
		Address: string(data),
	}

	_, err = k.msgBroadcaster(ctx, []sdk.Msg{&msg}, "minter")
	// Really bad hack for now until I can find out why this timeout is happening

	if err != nil && err.Error() != "rpc error: code = DeadlineExceeded desc = context deadline exceeded" {
		return nil, sdkerrors.New("faucet", 2, err.Error())
	}


	return []byte{}, nil
}
