package types

import (
	"os"
	"strings"
)

func IsDevelopment () (bool) {
	env, valid := os.LookupEnv("ENVIRONMENT")
	return valid && strings.Contains(env, "DEVEL")
}