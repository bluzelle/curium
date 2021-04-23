package keeper

import (
	votingtypes "github.com/bluzelle/curium/x/voting/types"
	"testing"
)

func TestTallyVotes(t *testing.T) {
	t.Run("Should return the single vote if you only send it one vote", func(t *testing.T) {
		votes := []*votingtypes.Vote{
			{Value: []byte("winning-value")},
		}

		winner := TallyVotes(votes)
		if string(*winner) != "winning-value" {
			t.Error("Incorrect vote winner")
		}
	})

	t.Run("Should return a majority vote if weights are the same", func(t *testing.T) {
		votes := []*votingtypes.Vote{
			{Value: []byte("winning-value"), Weight: 100},
			{Value: []byte("winning-value"), Weight: 100},
			{Value: []byte("wrong-value"), Weight: 100},
		}
		winner := TallyVotes(votes)
		if string(*winner) != "winning-value" {
			t.Error("Incorrect vote winner")
		}
	})

	t.Run("Should return a majority vote based on weight", func(t *testing.T) {
		t.Run("winning vote first", func(t *testing.T) {
			votes := []*votingtypes.Vote{
				{Value: []byte("wrong-value"), Weight: 100},
				{Value: []byte("winning-value"), Weight: 500},
				{Value: []byte("wrong-value"), Weight: 200},
			}
			winner := TallyVotes(votes)
			if string(*winner) != "winning-value" {
				t.Error("Incorrect vote winner")
			}
		})

		t.Run("winning vote second", func(t *testing.T) {
			votes := []*votingtypes.Vote{
				{Value: []byte("wrong-value"), Weight: 100},
				{Value: []byte("winning-value"), Weight: 500},
				{Value: []byte("wrong-value"), Weight: 200},
			}
			winner := TallyVotes(votes)
			if string(*winner) != "winning-value" {
				t.Error("Incorrect vote winner")
			}
		})
		t.Run("winning vote last", func(t *testing.T) {
			votes := []*votingtypes.Vote{
				{Value: []byte("wrong-value"), Weight: 100},
				{Value: []byte("wrong-value"), Weight: 200},
				{Value: []byte("winning-value"), Weight: 400},
			}
			winner := TallyVotes(votes)
			if string(*winner) != "winning-value" {
				t.Error("Incorrect vote winner")
			}
		})
	})
}
