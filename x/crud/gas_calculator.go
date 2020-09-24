package crud

import "math"

const (
	LeaseGasRateDefaultValue float64 = 10.0
	LeaseGasRateMaximumValue float64 = 30.0
	LeaseGasRateParamB       float64 = 3.19621
	LeaseGasRateParamC       float64 = 172875
	LeaseGasRateParamG       float64 = 3.8925
)


func CalculateGasForLease(prevLease int64, lease int64, UUID string, key string, value string) uint64 {
	if lease > prevLease {
		gasRate := leaseGasRate(lease - prevLease)
//				gasRate := leaseGasRate(lease) - leaseGasRate(prevLease)
		valueSize := float64(len(UUID) + len(key) + len(value))
		return uint64(gasRate * valueSize)
	}
	return 0

}

func leaseGasRate(lease int64) float64 {
	return LeaseGasRateDefaultValue + (LeaseGasRateMaximumValue-LeaseGasRateDefaultValue)/
		math.Pow(1.0+math.Pow(float64(lease)/LeaseGasRateParamC, LeaseGasRateParamB), LeaseGasRateParamG)
}
