package rest

import (
	"github.com/bluzelle/curium/x/curium"
	"github.com/gorilla/mux"

	"github.com/cosmos/cosmos-sdk/client"
	// this line is used by starport scaffolding # 1
)

const (
	MethodGet = "GET"
)

// RegisterRoutes registers faucet-related REST handlers to a router
func RegisterRoutes(clientCtx client.Context, r *mux.Router) {
	if curium.IsTestnet() {
		r.HandleFunc("/mint", mintHandler(clientCtx)).Methods("GET")
		r.HandleFunc("/mint/{address}", mintHandler(clientCtx)).Methods("GET")
	}
	// this line is used by starport scaffolding # 2
}

func registerQueryRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 3
}

func registerTxHandlers(clientCtx client.Context, r *mux.Router) {

	// this line is used by starport scaffolding # 4
}
