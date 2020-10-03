package crud

import "math"

const (
	LeaseGasRateDefaultValue float64 = 1
	LeaseGasRateMaximumValue float64 = 3
	LeaseGasRateParamB       float64 = 2.5
	LeaseGasRateParamC       float64 = 75
	LeaseGasRateParamG       float64 = 3
)

func CalculateGasForLease(lease int64, bytes int) uint64 {
	leaseDays := LeaseInDays(lease)
	gasRate := LeaseGasRate(leaseDays)
	return uint64(math.Round(gasRate * leaseDays * math.Max(float64(bytes), 200000)))
}

func LeaseInDays(lease int64) float64 {
	return math.Ceil((float64(lease) / 24 / 60 / 60) * 5)
}

func LeaseGasRate(days float64) float64 {
	return LeaseGasRateDefaultValue + (LeaseGasRateMaximumValue-LeaseGasRateDefaultValue)/
		math.Pow(1.0+math.Pow(days/LeaseGasRateParamC, LeaseGasRateParamB), LeaseGasRateParamG)
}
