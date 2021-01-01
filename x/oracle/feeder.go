package oracle

import (
	"encoding/json"
	"fmt"
	"github.com/bluzelle/curium/x/crud"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"net/url"
	"time"
)


type source struct {
	Url   string      `json:"url"`
	Property string `json:"property"`
}

var currCtx *sdk.Context

func StartFeeder(crudKeeper crud.Keeper) {
	time.AfterFunc(1000, func() {
		for ; currCtx == nil; {
			time.After(time.Second)
		}

		feederTick(crudKeeper)
		//c := cron.New()
		//c.AddFunc("* * * * *", func(){feederTick(crudKeeper)})
		//c.Start()
	})
}

func feederTick(crudKeeper crud.Keeper) {
		result := crudKeeper.Search(*currCtx, crudKeeper.GetKVStore(*currCtx), "oracle", "source", 1, 100, "asc", nil)
		keyValues := result.KeyValues
		sources := make([]source, len(result.KeyValues))

		for i, v := range keyValues {
			res := source{}
			json.Unmarshal([]byte(decodeSafe(v.Value)), &res)
			sources[i] = res
		}



		fmt.Println("**********************************")
		fmt.Println(sources)
}

func decodeSafe(str string) string {
	raw, _ := url.PathUnescape(str)
	return raw
	//decodeURI(str)
	//.replace( / %../g, x => Some(x)
	//.map(x => x.replace('%', ''))
	//.map(x => parseInt(x, 16))
	//.map(String.fromCharCode)
	//.join()
	//)
}


