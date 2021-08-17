package keeper

import sdk "github.com/cosmos/cosmos-sdk/types"

type Averager struct {
	Sum       sdk.Dec
	Count     int64
	WeightSum int64
}

func NewAverager() Averager {
	return Averager{
		Sum:       sdk.NewDec(0),
		WeightSum: 0,
		Count:     0,
	}
}

func (a *Averager) Add(dec sdk.Dec, weight int64) Averager {
	if a.Sum.IsNil() {
		a.Sum = dec.MulInt64(weight)
	} else {
		a.Sum = a.Sum.Add(dec.MulInt64(weight))
	}
	a.WeightSum = a.WeightSum + weight
	a.Count = a.Count + 1
	return *a
}

func (a Averager) CalculateAverage() sdk.Dec {
	if a.WeightSum == 0 {
		logger.Info("zero weight in average")
		return a.Sum.QuoInt64(a.Count)
	}
	return a.Sum.QuoInt64(a.WeightSum)
}
