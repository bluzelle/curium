package keeper

import (
	"github.com/bluzelle/curium/x/crud/types"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"math"
)

const (
	LeaseGasRateDefaultValue float64 = 1
	LeaseGasRateMaximumValue float64 = 3
	LeaseGasRateParamB       float64 = 2.5
	LeaseGasRateParamC       float64 = 75
	LeaseGasRateParamG       float64 = 3
)

func CalculateGasForLease(lease types.Lease, bytes int) storetypes.Gas{
	leaseDays := LeaseInDays(lease)
	gasRate := leaseGasRatePerByte(leaseDays)
	return uint64(math.Round(gasRate * leaseDays * math.Max(float64(bytes), 200000)))
}

func LeaseInDays(lease types.Lease) float64 {
	return (float64(lease.Days) + float64(lease.Hours) / 24 + float64(lease.Minutes) / 60 + float64(lease.Seconds) / 3600 + float64(lease.Years) * 365) * 5.5
}

func leaseGasRatePerByte(days float64) float64 {
	return LeaseGasRateDefaultValue + (LeaseGasRateMaximumValue-LeaseGasRateDefaultValue)/
		math.Pow(1.0+math.Pow(days/LeaseGasRateParamC, LeaseGasRateParamB), LeaseGasRateParamG)
}


