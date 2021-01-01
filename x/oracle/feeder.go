package oracle

import (
	"encoding/json"
	"fmt"
	"github.com/bluzelle/curium/x/crud"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"net/url"
	"strconv"
	"time"
	"github.com/go-resty/resty/v2"
)


type source struct {
	Name string
	Url   string      `json:"url"`
	Property string `json:"property"`
}

type JSONResponse map[string]interface{}


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

		for _, v := range keyValues {
			res := source{}
			json.Unmarshal([]byte(decodeSafe(v.Value)), &res)
			res.Name = v.Key
			value, err := fetchFromSource(res)
			// TODO: SUBMIT PREFLIGHT AND VOTE HERE
			fmt.Println(err)
			fmt.Println(value)
		}
}

func fetchFromSource(source source) (float64, error) {
	fmt.Println("************** SOURCE **************")
	fmt.Println(source)

	client := resty.New()

	resp, err := client.R().
		EnableTrace().
		Get(source.Url)

	if err != nil {
		return 0, err
	}

	var respBody JSONResponse

	json.Unmarshal(resp.Body(), &respBody)

	value  := respBody[source.Property]

	switch i := value.(type) {
	case string:
		f, err := strconv.ParseFloat(i, 32)
		return f, err
	}
	return 0, nil

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


