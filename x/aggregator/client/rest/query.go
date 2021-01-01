package rest

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/bluzelle/curium/x/aggregator/types"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/types/rest"
)

func registerQueryRoutes(cliCtx context.CLIContext, r *mux.Router) {
	r.HandleFunc("/aggregator/latestValues", queryLatestValuesFn(cliCtx)).Methods("GET")
	r.HandleFunc("/aggregator/latestPair/{symbol}/{inSymbol}", queryLatestPairFn(cliCtx)).Methods("GET")
}

func queryLatestValuesFn(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		route := fmt.Sprintf("custom/%s/getLatestValues", types.QuerierRoute)
		res, _, err := cliCtx.QueryWithData(route,  nil)

		if err != nil {
			rest.WriteErrorResponse(w, http.StatusInternalServerError, err.Error())
			return
		}
		rest.PostProcessResponse(w, cliCtx, res)
	}
}

func queryLatestPairFn(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		route := fmt.Sprintf("custom/%s/getLatestPair", types.QuerierRoute)
		args := types.RestLatestPairReq{Symbol: vars["symbol"], InSymbol: vars["inSymbol"]}
		data := types.ModuleCdc.MustMarshalBinaryBare(args)
		res, _, err := cliCtx.QueryWithData(route,  data)

		if err != nil {
			rest.WriteErrorResponse(w, http.StatusInternalServerError, err.Error())
			return
		}
		rest.PostProcessResponse(w, cliCtx, res)
	}
}


func queryParamsHandlerFn(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cliCtx, ok := rest.ParseQueryHeightOrReturnBadRequest(w, cliCtx, r)
		if !ok {
			return
		}

		route := fmt.Sprintf("custom/%s/parameters", types.QuerierRoute)

		res, height, err := cliCtx.QueryWithData(route, nil)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusInternalServerError, err.Error())
			return
		}

		cliCtx = cliCtx.WithHeight(height)
		rest.PostProcessResponse(w, cliCtx, res)
	}
}
