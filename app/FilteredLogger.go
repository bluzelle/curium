package app

import (
	"github.com/tendermint/tendermint/libs/log"
	"os"
	"strings"
)

func NewFilteredLogger(filterString string) (log.Logger, error) {
	var filters []log.Option
	filterStrings := strings.Split(filterString, ",")
	for _, option := range filterStrings {
		parts := strings.Split(option, ":")
		module := parts[0]
		level := parts[1]
		if module == "*" {
			if f, err := log.AllowLevel(level); err != nil {
				return nil, err
			} else {
				filters = append(filters, f)
			}
		} else {
			if level == "debug" {
				filters = append(filters, log.AllowDebugWith("module", module))
			}
			if level == "info" {
				filters = append(filters, log.AllowInfoWith("module", module))
			}
			if level == "error" {
				filters = append(filters, log.AllowErrorWith("module", module))
			}
		}
	}
	return log.NewFilter(
		log.NewTMLogger(
			log.NewSyncWriter(os.Stdout),
		), filters...
	), nil
}