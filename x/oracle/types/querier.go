package types

import "github.com/cosmos/cosmos-sdk/types"

const (
	QueryListSources = "listsources"
	QuerySearchVotes = "searchvotes"
	QuerySearchVoteKeys = "searchvotekeys"
	QueryCalculateProofHash = "calculateVoteProofHash"
)

type QueryResultListSources = []struct{
	Name string
	Url string
	Property string
	Owner types.AccAddress
}


type SearchVotesQueryRequest = struct{
	Prefix string
}

type CalculateProofHashQueryRequest = struct {
	Valcons string
	Value string
}