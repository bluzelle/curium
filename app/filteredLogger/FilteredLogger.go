package filteredLogger

import (
	"github.com/tendermint/tendermint/libs/log"
	"os"
	"strings"
)

var logLevels = map[string]int{
	"error": 2,
	"info":  3,
	"debug": 4,
}

var moduleLogLevels = map[string]int{}

func IsDebug(module string) bool {
	return (moduleLogLevels[module] <= logLevels["debug"] || moduleLogLevels["*"] <= logLevels["debug"])
}

func IsInfo(module string) bool {
	return moduleLogLevels[module] <= logLevels["info"] || moduleLogLevels["*"] <= logLevels["info"]
}

func IsError(module string) bool {
	return moduleLogLevels[module] <= logLevels["error"] || moduleLogLevels["*"] <= logLevels["error"]
}

func NewFilteredLogger(filterString string) (log.Logger, error) {
	var filters []log.Option
	filterStrings := strings.Split(filterString, ",")
	if filterString == "" {
		log.AllowLevel("debug")
	} else {

		for _, option := range filterStrings {
			parts := strings.Split(option, ":")
			module := parts[0]
			level := parts[1]
			moduleLogLevels[module] = logLevels[level]
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
	}
	return log.NewFilter(
		log.NewTMLogger(
			log.NewSyncWriter(os.Stdout),
		), filters...,
	), nil
}
