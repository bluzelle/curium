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
	"github.com/magiconair/properties/assert"
	"testing"
)

func TestQueryResultRead_String(t *testing.T) {
	assert.Equal(t, QueryResultRead{UUID: "uuid", Key: "key", Value: "value"}.String(), "value")
}

func TestQueryResultHas_String(t *testing.T) {
	assert.Equal(t, QueryResultHas{UUID: "uuid", Key: "key", Has: false}.String(), "false")
	assert.Equal(t, QueryResultHas{UUID: "uuid", Key: "key", Has: true}.String(), "true")
}

func TestQueryResultKeys_String(t *testing.T) {
	assert.Equal(t, QueryResultKeys{UUID: "uuid", Keys: []string{"one", "two", "three"}}.String(), "one, two, three")
}
