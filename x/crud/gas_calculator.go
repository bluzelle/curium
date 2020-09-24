package crud

import "math"

const (
	LeaseGasRateDefaultValue float64 = 10.0
	LeaseGasRateMaximumValue float64 = 30.0
	LeaseGasRateParamB       float64 = 2.5
	LeaseGasRateParamC       float64 = 30
	LeaseGasRateParamG       float64 = 3.8925
	Scaler					 float64 = .01
)


func CalculateGasForLease(prevLease int64, lease int64, UUID string, key string, value string) uint64 {
	if lease > prevLease {
		leaseDays := leaseTimeInDays(lease - prevLease)
		gasRate := LeaseGasRate(leaseDays)
		dataSize := len(UUID) + len(key) + len(value)
		return uint64(gasRate * float64(leaseDays) * float64(dataSize) * Scaler)
	}
	return 0
}

func leaseTimeInDays(lease int64) int64 {
	return int64(math.Ceil((float64(lease) / 24 / 60 / 60) * 5))
}

func LeaseGasRate(days int64) float64 {
	return LeaseGasRateDefaultValue + (LeaseGasRateMaximumValue-LeaseGasRateDefaultValue) /
		math.Pow(1.0+math.Pow(float64(days)/LeaseGasRateParamC, LeaseGasRateParamB), LeaseGasRateParamG)
}
