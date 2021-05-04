package rest

import (
	"encoding/json"
	"fmt"
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"os"
)


func isNftFullyReplicatedHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		nftBytes, _, err := clientCtx.QueryWithData(fmt.Sprintf("custom/%s/get-nft/%s", types.QuerierRoute, id), nil)
		location := clientCtx.HomeDir + "/nft/" + id
		if _, err := os.Stat(location); os.IsNotExist(err) {
			location = clientCtx.HomeDir + "/nft-upload/" + id
			if _, err := os.Stat(location); os.IsNotExist(err) {
				rest.WriteErrorResponse(w, http.StatusNotFound, "File does not exist")
				return
			}
		}

		var nft map[string]interface{}

		json.Unmarshal(nftBytes, &nft)
		w.Header().Set("content-type", nft["mime"].(string))

		reader, err := os.Open(location)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		io.Copy(w, reader)
	}
}
