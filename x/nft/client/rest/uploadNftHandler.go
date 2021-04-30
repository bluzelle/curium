package rest

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	"os"
)

func uploadNftHandler(clientCtx client.Context) http.HandlerFunc {
return func(w http.ResponseWriter, r *http.Request) {
	hash := mux.Vars(r)["hash"]

	buf, err := ioutil.ReadAll(r.Body)
	if err!=nil {
		rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
		return
	}
	uploadPath := clientCtx.HomeDir + "/nft-upload"
	os.MkdirAll(uploadPath, os.ModePerm)

	err = ioutil.WriteFile(uploadPath + "/" + hash, buf, 0644)
	if err != nil {
		rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
	}
	w.Write([]byte("ok"))

}}