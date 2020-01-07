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
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// DefaultCodespace is the Module Name
const (
	DefaultCodespace sdk.CodespaceType = ModuleName

	CodeKeyDoesNotExist  sdk.CodeType = 101
	CodeKeyAlreadyExists sdk.CodeType = 102
)

// ErrNameDoesNotExist is the error for name not existing
func ErrKeyDoesNotExist(codespace sdk.CodespaceType) sdk.Error {
	return sdk.NewError(codespace, CodeKeyDoesNotExist, "Key does not exist")
}

// ErrNameDoesNotExist is the error for name not existing
func ErrKeyAlreadyExists(codespace sdk.CodespaceType) sdk.Error {
	return sdk.NewError(codespace, CodeKeyAlreadyExists, "Key already exists")
}
