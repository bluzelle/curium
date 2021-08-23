package types

type AccountFetcherFn func(name string) (AcctInfo, error)

type AcctInfo struct {
	Name    string
	Address string
	AccNum  uint64
	Seq     uint64
}

