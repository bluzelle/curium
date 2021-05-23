package types

import sdk "github.com/cosmos/cosmos-sdk/types"

type VoteHandler interface {
	VotesReceived(*sdk.Context, string, []*Vote)
	VoteType() string
}
