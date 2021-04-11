package keeper

import (
	"github.com/stretchr/testify/assert"
	"testing"
	"time"
)

func TestGenerateBatch(t *testing.T) {
	t.Run("Should return a batch based on time", func(t *testing.T) {
		ti := time.Date(2020, 01, 02, 03, 04, 05, 06, time.UTC)
		s := GenerateBatch(ti)
		assert.Equal(t, "2020-01-02-03:04", s, "Invalid batch")
	})
}