// +build !testnet

package curium

func IsTestnet() bool {
	return false
}

func IsMainnet() bool {
	return !IsTestnet()
}