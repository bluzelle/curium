package crud

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func daysToLease(days int64) int64 {
	return (days * 24 * 60 * 60) / 5
}


func TestLeaseGasRate(t *testing.T) {
	assert.Equal(t, LeaseGasRate(0), 0.0006)
	assert.Equal(t, LeaseGasRate(1), 0.0005999753673998382)
	assert.Equal(t, LeaseGasRate(10), 0.0005923102202225553)
	assert.Equal(t, LeaseGasRate(128), 0.00020360528150588527)
}

func TestCalculateGasForLease(t *testing.T) {

	// Check that the gas is the right amount
	assert.Equal(t, CalculateGasForLease(0, daysToLease(1), 0, 20), uint64(1) )
	assert.Equal(t, CalculateGasForLease(0, 20000, 0, 20), uint64(1) )
	assert.Equal(t, CalculateGasForLease(0, daysToLease(1), 0, 1000 * 1000 * 1000), uint64(599975) )
	assert.Equal(t, CalculateGasForLease(0, daysToLease(77), 0, 1000 * 1000 * 1000), uint64(18882534) )

	// Should subtract the previous lease time when calculating the gas
	gas := CalculateGasForLease(0, 100, 0, 1000)
	assert.Equal(t, CalculateGasForLease(100, 200, 0, 1000), gas)

	// should return 0 if lease is shorter
	assert.Zero(t, CalculateGasForLease(50000, 10000, 0, 20))

}

