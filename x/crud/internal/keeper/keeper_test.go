package keeper

import "testing"

func Test_makeMetaKey(t *testing.T) {
	uuid := "uuid"
	key := "key"
	accepted := "uuid\x00key"

	if MakeMetaKey(uuid, key) != accepted {
		t.Error("MakeMetaKey failed.")
	}
}
