package crud

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func daysToLease(days int64) int64 {
	return days * (24 * 60 * 60 / 5)
}


func TestLeaseGasRate(t *testing.T) {
	assert.Equal(t, LeaseGasRate(0), 3.0)
	assert.Equal(t, LeaseGasRate(1), 2.999876836999191)
	assert.Equal(t, LeaseGasRate(10), 2.961551101112777)
	assert.Equal(t, LeaseGasRate(120), 1.0262720621151311)
}

func TestCalculateGasForLease(t *testing.T) {

	// Check that the gas is the right amount
	assert.Equal(t, CalculateGasForLease(0, daysToLease(1), 0, 20), uint64(60) )
	assert.Equal(t, CalculateGasForLease(0, 20000, 0, 20), uint64(120) )
	assert.Equal(t, CalculateGasForLease(0, daysToLease(1), 0, 1000 * 1000 * 1000), uint64(2999876837) )
	assert.Equal(t, CalculateGasForLease(0, daysToLease(77), 0, 1000 * 1000 * 1000), uint64(94412671082) )

	// Should subtract the previous lease time when calculating the gas
	gas := CalculateGasForLease(0, 100, 0, 1000)
	assert.Equal(t, CalculateGasForLease(100, 200, 0, 1000), gas)

	// should return 0 if lease is shorter
	assert.Zero(t, CalculateGasForLease(50000, 10000, 0, 20))

}

