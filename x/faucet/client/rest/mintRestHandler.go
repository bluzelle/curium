package rest

import (
	"fmt"
	"github.com/bluzelle/curium/x/faucet/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"net/http"
)


func mintHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		address := mux.Vars(r)["address"]
		var mnemonic string

		if len(address) > 0 {
			_, err := sdk.AccAddressFromBech32(address)
			if err != nil {
				rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
				return
			}
		}

		if len(address) == 0 {
			kr := keyring.NewInMemory()
			info, m, err := kr.NewMnemonic("temp", keyring.English, "m/44'/118'/0'/0/0", hd.Secp256k1)
			mnemonic = m
			if err != nil {
				rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
				return
			}

			_ = mnemonic
			address = info.GetAddress().String()

		}




		_, _, err := clientCtx.QueryWithData(fmt.Sprintf("custom/%s/mint", types.QuerierRoute), []byte(address))

		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}


		res := map[string]string{
			"address": address,
			"mnemonic": mnemonic,
		}
		rest.PostProcessResponse(w, clientCtx, res)

		//		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}
