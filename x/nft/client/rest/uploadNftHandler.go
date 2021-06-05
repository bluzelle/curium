package rest


import (
	"fmt"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"os"
	"strings"
)
func uploadNftHandler(clientCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		hash := mux.Vars(r)["hash"]
		chunkNum := mux.Vars(r)["chunkNum"]
		vendor := mux.Vars(r)["vendor"]

		uploadPath := strings.TrimSuffix(clientCtx.HomeDir, ".blzcli") + ".blzd" + "/nft-upload" + "/" + vendor
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


