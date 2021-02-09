package keeper

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/bluzelle/curium/x/oracle/types"
)

func (k Keeper) GetValueStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.valueStoreKey)
}

func (k Keeper) UpdateSourceValue(ctx sdk.Context, vote types.Vote) {
	votes := k.SearchVotes(ctx, makeSearchVotePrefix(vote.Batch, vote.SourceName))
	votes = append(votes, vote)
	average := calculateAverageFromVotes(votes)
	store := k.GetValueStore(ctx)
	key := MakeSourceValueKey(vote.SourceName, vote.Batch)
	sourceValue := types.SourceValue{
		SourceName: vote.SourceName,
		Batch:      vote.Batch,
		Value:      average,
		Owner:      vote.Owner,
	}
	store.Set([]byte(key), k.cdc.MustMarshalBinaryBare(sourceValue))
}

func MakeSourceValueKey(sourceName string, batch string) string {
	return fmt.Sprintf("%s>%s", sourceName, batch)
}


func calculateAverageFromVotes(votes []types.Vote) sdk.Dec {
	sum := sdk.NewDecFromInt(sdk.NewInt(0))
	totalWeight := sdk.NewDecFromInt(sdk.NewInt(0))

	for _, vote := range votes  {
		totalWeight = totalWeight.Add(vote.Weight)
		sum = sum.Add(vote.Value.Mul(vote.Weight))
	}

	return sum.Quo(totalWeight)
}



