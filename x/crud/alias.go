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

package crud

import (
	"github.com/bluzelle/curium/x/crud/internal/keeper"
	"github.com/bluzelle/curium/x/crud/internal/types"
)

const (
	ModuleName = types.ModuleName
	RouterKey  = types.RouterKey
	StoreKey   = types.StoreKey
	LeaseKey   = types.LeaseKey
)

var (
	NewKeeper     = keeper.NewKeeper
	NewQuerier    = keeper.NewQuerier
	ModuleCdc     = types.ModuleCdc
	RegisterCodec = types.RegisterCodec
)

type (
	Keeper          = keeper.Keeper
	MaxKeeperSizes  = keeper.MaxKeeperSizes
	MsgCreate       = types.MsgCreate
	MsgRead         = types.MsgRead
	MsgUpdate       = types.MsgUpdate
	MsgDelete       = types.MsgDelete
	QueryResultRead = types.QueryResultRead
	QueryResultHas  = types.QueryResultHas
)
