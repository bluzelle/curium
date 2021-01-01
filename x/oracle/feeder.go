package oracle

import (
	"fmt"
	"github.com/bluzelle/curium/x/crud"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/robfig/cron/v3"
	"time"
)

var currCtx *sdk.Context

func StartFeeder(crudKeeper crud.Keeper) {
	time.AfterFunc(1000, func() {
		for ; currCtx == nil; {
			time.After(time.Second)
		}

		c := cron.New()
		c.AddFunc("* * * * *", func(){feederTick(crudKeeper)})
		c.Start()
	})
}

func feederTick(crudKeeper crud.Keeper) {
		keys := crudKeeper.GetKeys(currCtx.WithIsCheckTx(true), crudKeeper.GetKVStore(*currCtx), "oracle", nil)
		fmt.Println("**********************************")
		fmt.Println(keys)
}