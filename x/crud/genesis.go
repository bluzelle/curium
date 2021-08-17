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
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

type StoreExport struct {
	Key []byte
	Value []byte
}

type GenesisState struct {
	CrudStore []StoreExport
	LeaseStore []StoreExport
	OwnerStore []StoreExport
}

func NewGenesisState(_ []types.BLZValue) GenesisState {
	return GenesisState{
		CrudStore: nil,
		LeaseStore: nil,
		OwnerStore: nil,
	}
}

func ValidateGenesis(data GenesisState) error {
	//for _, record := range data.BlzValues {
	//	if record.Owner == nil {
	//		return fmt.Errorf("invalid BlzValue: Value: %s. Error: Missing Owner", record.Value)
	//	}
	//}
	return nil
}

func DefaultGenesisState() GenesisState {
	return GenesisState{
		CrudStore: nil,
		LeaseStore: nil,
		OwnerStore: nil,
	}
}

func InitGenesis(ctx sdk.Context, keeper keeper.IKeeper, data GenesisState) []abci.ValidatorUpdate {
	importStore(keeper.GetKVStore(ctx), data.CrudStore)
	importStore(keeper.GetLeaseStore(ctx), data.LeaseStore)
	importStore(keeper.GetOwnerStore(ctx), data.OwnerStore)
	return []abci.ValidatorUpdate{}
}

func importStore(store sdk.KVStore, records []StoreExport) {
	for _, record := range records {
		 value := record.Value
		 if value == nil {
		 	value = make([]byte, 0)
		 }
		store.Set(record.Key, value)
	}
}


func ExportGenesis(ctx sdk.Context, k keeper.IKeeper) GenesisState {
	return GenesisState{
		exportStore(ctx, k.GetKVStore(ctx)),
		exportStore(ctx, k.GetLeaseStore(ctx)),
		exportStore(ctx, k.GetOwnerStore(ctx)),
	}
}

func exportStore(ctx sdk.Context, store sdk.KVStore) []StoreExport {
	var records []StoreExport
	iterator := sdk.KVStorePrefixIterator(store, []byte{})
	for ; iterator.Valid(); iterator.Next() {
		records = append(records, StoreExport{iterator.Key(), iterator.Value()})
	}
	return records
}
