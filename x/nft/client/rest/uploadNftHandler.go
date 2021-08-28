package rest

import (
	"fmt"
	"github.com/bluzelle/curium/x/nft/keeper"
	"github.com/bluzelle/curium/x/nft/types"
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
		auth := r.Header.Get("Authorization")

		token := strings.Split(auth, " ")[1]

		bz, _, err := clientCtx.QueryWithData("custom/nft/is-auth-valid", []byte(token))
		var isValid bool
		clientCtx.Codec.MustUnmarshalJSON(bz, &isValid)

		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "unable to read chunk number")
			return
		}

		if !isValid {
			rest.WriteErrorResponse(w, http.StatusForbidden, "auth invalid")
			return
		}


		uploadDirRes, _, err := clientCtx.Query("custom/nft/get-nft-upload-dir")

		uploadDir := string(uploadDirRes)

		uploadPath := uploadDir + "/" + vendor

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

		checkUploadCompleteReq := types.QueryCheckUploadCompleteReq{
			Hash: hash,
			Size: uint64(r.ContentLength),
		}

		bz, err = clientCtx.Codec.MarshalBinaryBare(&checkUploadCompleteReq)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		bz, _, err = clientCtx.QueryWithData("custom/nft/" + keeper.QueryCheckUploadComplete, bz)

		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
	}
}


