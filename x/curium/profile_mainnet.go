// +build testnet

package curium

func IsTestnet() bool {
	return true
}

func IsMainnet() bool {
	return !IsTestnet()
}