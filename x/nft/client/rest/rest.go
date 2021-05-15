package rest

import (
	"github.com/gorilla/mux"

	"github.com/cosmos/cosmos-sdk/client"
	// this line is used by starport scaffolding # 1
)

const (
	MethodGet = "GET"
)

// RegisterRoutes registers nft-related REST handlers to a router
func RegisterRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 2
	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)
	registerUploadHandlers(clientCtx, r)

}

func registerUploadHandlers(clientCtx client.Context, r *mux.Router) {
	r.HandleFunc("/nft/upload/{hash}/{chunkNum}", uploadNftHandler(clientCtx)).Methods("POST")
}

func registerQueryRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 3
	r.HandleFunc("/nft/{id}", getNftHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/nft", listNftHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/nft/data/{id}", getNftDataHandler(clientCtx)).Methods("GET")
}

func registerTxHandlers(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 4
//	r.HandleFunc("/nft/nfts", createNftHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/nft/nfts/{id}", updateNftHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/nft/nfts/{id}", deleteNftHandler(clientCtx)).Methods("POST")

}
