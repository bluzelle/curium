package types

import "os"

func IsDevelopment () (bool) {
	_, valid := os.LookupEnv("DEVEL")
	return valid
}