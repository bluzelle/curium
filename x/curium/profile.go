package curium

import "os"

func IsTestnet() bool {
	return os.Getenv("TESTNET") != ""
}