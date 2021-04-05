package rest

import (
	"github.com/gorilla/mux"

	"github.com/cosmos/cosmos-sdk/client"
	// this line is used by starport scaffolding # 1
)

const (
	MethodGet = "GET"
)

// RegisterRoutes registers synchronizer-related REST handlers to a router
func RegisterRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 2
	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)

}

func registerQueryRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 3
	r.HandleFunc("/synchronizer/sources/{id}", getSourceHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/synchronizer/sources", listSourceHandler(clientCtx)).Methods("GET")

}

func registerTxHandlers(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 4
	r.HandleFunc("/synchronizer/sources", createSourceHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/synchronizer/sources/{id}", updateSourceHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/synchronizer/sources/{id}", deleteSourceHandler(clientCtx)).Methods("POST")

}
