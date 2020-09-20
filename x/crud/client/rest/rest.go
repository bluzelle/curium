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
	"github.com/cosmos/cosmos-sdk/client/context"
	"github.com/gorilla/mux"
)

// RegisterRoutes - Central function to define routes that get registered by the main application
func RegisterRoutes(cliCtx context.CLIContext, r *mux.Router, storeName string) {
	r.HandleFunc(fmt.Sprintf("/%s/count", storeName), BlzCountHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/count/{UUID}", storeName), BlzQCountHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/create", storeName), BlzCreateHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/delete", storeName), BlzDeleteHandler(cliCtx)).Methods("DELETE")
	r.HandleFunc(fmt.Sprintf("/%s/deleteall", storeName), BlzDeleteAllHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/getlease", storeName), BlzGetLeaseHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/getlease/{UUID}/{key}", storeName), BlzQGetLeaseHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/getnshortestleases", storeName), BlzGetNShortestLeasesHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/getnshortestleases/{UUID}/{N}", storeName), BlzQGetNShortestLeasesHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/has", storeName), BlzHasHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/has/{UUID}/{key}", storeName), BlzQHasHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/keys", storeName), BlzKeysHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/keys/{UUID}", storeName), BlzQKeysHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/search/{UUID}/{prefix}/{page}/{limit}/{direction}", storeName), BlzQSearchHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/keyvalues", storeName), BlzKeyValuesHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/keyvalues/{UUID}", storeName), BlzQKeyValuesHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/multiupdate", storeName), BlzMultiUpdateHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/pread/{UUID}/{key}", storeName), BlzQProvenReadHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/read", storeName), BlzReadHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/read/{UUID}/{key}", storeName), BlzQReadHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/owner/{UUID}/{key}", storeName), BlzQOwnerHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/rename", storeName), BlzRenameHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/update", storeName), BlzUpdateHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/renewlease", storeName), BlzRenewLease(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/renewleaseall", storeName), BlzRenewLeaseAll(cliCtx)).Methods("POST")
}
