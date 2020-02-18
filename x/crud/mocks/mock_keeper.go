// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/bluzelle/curium/x/crud/internal/keeper (interfaces: IKeeper)

// Package mocks is a generated GoMock package.
package mocks

import (
	types "github.com/bluzelle/curium/x/crud/internal/types"
	types0 "github.com/cosmos/cosmos-sdk/types"
	gomock "github.com/golang/mock/gomock"
	db "github.com/tendermint/tm-db"
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

// DeleteBLZValue mocks base method
func (m *MockIKeeper) DeleteBLZValue(arg0 types0.Context, arg1, arg2 string) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "DeleteBLZValue", arg0, arg1, arg2)
}

// DeleteBLZValue indicates an expected call of DeleteBLZValue
func (mr *MockIKeeperMockRecorder) DeleteBLZValue(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteBLZValue", reflect.TypeOf((*MockIKeeper)(nil).DeleteBLZValue), arg0, arg1, arg2)
}

// GetBLZValue mocks base method
func (m *MockIKeeper) GetBLZValue(arg0 types0.Context, arg1, arg2 string) types.BLZValue {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetBLZValue", arg0, arg1, arg2)
	ret0, _ := ret[0].(types.BLZValue)
	return ret0
}

// GetBLZValue indicates an expected call of GetBLZValue
func (mr *MockIKeeperMockRecorder) GetBLZValue(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetBLZValue", reflect.TypeOf((*MockIKeeper)(nil).GetBLZValue), arg0, arg1, arg2)
}

// GetKeys mocks base method
func (m *MockIKeeper) GetKeys(arg0 types0.Context, arg1 string) types.QueryResultKeys {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetKeys", arg0, arg1)
	ret0, _ := ret[0].(types.QueryResultKeys)
	return ret0
}

// GetKeys indicates an expected call of GetKeys
func (mr *MockIKeeperMockRecorder) GetKeys(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetKeys", reflect.TypeOf((*MockIKeeper)(nil).GetKeys), arg0, arg1)
}

// GetOwner mocks base method
func (m *MockIKeeper) GetOwner(arg0 types0.Context, arg1, arg2 string) types0.AccAddress {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetOwner", arg0, arg1, arg2)
	ret0, _ := ret[0].(types0.AccAddress)
	return ret0
}

// GetOwner indicates an expected call of GetOwner
func (mr *MockIKeeperMockRecorder) GetOwner(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetOwner", reflect.TypeOf((*MockIKeeper)(nil).GetOwner), arg0, arg1, arg2)
}

// GetValuesIterator mocks base method
func (m *MockIKeeper) GetValuesIterator(arg0 types0.Context) db.Iterator {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetValuesIterator", arg0)
	ret0, _ := ret[0].(db.Iterator)
	return ret0
}

// GetValuesIterator indicates an expected call of GetValuesIterator
func (mr *MockIKeeperMockRecorder) GetValuesIterator(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetValuesIterator", reflect.TypeOf((*MockIKeeper)(nil).GetValuesIterator), arg0)
}

// IsKeyPresent mocks base method
func (m *MockIKeeper) IsKeyPresent(arg0 types0.Context, arg1, arg2 string) bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "IsKeyPresent", arg0, arg1, arg2)
	ret0, _ := ret[0].(bool)
	return ret0
}

// IsKeyPresent indicates an expected call of IsKeyPresent
func (mr *MockIKeeperMockRecorder) IsKeyPresent(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "IsKeyPresent", reflect.TypeOf((*MockIKeeper)(nil).IsKeyPresent), arg0, arg1, arg2)
}

// IsUUIDKeyPresent mocks base method
func (m *MockIKeeper) IsUUIDKeyPresent(arg0 types0.Context, arg1 string) bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "IsUUIDKeyPresent", arg0, arg1)
	ret0, _ := ret[0].(bool)
	return ret0
}

// IsUUIDKeyPresent indicates an expected call of IsUUIDKeyPresent
func (mr *MockIKeeperMockRecorder) IsUUIDKeyPresent(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "IsUUIDKeyPresent", reflect.TypeOf((*MockIKeeper)(nil).IsUUIDKeyPresent), arg0, arg1)
}

// SetBLZValue mocks base method
func (m *MockIKeeper) SetBLZValue(arg0 types0.Context, arg1, arg2 string, arg3 types.BLZValue) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "SetBLZValue", arg0, arg1, arg2, arg3)
}

// SetBLZValue indicates an expected call of SetBLZValue
func (mr *MockIKeeperMockRecorder) SetBLZValue(arg0, arg1, arg2, arg3 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetBLZValue", reflect.TypeOf((*MockIKeeper)(nil).SetBLZValue), arg0, arg1, arg2, arg3)
}
