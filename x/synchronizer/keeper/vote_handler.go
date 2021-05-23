package keeper

import (
	"bytes"
	"github.com/bluzelle/curium/x/synchronizer/types"
	votingtypes "github.com/bluzelle/curium/x/voting/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type VoteHandler struct {
	Keeper Keeper
}

func NewVoteHandler(k Keeper) *VoteHandler {
	return &VoteHandler{
		Keeper: k,
	}
}

func (h *VoteHandler) VotesReceived(ctx *sdk.Context, voteId string, votes []*votingtypes.Vote) {
	winner := TallyVotes(votes)
	var op types.SyncOperation
	op.Unmarshal(*winner)
	h.Keeper.ExecuteOperation(ctx, &op)
}

func (h *VoteHandler) VoteType() string {
	return types.ModuleName
}

func TallyVotes(votes []*votingtypes.Vote) *[]byte {
	var m *[]byte
	var i int64
	for _, vote := range votes {
		if i <= 0 {
			m = &vote.Value
			i = vote.Weight
			continue
		}
		if bytes.Compare(*m, vote.Value) == 0 {
			i = i + vote.Weight
			continue
		}
		i = i - vote.Weight
		if i <= 0 {
			m = &vote.Value
			i = vote.Weight
		}
	}
	return m
}
