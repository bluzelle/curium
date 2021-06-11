// +build testnet

package curium

import "fmt"

func init() {
	fmt.Println("******* Starting in testnet mode ********")
}

func IsTestnet() bool {
	return true
}

func IsMainnet() bool {
	return !IsTestnet()
}