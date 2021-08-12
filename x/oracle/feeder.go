package oracle

import (
	"fmt"
	curium "github.com/bluzelle/curium/x/curium/keeper"
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/robfig/cron/v3"
	"github.com/tendermint/tendermint/libs/log"
	nestedJson "github.com/wenxiang/go-nestedjson"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

var logger = log.NewTMLogger(log.NewSyncWriter(os.Stdout))


func RunFeeder(ctx sdk.Context, oracleKeeper Keeper) {
	logger.Info("Starting oracle feeder service")

	c := cron.New()
	c.AddFunc("* * * * *", func() {
		if !oracleKeeper.IsValidator(*currCtx) {
			logger.Info("Not running feeder, host is not a validator")
			return
		}
		logger.Info("Oracle feeder run", "Valcons", keeper.GetValconsAddress())
		GetValueAndSendProofAndVote(ctx, oracleKeeper)
	})
	c.Start()
}

type SourceAndValue struct {
	source types.Source
	value  float64
}

func GetValueAndSendProofAndVote(ctx sdk.Context, oracleKeeper Keeper) {
	sources, _ := oracleKeeper.ListSources(*currCtx)
	logger.Info("Oracle fetching from sources", "count", len(sources))
	if len(sources) > 0 {
		values := fetchValues(sources)
		sendPreflightMsgs(ctx, values, oracleKeeper)
		time.AfterFunc(time.Second*20, func() {
			sendVoteMsgs(ctx, values, oracleKeeper)
		})
	}
}

func fetchValues(sources []types.Source) []SourceAndValue {
	var results = make([]SourceAndValue, 0)
	wg := sync.WaitGroup{}
	var mutex = &sync.Mutex{}
	for _, source := range sources {
		wg.Add(1)
		go func(source types.Source) {
			defer func() {
				if err := recover(); err != nil {
					logger.Error("panic occurred fetching source", "source", source.Name, "err", err)
				}
			}()
			value, _ := fetchSource(source)
				mutex.Lock()
				results = append(results, SourceAndValue{
					source: source,
					value:  value,
				})
				mutex.Unlock()
			wg.Done()
		}(source)
	}
	wg.Wait()
	return results
}

func fetchSource(source types.Source) (float64, error) {
	client := http.Client{
		Timeout: 10 * time.Second,
	}
	client.Get(source.Url)
	resp, err := http.Get(source.Url)
	if err != nil {
		logger.Info("Error fetching oracle source", "name", source.Name, "err", err)
		return 0, err
	}
	defer func() {
		err := resp.Body.Close()
		if err != nil {
			logger.Info("Error closing http connection", source.Url)
		}
	}()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	value, err := readValueFromJson(body, source.Property)
	if err != nil {
		logger.Info("Error fetching oracle source", "name", source.Name, "err", err)
		return 0, err
	}
	return value, nil
}

func readValueFromJson(jsonIn []byte, prop string) (float64, error) {
	obj, err := nestedJson.Decode(jsonIn)
	if err != nil {
		return 0, err
	}

	out, err := obj.Float(prop)
	if err != nil {
		outString, err := obj.String(prop)
		if err != nil {
			return 0, err
		}
		out, err = strconv.ParseFloat(outString, 64)
		if err != nil {
			return 0, err
		}
	}

	return out, nil
}

func sendPreflightMsgs(ctx sdk.Context, values []SourceAndValue, keeper Keeper) string {
	var msgs []sdk.Msg
	for _, value := range values {
		msg, _ := generateVoteProofMsg(value, keeper.KeyringReader)
		msgs = append(msgs, msg)
	}
	logger.Info("Sending oracle proof messages", "count", len(msgs))
	result := <- keeper.MsgBroadcaster(ctx, msgs, "oracle")

	logger.Info("Oracle proof messages sent", "response", result.Response.Log)
	return result.Response.Log
}

func sendVoteMsgs(ctx sdk.Context, values []SourceAndValue, keeper Keeper) string {
	var msgs []sdk.Msg
	for _, value := range values {
		msg, _ := generateVoteMsg(value, keeper.KeyringReader)
		msgs = append(msgs, msg)
	}
	logger.Info("Sending feeder vote messages", "count", len(msgs))
	result := <- keeper.MsgBroadcaster(ctx, msgs, "oracle")
	logger.Info("Feeder vote messages sent", "hash", result.Response.Log)
	return result.Response.Log
}

func generateVoteMsg(source SourceAndValue, keyringReader *curium.KeyringReader) (types.MsgOracleVote, error) {
	oracleAddr, err := keyringReader.GetAddress("oracle")
	if err != nil {
		return types.MsgOracleVote{}, err
	}
	msg := types.NewMsgOracleVote(
		keeper.GetValconsAddress(),
		fmt.Sprintf("%.12f", source.value),
		oracleAddr,
		source.source.Name,
		getCurrentBatchId(),
	)
	err = msg.ValidateBasic()
	return msg, err
}

func getCurrentBatchId() string {
	t := time.Date(
		time.Now().UTC().Year(),
		time.Now().UTC().Month(),
		time.Now().UTC().Day(),
		time.Now().UTC().Hour(),
		time.Now().UTC().Minute(),
		0,
		0,
		time.UTC,
	).String()
	t = strings.Replace(t, ":00 +0000 UTC", "", 1)
	t = strings.Replace(t, " ", "-", -1)
	return t
}

func generateVoteProofMsg(source SourceAndValue, keyringReader *curium.KeyringReader) (types.MsgOracleVoteProof, error) {
	oracleAddr, err := keyringReader.GetAddress("oracle")
	if err != nil {
		fmt.Println("Error getting address for generating vote proof message")
		return types.MsgOracleVoteProof{}, err
	}

	proof := keeper.CalculateProofSig(fmt.Sprintf("%.12f", source.value))
	valcons := keeper.GetValconsAddress()
	msg := types.NewMsgOracleVoteProof(valcons, proof, oracleAddr, source.source.Name)
	err = msg.ValidateBasic()
	if err != nil {
		logger.Info("Error generating vote proof message", source.source.Name)
		return types.MsgOracleVoteProof{}, err
	}
	return msg, nil
}

var currCtx *sdk.Context

func StartFeeder(oracleKeeper Keeper) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println("panic occurred:", err)
		}
	}()
	waitForCtx()
	RunFeeder(*currCtx, oracleKeeper)
}

func waitForCtx() {
	for currCtx == nil {
		logger.Info("Feeder waiting for context")
		time.Sleep(5 * time.Second)
	}
}

