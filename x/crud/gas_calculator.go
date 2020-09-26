package crud

import "math"

const (
	LeaseGasRateDefaultValue float64 = 1
	LeaseGasRateMaximumValue float64 = 3
	LeaseGasRateParamB       float64 = 2.5
	LeaseGasRateParamC       float64 = 75
	LeaseGasRateParamG       float64 = 3
)


func CalculateGasForLease(prevLease int64, lease int64, prevBytes int, bytes int) uint64 {
	if lease > prevLease && bytes > prevBytes {
		leaseDays := LeaseInDays(lease - prevLease)
		gasRate := LeaseGasRate(leaseDays)
		return uint64(math.Round(gasRate * float64(leaseDays) * float64(bytes - prevBytes)))
	}
	return 0
}

func LeaseInDays(lease int64) int64 {
	return int64(math.Ceil((float64(lease) / 24 / 60 / 60) * 5))
}

func LeaseGasRate(days int64) float64 {
	return LeaseGasRateDefaultValue + (LeaseGasRateMaximumValue-LeaseGasRateDefaultValue) /
		math.Pow(1.0+math.Pow(float64(days)/LeaseGasRateParamC, LeaseGasRateParamB), LeaseGasRateParamG)
}
