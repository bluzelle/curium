package rest

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/gorilla/mux"
)

// RegisterRoutes - Central function to define routes that get registered by the main application
func RegisterRoutes(cliCtx context.CLIContext, r *mux.Router, storeName string) {
	r.HandleFunc(fmt.Sprintf("/%s/into", storeName), QueryTaxInfoHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/percentage", storeName), SetPercentageHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/collector", storeName), SetCollectorHandler(cliCtx)).Methods("POST")
}
