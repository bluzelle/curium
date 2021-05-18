package rest

import (
	"fmt"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/ethereum/go-ethereum/common/math"
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

		chunkInt, ok := math.ParseUint64(chunkNum)
		if !ok {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "unable to read chunk number")
			return
		}
		filename := fmt.Sprintf("%s/%s-%04d", uploadPath, hash, chunkInt)
		fileWriter, err := os.Create(filename)
		defer fileWriter.Close()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
		io.Copy(fileWriter, r.Body)
		w.Write([]byte("ok"))

	}
}
