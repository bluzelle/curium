package rest

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"os"
)

func uploadNftHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		hash := mux.Vars(r)["hash"]
		chunkNum := mux.Vars(r)["chunkNum"]

		uploadPath := clientCtx.HomeDir + "/nft-upload"
		os.MkdirAll(uploadPath, os.ModePerm)

		fileWriter, err := os.Create(uploadPath + "/" + hash + "-" + chunkNum)
		defer fileWriter.Close()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
		io.Copy(fileWriter, r.Body)
		w.Write([]byte("ok"))

	}
}
