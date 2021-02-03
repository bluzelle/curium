package keeper

import (
	"fmt"
	types "github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tendermint/go-amino"
)

func (k Keeper) GetVoteStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.voteStoreKey)
}

func CreateVoteKey(valcons string, sourceName string) string {
	return fmt.Sprintf("%s>%s>%s", GetCurrentBatchId(), sourceName, valcons)
}

func (k Keeper) StoreVote(ctx sdk.Context, msg types.MsgOracleVote) string {
	key := CreateVoteKey(msg.Valcons, msg.SourceName)
	store := k.GetVoteStore(ctx)
	store.Set([]byte(key), k.cdc.MustMarshalBinaryBare(msg))
	return key
}

func (k Keeper) SearchVotes(ctx sdk.Context, prefix string) []types.Vote {
	iterator := sdk.KVStorePrefixIterator(k.GetVoteStore(ctx), []byte(prefix))
	defer iterator.Close()
	var votes []types.Vote

	for ;iterator.Valid(); iterator.Next() {
		if ctx.GasMeter().IsPastLimit() {
			break
		}

		var v types.Vote

		amino.MustUnmarshalBinaryLengthPrefixed(iterator.Value(), &v)
		votes = append(votes, v)
	}
	return votes
}

