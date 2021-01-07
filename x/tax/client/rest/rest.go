package rest

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/gorilla/mux"
)

// RegisterRoutes - Central function to define routes that get registered by the main application
func RegisterRoutes(cliCtx context.CLIContext, r *mux.Router, storeName string) {
	r.HandleFunc(fmt.Sprintf("/%s/info", storeName), QueryTaxInfoHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/bp", storeName), SetBpHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/collector", storeName), SetCollectorHandler(cliCtx)).Methods("POST")
}
