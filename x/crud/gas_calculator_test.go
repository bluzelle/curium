package crud

import (
	"github.com/stretchr/testify/assert"
	"math"
	"testing"
)

func daysToLease(days int64) int64 {
	return int64(math.Round(float64(days) * (24 * 60 * 60 / 5.5)))
}


func TestLeaseGasRatePerByte(t *testing.T) {
	assert.Equal(t, leaseGasRatePerByte(0), 3.0)
	assert.Equal(t, leaseGasRatePerByte(1), 2.999876836999191)
	assert.Equal(t, leaseGasRatePerByte(10), 2.961551101112777)
	assert.Equal(t, leaseGasRatePerByte(120), 1.0262720621151311)


}

func TestCalculateGasForLease(t *testing.T) {

	t.Run("Should work for partial day leases", func(t *testing.T) {
		assert.InDelta(t, uint64(5997), CalculateGasForLease(157, 20), 3)

	})

	t.Run("Smaller number of bytes should default to 200000 bytes", func(t *testing.T) {
		assert.InDelta(t, uint64(599975), CalculateGasForLease(daysToLease(1), 20), 3)
		assert.InDelta(t, uint64(599975), CalculateGasForLease(daysToLease(1), 150000), 3)

		defaultBytesGas := CalculateGasForLease(daysToLease(100), 200000)
		assert.Equal(t, CalculateGasForLease(daysToLease(100), 100), defaultBytesGas)
	})


	t.Run("Larger data should calculate the correct gas", func(t *testing.T) {
		assert.InDelta(t, uint64(2999876837), CalculateGasForLease( daysToLease(1),  1000 * 1000 * 1000),  17359)
		assert.Equal(t, uint64(94412671082), CalculateGasForLease(daysToLease(77), 1000 * 1000 * 1000))
	})

	t.Run("Larger number of days should calculate correct gas", func(t *testing.T) {
		assert.InDelta(t, uint64(17900418), CalculateGasForLease(daysToLease(50), 1), 2)
		assert.InDelta(t, uint64(89502092347), CalculateGasForLease(daysToLease(50), 1000000000), 7373)
	})
}

