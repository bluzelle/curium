package app

import (
	"github.com/tendermint/tendermint/libs/log"
	"reflect"
)

type LoggerWrapper struct {
	logger    log.Logger
	logModule string
	module string
}

func NewLoggerWrapper(logger log.Logger, logModule string) LoggerWrapper {
	return LoggerWrapper{
		logger: logger,
		logModule: logModule,
		module: "",
	}
}

func (lw LoggerWrapper) matchesModule() bool {
	return lw.module == lw.logModule
}

func (lw LoggerWrapper) Debug(msg string, keyvals ...interface{}) {
	if len(lw.logModule) > 0 {
		if lw.matchesModule() {
			lw.logger.Error(msg, keyvals...)
		}
	} else {
		lw.logger.Debug(msg, keyvals...)
	}
}

func (lw LoggerWrapper) Info(msg string, keyvals ...interface{}) {
	if len(lw.logModule) > 0 {
		if lw.matchesModule() {
			lw.logger.Error(msg, keyvals...)
		}
	} else {
		lw.logger.Info(msg, keyvals...)
	}
}

func (lw LoggerWrapper) Error(msg string, keyvals ...interface{}) {
	if len(lw.logModule) > 0 {
		if lw.matchesModule() {
			lw.logger.Error(msg, keyvals...)
		}
	} else {
		lw.logger.Error(msg, keyvals...)
	}
}

func (lw LoggerWrapper) With(keyvals ...interface{}) log.Logger {
	for i := 0; i < len(keyvals); i++ {
		if reflect.TypeOf(keyvals[i]).String() == "string" {
			if keyvals[i].(string) == "module" {
				lw.module = keyvals[i + 1].(string)
			}
		}
	}
	lw.logger = lw.logger.With(keyvals...)
	return lw
}
