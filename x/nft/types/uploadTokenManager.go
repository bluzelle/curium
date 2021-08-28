package types

import (
	"github.com/cosmos/cosmos-sdk/types"
	"sync"
)

type UploadToken struct {
	Value       string
	Hash        string
	Size        uint64
	Uploaded    uint64
	Owner       types.AccAddress
	ExpireBlock int64
}

type UploadTokenManager struct {
	Tokens sync.Map
}



func NewUploadTokenManager() *UploadTokenManager {
	return &UploadTokenManager{}
}

func (tt *UploadTokenManager) ExpireTokens(block int64) []*UploadToken {
	var expiredTokens []*UploadToken
	tt.Tokens.Range(func (hash interface{}, token interface{}) bool {
		if token.(*UploadToken).ExpireBlock <= block {
			tt.Tokens.Delete(hash)
			expiredTokens = append(expiredTokens, token.(*UploadToken))
		}
		return true
	})
	return expiredTokens
}

func (tt *UploadTokenManager) InvalidateToken(hash string) {
	tt.Tokens.Delete(hash)
}

func (tt *UploadTokenManager) ReportUpload(hash string, size uint64) {
	token := tt.GetToken(hash)
	if token != nil {
		token.Uploaded = token.Uploaded + size
	}
}

func (tt *UploadTokenManager) IsUploadComplete(hash string) bool {
	token := tt.GetToken(hash)
	if token == nil {
		return true
	}
	if token.Uploaded >= token.Size {
		tt.InvalidateToken(hash)
		return true
	}
	return false
}

func (tt *UploadTokenManager) GetToken(hash string) *UploadToken {
	token, ok := tt.Tokens.Load(hash)
	if ok {
		return token.(*UploadToken)
	}
	return nil
}

func (tt *UploadTokenManager) IsTokenValid(hash string) bool {
	return tt.GetToken(hash) != nil
}

func (tt *UploadTokenManager) NewUploadToken(hash string, size uint64, owner types.AccAddress, expire int64) *UploadToken {
	token := &UploadToken{
		Value:       hash,
		Hash:        hash,
		Size:        size,
		Owner:       owner,
		ExpireBlock: expire,
	}
	tt.Tokens.Store(hash, token)
	return token
}
