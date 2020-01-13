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

type QueryResultRead struct {
	Value string
}

// implement fmt.Stringer

func (r QueryResultRead) String() string {
	return r.Value
}

type QueryResultHas struct {
	Value bool `json:"result"`
}

// implement fmt.Stringer

func (r QueryResultHas) String() string {
	if (r.Value) {
		return "true"
	} else {
		return "false"
	}
}