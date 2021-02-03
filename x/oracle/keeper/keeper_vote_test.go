package keeper_test

import (
	"github.com/bluzelle/curium/x/oracle/keeper"
	"github.com/magiconair/properties/assert"
	"testing"
)

func TestCreateVoteKey(t *testing.T) {
	t.Run("it should create a store key from a valcons and source name", func(t *testing.T) {
		key := keeper.CreateVoteKey("my-valcons", "my-source-name")
		assert.Equal(t, key, keeper.GetCurrentBatchId() + ">my-source-name>my-valcons")
	})
}

//func TestSearchVotes(t *testing.T) {
//	t.Run("it should search for votes based on batchId", func(t *testing.T) {
//		k := getKeeper()
//		ctx := context.NewCLIContext().
//		k.StoreVote(ctx, types.MsgOracleVote{
//			Valcons: "my-valcons",
//			SourceName: "source1",
//		})
//		k.StoreVote(ctx, types.MsgOracleVote{
//			Valcons: "my-valcons",
//			SourceName: "source2",
//		})
//		k.StoreVote(ctx, types.MsgOracleVote{
//			Valcons: "my-valcons",
//			SourceName: "source3",
//		})
//
//		votes := k.SearchVotes(ctx, keeper.GetCurrentBatchId())
//		_ = votes
//	})
//}