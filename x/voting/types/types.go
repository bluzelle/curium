package types

import sdk "github.com/cosmos/cosmos-sdk/types"

type VoteHandler interface {
	VotesReceived(*sdk.Context, uint64, []*Vote)
	VoteType() string
}
