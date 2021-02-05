package types

import "github.com/cosmos/cosmos-sdk/types"

// Query endpoints supported by the oracle querier
const (
	QueryListSources = "listsources"
	QuerySearchVotes = "searchvotes"
)

type QueryResultListSources = []struct{
	Name string `json:"name"`
	Url string `json:"url"`
	Property string `json:"property"`
	Owner types.AccAddress `json:"owner"`
}

type QueryResultSearchVotes = []struct{

}

type SearchVotesQueryData = struct{
	Prefix string
}

