package rest

import (
	"encoding/json"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"os"
)

func getNftDataHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		location := clientCtx.HomeDir + "/nft/" + id
		infoLocation := clientCtx.HomeDir + "/nft/" + id + ".info"
		if _, err := os.Stat(location); os.IsNotExist(err) {
				rest.WriteErrorResponse(w, http.StatusNotFound, "File does not exist")
				return
		}

		if _, err := os.Stat(infoLocation); os.IsNotExist(err) {
			rest.WriteErrorResponse(w, http.StatusNotFound, "File information does not exist")
			return
		}


		var info map[string]interface{}

		infoBytes, err := os.ReadFile(infoLocation)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, "Unable to read info file")
		}

		json.Unmarshal(infoBytes, &info)

		w.Header().Set("content-type", info["mime"].(string))

		reader, err := os.Open(location)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		io.Copy(w, reader)
	}
}
