package keeper

import (
	"fmt"
	types "github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


type VoteKey struct {
	Batch string
	SourceName string
	Valcons string
}

func voteToVoteKey(vote types.Vote) VoteKey {
	return VoteKey{
		Batch: vote.Batch,
		SourceName: vote.SourceName,
		Valcons: vote.Valcons,
	}
}

func (vk VoteKey) Bytes() []byte {
	return []byte(fmt.Sprintf("%s%s>%s>%s", types.VoteStorePrefix, vk.Batch, vk.SourceName, vk.Valcons))
}

func (k Keeper) StoreVote(ctx sdk.Context, vote types.Vote)  {
	key := voteToVoteKey(vote).Bytes()
	store := k.GetStore(ctx)
	store.Set(key, k.cdc.MustMarshalBinaryBare(vote))
}

func (k Keeper) DeleteVotes(ctx sdk.Context, prefix string) int {
	keys := k.SearchVoteKeys(ctx, prefix)
	store := k.GetStore(ctx)
	for _, key := range keys {
		store.Delete([]byte(key))
	}
	return len(keys)
}

func (k Keeper) SearchVoteKeys(ctx sdk.Context, prefix string) []string {
	iterator := sdk.KVStorePrefixIterator(k.GetStore(ctx), []byte(types.VoteStorePrefix + prefix))
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

func makeSearchVotePrefix(batch string, sourceName string) string {
	return fmt.Sprintf("%s>%s", batch, sourceName)
}

func (k Keeper) SearchVotes(ctx sdk.Context, prefix string) []types.Vote {
	iterator := sdk.KVStorePrefixIterator(k.GetStore(ctx), []byte(types.VoteStorePrefix + prefix))
	defer iterator.Close()
	votes  := make([]types.Vote, 0)

	for ;iterator.Valid(); iterator.Next() {
		if ctx.GasMeter().IsPastLimit() {
			break
		}

		var v types.Vote
		value := iterator.Value()
		k.cdc.MustUnmarshalBinaryBare(value, &v)
		votes = append(votes, v)
	}
	return votes
}

func (k Keeper) DumpVotes(ctx sdk.Context) map[string] types.Vote {
	store := k.GetStore(ctx)
	var results = make(map[string]types.Vote)
	iterator := sdk.KVStorePrefixIterator(store, []byte(types.VoteStorePrefix))
	for ; iterator.Valid(); iterator.Next() {
		var source types.Vote
		k.cdc.UnmarshalBinaryBare(iterator.Value(), &source)
		results[string(iterator.Key())] = source
	}
	return results
}


