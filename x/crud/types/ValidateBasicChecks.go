package types

import sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

func CheckEmptyKey(key string) error {
	if len(key) == 0 {
		return sdkerrors.New("crud", 2, "Key cannot be empty")
	}
	return nil
}

func CheckEmptyUuid(uuid string) error {
	if len(uuid) == 0 {
		return sdkerrors.New("crud", 2, "Uuid cannot be empty")
	}
	return nil
}

func CheckEmptyKeyValueLeases(keyValues []*KeyValueLease) error {

	for i := range keyValues {
		return CheckEmptyKey(keyValues[i].Key)
	}

	return nil
}
