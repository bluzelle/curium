// Copyright (C) 2020 Bluzelle
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License, version 3,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

package rest

import (
	"fmt"
	"github.com/bluzelle/curium/x/crud/internal/keeper"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gorilla/mux"
	"net/http"
)

func BlzQReadHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/read/%s/%s", storeName, vars["UUID"], vars["key"]), nil)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		rest.PostProcessResponse(w, cliCtx, res)
	}
}

func BlzQOwnerHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/owner/%s/%s", storeName, vars["UUID"], vars["key"]), nil)

		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		rest.PostProcessResponse(w, cliCtx, res)

	}
}

func BlzQProvenReadHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("/store/%s/key", storeName), []byte(keeper.MakeMetaKey(vars["UUID"], vars["key"])))
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}

		if res == nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, "could not read key")
			return
		}

		value := types.BLZValue{}.Unmarshal(res)
		resp := types.QueryResultRead{UUID: vars["UUID"], Key: vars["key"], Value: value.Value}

		rest.PostProcessResponse(w, cliCtx, resp)
	}
}

func BlzQHasHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/has/%s/%s", storeName, vars["UUID"], vars["key"]), nil)

		rest.PostProcessResponse(w, cliCtx, res)
	}
}

func BlzQKeysHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/keys/%s", storeName, vars["UUID"]), nil)

		rest.PostProcessResponse(w, cliCtx, res)
	}
}

func BlzQSearchHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/search/%s/%s/%s/%s/%s", storeName, vars["UUID"], vars["prefix"], vars["page"], vars["limit"], vars["direction"]), nil)

		rest.PostProcessResponse(w, cliCtx, res)
	}
}


func BlzQKeyValuesHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/keyvalues/%s", storeName, vars["UUID"]), nil)

		rest.PostProcessResponse(w, cliCtx, res)
	}
}

func BlzQCountHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, _ := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/count/%s", storeName, vars["UUID"]), nil)

		rest.PostProcessResponse(w, cliCtx, res)
	}
}

func BlzQGetLeaseHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/getlease/%s/%s", storeName, vars["UUID"], vars["key"]), nil)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		rest.PostProcessResponse(w, cliCtx, res)
	}
}

func BlzQGetNShortestLeasesHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/getnshortestleases/%s/%s", storeName, vars["UUID"], vars["N"]), nil)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		rest.PostProcessResponse(w, cliCtx, res)
	}
}
