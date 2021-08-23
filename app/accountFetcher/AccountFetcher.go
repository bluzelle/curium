package accountFetcher

import (
	"encoding/json"
	"github.com/bluzelle/curium/app/accountFetcher/types"
	"github.com/bluzelle/curium/x/curium"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/x/auth"
	abci "github.com/tendermint/tendermint/abci/types"
)

type BaseAppWithQuery interface {
	 Query(req abci.RequestQuery) abci.ResponseQuery

}

func AccountFetcher(app BaseAppWithQuery, cdc *codec.Codec, cliHome string) types.AccountFetcherFn {
	krReader := curium.NewKeyringReader(cliHome)
	return func(name string) (types.AcctInfo, error){
		addr, err := krReader.GetAddress(name)

		if err != nil {
			return types.AcctInfo{}, err
		}

		d, _ := json.Marshal(map[string]string{
			"Address": addr.String(),
		})
		x := app.Query(abci.RequestQuery{
			Data: d,
			Path: "custom/acc/account",
		})

		var resp auth.BaseAccount
		cdc.MustUnmarshalJSON(x.Value, &resp)



		return types.AcctInfo{
			Name: name,
			Address: addr.String(),
			AccNum:  resp.GetAccountNumber(),
			Seq:     resp.GetSequence(),
		}, nil
	}
}
