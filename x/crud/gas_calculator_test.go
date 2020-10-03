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

	t.Run("Smaller amounts should default to 200000 bytes", func(t *testing.T) {
		assert.Equal(t, CalculateGasForLease(daysToLease(1), 20), uint64(599975))
		assert.Equal(t, CalculateGasForLease(daysToLease(1), 150000), uint64(599975))

		defaultBytesGas := CalculateGasForLease(daysToLease(100), 200000)
		assert.Equal(t, CalculateGasForLease(daysToLease(100), 100), defaultBytesGas)
	})


	t.Run("Larger data should calculate the correct gas", func(t *testing.T) {
		assert.Equal(t, CalculateGasForLease( daysToLease(1),  1000 * 1000 * 1000), uint64(2999876837) )
		assert.Equal(t, CalculateGasForLease(daysToLease(77), 1000 * 1000 * 1000), uint64(94412671082) )
	})

	t.Run("Larger number of days should calculate correct gas", func(t *testing.T) {
		assert.Equal(t, CalculateGasForLease(daysToLease(50), 1), uint64(17900418))
		assert.Equal(t, CalculateGasForLease(daysToLease(50), 1000000000), uint64(89502092347))
	})
}

