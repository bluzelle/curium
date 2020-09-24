package crud

import (
	"fmt"
	"strconv"
	"strings"
	"testing"
	"github.com/stretchr/testify/assert"
)

func daysToLease(days int64) int64 {
	return (days * 24 * 60 * 60) / 5
}


func TestLeaseGasRate(t *testing.T) {
	var out []string
	for days := int64(1); days < 365; days += 1 {
		rate := LeaseGasRate(days)
		out = append(out, strconv.FormatUint(uint64(rate), 10))
	}
	fmt.Println(strings.Join(out, ","))

}

func TestCalculateGasForLease(t *testing.T) {
	// Output graph for a year
	var out []string
	for day := int64(1); day < 365; day += 1 {
		gas := CalculateGasForLease(0, daysToLease(day), "my-uuid", "my-key", "my-value")
		out = append(out, strconv.FormatUint(gas, 10))
	}
	fmt.Println(strings.Join(out, ","))

	// should return 0 if lease is shorter
	assert.Zero(t, CalculateGasForLease(50000, 10000, "my-uuid", "my-key", "my-value"))
}
