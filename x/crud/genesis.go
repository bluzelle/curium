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
	"fmt"
	"github.com/bluzelle/curium/x/crud/internal/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

type GenesisState struct {
	BlzValues []types.BLZValue
}

func NewGenesisState(_ []types.BLZValue) GenesisState {
	return GenesisState{BlzValues: nil}
}

func ValidateGenesis(data GenesisState) error {
	for _, record := range data.BlzValues {
		if record.Owner == nil {
			return fmt.Errorf("invalid BlzValue: Value: %s. Error: Missing Owner", record.Value)
		}
	}
	return nil
}

func DefaultGenesisState() GenesisState {
	return GenesisState{
		BlzValues: nil,
	}
}

// TODO: we need to revisit this method, how does the genesis file work?
func InitGenesis(ctx sdk.Context, keeper Keeper, data GenesisState) []abci.ValidatorUpdate {
	for _, record := range data.BlzValues {
		keeper.SetBLZValue(ctx, "UUID-Genesis", "Key-Genesis", record)
	}
	return []abci.ValidatorUpdate{}
}

// TODO - fix key value issues
func ExportGenesis(ctx sdk.Context, k Keeper) GenesisState {
	var records []types.BLZValue
	iterator := k.GetNamesIterator(ctx)
	for ; iterator.Valid(); iterator.Next() {
		key := string(iterator.Key())
		value := k.GetBLZValue(ctx, "UUID-Genesis", key)
		records = append(records, value)
	}
	return GenesisState{records}
}
