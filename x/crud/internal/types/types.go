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

package types

import (
	"fmt"
	cc "github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"strings"
)

type BLZValue struct {
	Value string         `json:"value"`
	Owner sdk.AccAddress `json:"owner"`
}

func NewBLZValue() BLZValue {
	return BLZValue{
		Value: "",
		Owner: nil,
	}
}

func (kv BLZValue) Unmarshal(b []byte) BLZValue {
	var cdc = cc.New()
	value := BLZValue{}
	cdc.UnmarshalBinaryBare(b, &value)
	return value
}

func (kv BLZValue) String() string {
	if kv.Owner.Empty() {
		return strings.TrimSpace(fmt.Sprintf("Value: %s Owner: <empty>", kv.Value))
	}
	return strings.TrimSpace(fmt.Sprintf("Value: %s Owner: %s", kv.Value, kv.Owner.String()))
}

type KeyValue struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}
