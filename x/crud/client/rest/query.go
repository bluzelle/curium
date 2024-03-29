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
	"encoding/hex"
	"fmt"
	"github.com/bluzelle/curium/x/crud/internal/keeper"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/client/context"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

func AccountTxsHandler(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		const NUM_OF_BLOCKS = 100
		const PAGE_SIZE = 100

		err := r.ParseForm()
		if err != nil {
			rest.WriteErrorResponse(
				w, http.StatusBadRequest,
				fmt.Sprintf("failed to parse query parameters: %s", err),
			)
			return
		}

		trustNode := true
		if r.FormValue("proof") == "true" {
			trustNode = false
		}
		cliCtx = cliCtx.WithTrustNode(trustNode)
		cliCtx = cliCtx.WithChainID(r.FormValue("chainId"))
		if trustNode == false && cliCtx.Verifier == nil {
			verifier, err := context.CreateVerifier(cliCtx, context.DefaultVerifierCacheSize)
			if err != nil {
				rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			}
			cliCtx = cliCtx.WithVerifier(verifier)
		}

		vars := mux.Vars(r)
		var response = make([]sdk.TxResponse, 0)

		start, err := strconv.ParseInt(vars["start"], 10, 64)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
		}

		cliCtx, ok := rest.ParseQueryHeightOrReturnBadRequest(w, cliCtx, r)
		if !ok {
			return
		}

		events := []string{
			fmt.Sprintf("tx.height>=%d", start),
			fmt.Sprintf("tx.height<%d", start+NUM_OF_BLOCKS),
			"message.action='send'",
			fmt.Sprintf("transfer.recipient='%s'", vars["address"]),
		}

		page := 1

		for {
			searchResult, err := utils.QueryTxsByEvents(cliCtx, events, page, PAGE_SIZE)
			if err != nil {
				if strings.Contains(err.Error(), "page should be within") {
					break
				}
				rest.WriteErrorResponse(w, http.StatusInternalServerError, err.Error())
				return
			}

			response = append(response, searchResult.Txs...)

			if len(searchResult.Txs) < PAGE_SIZE {
				break
			}
			page = page + 1
		}

		rest.PostProcessResponseBare(w, cliCtx, response)
	}
}

func AbciQueryHandler(cliCtx context.CLIContext) http.HandlerFunc {

	type queryReq struct {
		Path string
		Data string
	}

	return func(w http.ResponseWriter, r *http.Request) {

		cliCtx, ok := rest.ParseQueryHeightOrReturnBadRequest(w, cliCtx, r)
		if !ok {
			return
		}

		var req queryReq

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
		}

		err = cliCtx.Codec.UnmarshalJSON(body, &req)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
		}

		bytes, err := hex.DecodeString(req.Data)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
		}
		res, height, err := cliCtx.QueryWithData(req.Path, bytes)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
		}

		cliCtx = cliCtx.WithHeight(height)
		rest.PostProcessResponse(w, cliCtx, res)
	}

}

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

func BlzQMyKeysHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/mykeys/%s/%s", storeName, vars["owner"], vars["UUID"]), nil)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
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
