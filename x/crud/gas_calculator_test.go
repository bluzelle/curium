package crud

import (
	"fmt"
	"strconv"
	"strings"
	"testing"
)

func daysToLease(days int64) int64 {
	return (days * 24 * 60 * 60) / 5
}

func TestCalculateGasForLease(t *testing.T) {
	var out []string
	for day := int64(0); day < 365; day += 1 {
		gas := CalculateGasForLease(0, daysToLease(day), "my-uuid", "my-key", "my-value")
		out = append(out, strconv.FormatUint(gas, 10))
	}
	fmt.Println(strings.Join(out, ","))

}
