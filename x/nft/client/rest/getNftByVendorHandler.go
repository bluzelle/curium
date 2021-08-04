package rest

import (
	"encoding/json"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"net/http"
	"os"

)

func getNftByVendorHandler(clientCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		vendor := mux.Vars(r)["vendor"]
		clientCtx.HomeDir = ".blzd"

		filename := vendor + "-" + id

		location := clientCtx.HomeDir + "/nft/" + filename
		infoLocation := clientCtx.HomeDir + "/nft/" + filename + ".info"
		if _, err := os.Stat(location); os.IsNotExist(err) {
			rest.WriteErrorResponse(w, http.StatusNotFound, "File does not exist")
			return
		}

		if _, err := os.Stat(infoLocation); os.IsNotExist(err) {
			rest.WriteErrorResponse(w, http.StatusNotFound, "File information does not exist")
			return
		}


		var info map[string]interface{}

		infoBytes, err := ioutil.ReadFile(infoLocation)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, "Unable to read info file")
		}

		json.Unmarshal(infoBytes, &info)

		w.Header().Set("content-type", info["Mime"].(string))

		reader, err := os.Open(location)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		io.Copy(w, reader)
	}
}


