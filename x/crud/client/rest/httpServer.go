package rest

import (
	"fmt"
	"github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"mime"
	"net/http"
	"strings"
)

func httpHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		uuid := mux.Vars(r)["uuid"]
		key := mux.Vars(r)["key"]

		data, _, err := clientCtx.QueryWithData(fmt.Sprintf("custom/%s/file/%s/%s", types.QuerierRoute, uuid, key), nil)

		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}

		parts := strings.Split(key, ".")

        contentType := mime.TypeByExtension("." + parts[len(parts) - 1])
		w.Header().Set("content-type", contentType)

		w.Write(data)
	}
}
