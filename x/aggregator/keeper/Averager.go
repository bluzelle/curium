package keeper

import sdk "github.com/cosmos/cosmos-sdk/types"

type Averager struct {
	Sum   sdk.Dec
	Count int64
}

func NewAverager() Averager {
	return Averager{
		Sum:   sdk.NewDec(0),
		Count: 0,
	}
}

func (a *Averager) Add(dec sdk.Dec) Averager{
	if a.Sum.IsNil() {
		a.Sum = dec
	} else {
		a.Sum = a.Sum.Add(dec)
	}
		a.Count =  a.Count + 1
		return *a
}

func (a Averager) CalculateAverage() sdk.Dec {
	return a.Sum.QuoInt64(a.Count)
}
