// Code generated by MockGen. DO NOT EDIT.
// Source: keeper.go

// Package mock_keeper is a generated GoMock package.
package mocks

import (
	types "github.com/bluzelle/curium/x/crud/internal/types"
	codec "github.com/cosmos/cosmos-sdk/codec"
	types0 "github.com/cosmos/cosmos-sdk/types"
	gomock "github.com/golang/mock/gomock"
	reflect "reflect"
)

// MockIKeeper is a mock of IKeeper interface
type MockIKeeper struct {
	ctrl     *gomock.Controller
	recorder *MockIKeeperMockRecorder
}

// MockIKeeperMockRecorder is the mock recorder for MockIKeeper
type MockIKeeperMockRecorder struct {
	mock *MockIKeeper
}

// NewMockIKeeper creates a new mock instance
func NewMockIKeeper(ctrl *gomock.Controller) *MockIKeeper {
	mock := &MockIKeeper{ctrl: ctrl}
	mock.recorder = &MockIKeeperMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockIKeeper) EXPECT() *MockIKeeperMockRecorder {
	return m.recorder
}

// DeleteAll mocks base method
func (m *MockIKeeper) DeleteAll(ctx types0.Context, store types0.KVStore, UUID string, owner types0.AccAddress) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "DeleteAll", ctx, store, UUID, owner)
}

// DeleteAll indicates an expected call of DeleteAll
func (mr *MockIKeeperMockRecorder) DeleteAll(ctx, store, UUID, owner interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteAll", reflect.TypeOf((*MockIKeeper)(nil).DeleteAll), ctx, store, UUID, owner)
}

// DeleteLease mocks base method
func (m *MockIKeeper) DeleteLease(leaseStore types0.KVStore, UUID, key string, blockHeight, leaseBlocks int64) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "DeleteLease", leaseStore, UUID, key, blockHeight, leaseBlocks)
}

// DeleteLease indicates an expected call of DeleteLease
func (mr *MockIKeeperMockRecorder) DeleteLease(leaseStore, UUID, key, blockHeight, leaseBlocks interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteLease", reflect.TypeOf((*MockIKeeper)(nil).DeleteLease), leaseStore, UUID, key, blockHeight, leaseBlocks)
}

// DeleteOwner mocks base method
func (m *MockIKeeper) DeleteOwner(store, ownerStore types0.KVStore, UUID, key string) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "DeleteOwner", store, ownerStore, UUID, key)
}

// DeleteOwner indicates an expected call of DeleteOwner
func (mr *MockIKeeperMockRecorder) DeleteOwner(store, ownerStore, UUID, key interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteOwner", reflect.TypeOf((*MockIKeeper)(nil).DeleteOwner), store, ownerStore, UUID, key)
}

// DeleteValue mocks base method
func (m *MockIKeeper) DeleteValue(ctx types0.Context, store, leaseStore types0.KVStore, UUID, key string) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "DeleteValue", ctx, store, leaseStore, UUID, key)
}

// DeleteValue indicates an expected call of DeleteValue
func (mr *MockIKeeperMockRecorder) DeleteValue(ctx, store, leaseStore, UUID, key interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteValue", reflect.TypeOf((*MockIKeeper)(nil).DeleteValue), ctx, store, leaseStore, UUID, key)
}

// GetCdc mocks base method
func (m *MockIKeeper) GetCdc() *codec.Codec {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetCdc")
	ret0, _ := ret[0].(*codec.Codec)
	return ret0
}

// GetCdc indicates an expected call of GetCdc
func (mr *MockIKeeperMockRecorder) GetCdc() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetCdc", reflect.TypeOf((*MockIKeeper)(nil).GetCdc))
}

// GetCount mocks base method
func (m *MockIKeeper) GetCount(ctx types0.Context, store types0.KVStore, UUID string, owner types0.AccAddress) types.QueryResultCount {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetCount", ctx, store, UUID, owner)
	ret0, _ := ret[0].(types.QueryResultCount)
	return ret0
}

// GetCount indicates an expected call of GetCount
func (mr *MockIKeeperMockRecorder) GetCount(ctx, store, UUID, owner interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetCount", reflect.TypeOf((*MockIKeeper)(nil).GetCount), ctx, store, UUID, owner)
}

// GetDefaultLeaseBlocks mocks base method
func (m *MockIKeeper) GetDefaultLeaseBlocks() int64 {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetDefaultLeaseBlocks")
	ret0, _ := ret[0].(int64)
	return ret0
}

// GetDefaultLeaseBlocks indicates an expected call of GetDefaultLeaseBlocks
func (mr *MockIKeeperMockRecorder) GetDefaultLeaseBlocks() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetDefaultLeaseBlocks", reflect.TypeOf((*MockIKeeper)(nil).GetDefaultLeaseBlocks))
}

// GetKVStore mocks base method
func (m *MockIKeeper) GetKVStore(ctx types0.Context) types0.KVStore {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetKVStore", ctx)
	ret0, _ := ret[0].(types0.KVStore)
	return ret0
}

// GetKVStore indicates an expected call of GetKVStore
func (mr *MockIKeeperMockRecorder) GetKVStore(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetKVStore", reflect.TypeOf((*MockIKeeper)(nil).GetKVStore), ctx)
}

// Search mocks base method
func (m *MockIKeeper) Search(ctx types0.Context, store types0.KVStore, UUID, prefix string, page, limit uint, direction string, owner types0.AccAddress) types.QueryResultKeyValues {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Search", ctx, store, UUID, prefix, page, limit, direction, owner)
	ret0, _ := ret[0].(types.QueryResultKeyValues)
	return ret0
}

// Search indicates an expected call of Search
func (mr *MockIKeeperMockRecorder) Search(ctx, store, UUID, prefix, page, limit, direction, owner interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Search", reflect.TypeOf((*MockIKeeper)(nil).Search), ctx, store, UUID, prefix, page, limit, direction, owner)
}

// GetKeyValues mocks base method
func (m *MockIKeeper) GetKeyValues(ctx types0.Context, store types0.KVStore, UUID string, owner types0.AccAddress) types.QueryResultKeyValues {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetKeyValues", ctx, store, UUID, owner)
	ret0, _ := ret[0].(types.QueryResultKeyValues)
	return ret0
}

// GetKeyValues indicates an expected call of GetKeyValues
func (mr *MockIKeeperMockRecorder) GetKeyValues(ctx, store, UUID, owner interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetKeyValues", reflect.TypeOf((*MockIKeeper)(nil).GetKeyValues), ctx, store, UUID, owner)
}

// GetKeys mocks base method
func (m *MockIKeeper) GetKeys(ctx types0.Context, store types0.KVStore, UUID string, owner types0.AccAddress) types.QueryResultKeys {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetKeys", ctx, store, UUID, owner)
	ret0, _ := ret[0].(types.QueryResultKeys)
	return ret0
}

// GetKeys indicates an expected call of GetKeys
func (mr *MockIKeeperMockRecorder) GetKeys(ctx, store, UUID, owner interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetKeys", reflect.TypeOf((*MockIKeeper)(nil).GetKeys), ctx, store, UUID, owner)
}

// GetMyKeys mocks base method
func (m *MockIKeeper) GetMyKeys(ctx types0.Context, ownerStore types0.KVStore, UUID string, owner types0.AccAddress) types.QueryResultMyKeys {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetMyKeys", ctx, ownerStore, UUID, owner)
	ret0, _ := ret[0].(types.QueryResultMyKeys)
	return ret0
}

// GetMyKeys indicates an expected call of GetMyKeys
func (mr *MockIKeeperMockRecorder) GetMyKeys(ctx, ownerStore, UUID, owner interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetMyKeys", reflect.TypeOf((*MockIKeeper)(nil).GetMyKeys), ctx, ownerStore, UUID, owner)
}

// GetLeaseStore mocks base method
func (m *MockIKeeper) GetLeaseStore(ctx types0.Context) types0.KVStore {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetLeaseStore", ctx)
	ret0, _ := ret[0].(types0.KVStore)
	return ret0
}

// GetLeaseStore indicates an expected call of GetLeaseStore
func (mr *MockIKeeperMockRecorder) GetLeaseStore(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetLeaseStore", reflect.TypeOf((*MockIKeeper)(nil).GetLeaseStore), ctx)
}

// GetOwnerStore mocks base method
func (m *MockIKeeper) GetOwnerStore(ctx types0.Context) types0.KVStore {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetOwnerStore", ctx)
	ret0, _ := ret[0].(types0.KVStore)
	return ret0
}

// GetOwnerStore indicates an expected call of GetOwnerStore
func (mr *MockIKeeperMockRecorder) GetOwnerStore(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetOwnerStore", reflect.TypeOf((*MockIKeeper)(nil).GetOwnerStore), ctx)
}

// GetNShortestLeases mocks base method
func (m *MockIKeeper) GetNShortestLeases(ctx types0.Context, store types0.KVStore, UUID string, owner types0.AccAddress, n uint64) types.QueryResultNShortestLeaseKeys {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetNShortestLeases", ctx, store, UUID, owner, n)
	ret0, _ := ret[0].(types.QueryResultNShortestLeaseKeys)
	return ret0
}

// GetNShortestLeases indicates an expected call of GetNShortestLeases
func (mr *MockIKeeperMockRecorder) GetNShortestLeases(ctx, store, UUID, owner, n interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetNShortestLeases", reflect.TypeOf((*MockIKeeper)(nil).GetNShortestLeases), ctx, store, UUID, owner, n)
}

// GetOwner mocks base method
func (m *MockIKeeper) GetOwner(ctx types0.Context, store types0.KVStore, UUID, key string) types0.AccAddress {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetOwner", ctx, store, UUID, key)
	ret0, _ := ret[0].(types0.AccAddress)
	return ret0
}

// GetOwner indicates an expected call of GetOwner
func (mr *MockIKeeperMockRecorder) GetOwner(ctx, store, UUID, key interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetOwner", reflect.TypeOf((*MockIKeeper)(nil).GetOwner), ctx, store, UUID, key)
}

// GetValue mocks base method
func (m *MockIKeeper) GetValue(ctx types0.Context, store types0.KVStore, UUID, key string) types.BLZValue {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetValue", ctx, store, UUID, key)
	ret0, _ := ret[0].(types.BLZValue)
	return ret0
}

// GetValue indicates an expected call of GetValue
func (mr *MockIKeeperMockRecorder) GetValue(ctx, store, UUID, key interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetValue", reflect.TypeOf((*MockIKeeper)(nil).GetValue), ctx, store, UUID, key)
}

// GetValuesIterator mocks base method
func (m *MockIKeeper) GetValuesIterator(ctx types0.Context, store types0.KVStore) types0.Iterator {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetValuesIterator", ctx, store)
	ret0, _ := ret[0].(types0.Iterator)
	return ret0
}

// GetValuesIterator indicates an expected call of GetValuesIterator
func (mr *MockIKeeperMockRecorder) GetValuesIterator(ctx, store interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetValuesIterator", reflect.TypeOf((*MockIKeeper)(nil).GetValuesIterator), ctx, store)
}

// IsKeyPresent mocks base method
func (m *MockIKeeper) IsKeyPresent(ctx types0.Context, store types0.KVStore, UUID, key string) bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "IsKeyPresent", ctx, store, UUID, key)
	ret0, _ := ret[0].(bool)
	return ret0
}

// IsKeyPresent indicates an expected call of IsKeyPresent
func (mr *MockIKeeperMockRecorder) IsKeyPresent(ctx, store, UUID, key interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "IsKeyPresent", reflect.TypeOf((*MockIKeeper)(nil).IsKeyPresent), ctx, store, UUID, key)
}

// ProcessLeasesAtBlockHeight mocks base method
func (m *MockIKeeper) ProcessLeasesAtBlockHeight(ctx types0.Context, store, leaseStore, ownerStore types0.KVStore, lease int64) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "ProcessLeasesAtBlockHeight", ctx, store, leaseStore, ownerStore, lease)
}

// ProcessLeasesAtBlockHeight indicates an expected call of ProcessLeasesAtBlockHeight
func (mr *MockIKeeperMockRecorder) ProcessLeasesAtBlockHeight(ctx, store, leaseStore, ownerStore, lease interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ProcessLeasesAtBlockHeight", reflect.TypeOf((*MockIKeeper)(nil).ProcessLeasesAtBlockHeight), ctx, store, leaseStore, ownerStore, lease)
}

// RenameKey mocks base method
func (m *MockIKeeper) RenameKey(ctx types0.Context, store types0.KVStore, UUID, key, newkey string) bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "RenameKey", ctx, store, UUID, key, newkey)
	ret0, _ := ret[0].(bool)
	return ret0
}

// RenameKey indicates an expected call of RenameKey
func (mr *MockIKeeperMockRecorder) RenameKey(ctx, store, UUID, key, newkey interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "RenameKey", reflect.TypeOf((*MockIKeeper)(nil).RenameKey), ctx, store, UUID, key, newkey)
}

// SetLease mocks base method
func (m *MockIKeeper) SetLease(leaseStore types0.KVStore, UUID, key string, blockHeight, lease int64) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "SetLease", leaseStore, UUID, key, blockHeight, lease)
}

// SetLease indicates an expected call of SetLease
func (mr *MockIKeeperMockRecorder) SetLease(leaseStore, UUID, key, blockHeight, lease interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetLease", reflect.TypeOf((*MockIKeeper)(nil).SetLease), leaseStore, UUID, key, blockHeight, lease)
}

// SetValue mocks base method
func (m *MockIKeeper) SetValue(ctx types0.Context, store types0.KVStore, UUID, key string, value types.BLZValue) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "SetValue", ctx, store, UUID, key, value)
}

// SetValue indicates an expected call of SetValue
func (mr *MockIKeeperMockRecorder) SetValue(ctx, store, UUID, key, value interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetValue", reflect.TypeOf((*MockIKeeper)(nil).SetValue), ctx, store, UUID, key, value)
}

// SetOwner mocks base method
func (m *MockIKeeper) SetOwner(store, ownerStore types0.KVStore, UUID, key string, owner types0.AccAddress) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "SetOwner", store, ownerStore, UUID, key, owner)
}

// SetOwner indicates an expected call of SetOwner
func (mr *MockIKeeperMockRecorder) SetOwner(store, ownerStore, UUID, key, owner interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetOwner", reflect.TypeOf((*MockIKeeper)(nil).SetOwner), store, ownerStore, UUID, key, owner)
}
