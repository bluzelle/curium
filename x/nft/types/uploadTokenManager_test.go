package types

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test(t *testing.T) {
	t.Run("NewUploadToken()", func(t *testing.T) {
		t.Run("Should create a new token with a value", func(t *testing.T) {
			manager := NewUploadTokenManager()
			token := manager.NewUploadToken("my-hash", uint64(1000), nil, int64(1))
			assert.Equal(t, 48, len(token.Value))
			assert.Equal(t, "my-hash", token.Hash)
			assert.Equal(t, uint64(1000), token.Size)
		})
	})

	t.Run("Should expire tokens given a block greater than the expiry", func(t *testing.T) {
		manager := NewUploadTokenManager()
		manager.NewUploadToken("hash1", 1000, nil, int64(5))
		manager.NewUploadToken("hash2", 1000, nil, int64(10))

		manager.ExpireTokens(4)
		assert.True(t, manager.IsTokenValid("hash1"))
		assert.True(t, manager.IsTokenValid("hash2"))

		manager.ExpireTokens(5)
		assert.False(t, manager.IsTokenValid("hash1"))
		assert.True(t, manager.IsTokenValid("hash2"))

		manager.ExpireTokens(11)
		assert.False(t, manager.IsTokenValid("hash1"))
		assert.False(t, manager.IsTokenValid("hash2"))
	})

	t.Run("InvalidateTokens()", func(t *testing.T) {
		t.Run("Should invalidate a token", func(t *testing.T) {
			manager := NewUploadTokenManager()
			manager.NewUploadToken("hash1", 1000, nil, int64(5))
			manager.NewUploadToken("hash2", 1000, nil, int64(10))
			manager.InvalidateToken("hash2")
			assert.True(t, manager.IsTokenValid("hash1"))
			assert.False(t, manager.IsTokenValid("hash2"))
		})
	})

	t.Run("GetToken()", func(t *testing.T) {
		t.Run("Should return a token from the store", func(t *testing.T) {
			manager := NewUploadTokenManager()
			token := manager.NewUploadToken("hash1", 1000, nil, int64(5))
			assert.Equal(t, token, manager.GetToken("hash1"))
		})

		t.Run("Should return nil if no token in store", func(t *testing.T) {
			manager := NewUploadTokenManager()
			assert.Nil(t, manager.GetToken("hash"))
		})
	})
}


