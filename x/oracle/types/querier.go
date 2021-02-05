package types

import "github.com/cosmos/cosmos-sdk/types"

const (
	QueryListSources = "listsources"
	QuerySearchVotes = "searchvotes"
)

type QueryResultListSources = []struct{
	Name string
	Url string
	Property string
	Owner types.AccAddress
}


type SearchVotesQueryData = struct{
	Prefix string
}

