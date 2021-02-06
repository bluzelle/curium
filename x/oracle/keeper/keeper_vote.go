package keeper

import (
	"fmt"
	types "github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
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

func (k Keeper) DeleteVotes(ctx sdk.Context, prefix string) int {
	keys := k.SearchVoteKeys(ctx, prefix)
	store := k.GetVoteStore(ctx)
	for _, key := range(keys) {
		store.Delete([]byte(key))
	}
	return len(keys)
}

func (k Keeper) SearchVoteKeys(ctx sdk.Context, prefix string) []string {
	iterator := sdk.KVStorePrefixIterator(k.GetVoteStore(ctx), []byte(prefix))
	defer iterator.Close()
	keys  := make([]string, 0)

	for ;iterator.Valid(); iterator.Next() {
		if ctx.GasMeter().IsPastLimit() {
			break
		}

		key := iterator.Key()
		keys = append(keys, string(key))
	}
	return keys

}

func (k Keeper) SearchVotes(ctx sdk.Context, prefix string) []types.MsgOracleVote {
	iterator := sdk.KVStorePrefixIterator(k.GetVoteStore(ctx), []byte(prefix))
	defer iterator.Close()
	votes  := make([]types.MsgOracleVote, 0)

	for ;iterator.Valid(); iterator.Next() {
		if ctx.GasMeter().IsPastLimit() {
			break
		}

		var v types.MsgOracleVote
		value := iterator.Value()
		k.cdc.MustUnmarshalBinaryBare(value, &v)
		votes = append(votes, v)
	}
	return votes
}

