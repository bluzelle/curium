package keeper

import (
	"github.com/bluzelle/curium/app/accountFetcher/types"
)

type AccountInfoItem struct {
	AccNum uint64
	Seq    uint64
}

type AccountInfo struct {
	items       map[string]AccountInfoItem
	acctFetcher types.AccountFetcherFn
}

func NewAccountInfo(acctFetcher types.AccountFetcherFn) *AccountInfo {
	return &AccountInfo{
		acctFetcher: acctFetcher,
		items: make(map[string]AccountInfoItem),
	}
}

func (ai *AccountInfo) SetAcctInfo(from string, item AccountInfoItem) *AccountInfo {
	ai.items[from] = item
	return ai
}

func (ai *AccountInfo) GetAcctInfo(from string) *AccountInfoItem {
	val, ok := ai.items[from]
	if ok {
		return &val
	}
	return nil
}

func (ai *AccountInfo) Next(from string) (*AccountInfoItem, error) {
	var err error
	if ai.Exists(from) {
		ai.IncrementSeq(from)
	} else {
		info, err := ai.acctFetcher(from)
		if err != nil {
			return nil, err
		}
		ai.SetAcctInfo(from, AccountInfoItem{
			AccNum: info.AccNum,
			Seq:    info.Seq,
		})
	}

	return ai.GetAcctInfo(from), err
}

func (ai *AccountInfo) IncrementSeq(from string) uint64 {
	acct := ai.GetAcctInfo(from)
	ai.items[from] = AccountInfoItem{
		Seq:    acct.Seq + 1,
		AccNum: acct.AccNum,
	}
	return acct.Seq + 1
}

func (ai *AccountInfo) Exists(from string) bool {
	return ai.GetAcctInfo(from) != nil
}
