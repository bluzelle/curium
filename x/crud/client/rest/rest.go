package rest

import (
	"github.com/gorilla/mux"

	"github.com/cosmos/cosmos-sdk/client"
	// this line is used by starport scaffolding # 1
)

const (
	MethodGet = "GET"
)

// RegisterRoutes registers crud-related REST handlers to a router
func RegisterRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 2
	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)
	registerHttpServerRoutes(clientCtx, r)

}

func registerHttpServerRoutes(clientCtx client.Context, r *mux.Router) {
	r.HandleFunc("/crud/raw/{uuid}/{key}", httpHandler(clientCtx)).Methods("GET")
}

func registerQueryRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 3
	r.HandleFunc("/crud/CrudValues/{id}", getCrudValueHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/crud/CrudValues", listCrudValueHandler(clientCtx)).Methods("GET")

}

func registerTxHandlers(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 4
	r.HandleFunc("/crud/CrudValues", createHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/crud/CrudValues/{id}", updateCrudValueHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/crud/CrudValues/{id}", deleteCrudValueHandler(clientCtx)).Methods("POST")

}
