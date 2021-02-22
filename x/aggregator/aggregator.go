package aggregator

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/robfig/cron/v3"
	"github.com/tendermint/tendermint/libs/log"
	"os"
	"time"
)

var currCtx *sdk.Context


var logger = log.NewTMLogger(log.NewSyncWriter(os.Stdout))




func StartAggregator(aggKeeper Keeper) {
	waitForCtx()
	run(aggKeeper)
}

func run(aggKeeper Keeper) {
	c := cron.New()
	c.AddFunc("* * * * *", func() {
		time.AfterFunc(40 * time.Second, func() {
			logger.Info("Oracle aggregator run")
			aggKeeper.AggregateValues(*currCtx)
		})
	})
	c.Start()
}

func waitForCtx() {
	for currCtx == nil {
		logger.Info("Aggregator waiting for context")
		time.Sleep(5 * time.Second)
	}
}
