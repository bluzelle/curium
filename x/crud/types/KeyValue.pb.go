// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: crud/KeyValue.proto

package types

import (
	fmt "fmt"
	proto "github.com/gogo/protobuf/proto"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type KeyValue struct {
	Key   string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	Value []byte `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
}

func (m *KeyValue) Reset()         { *m = KeyValue{} }
func (m *KeyValue) String() string { return proto.CompactTextString(m) }
func (*KeyValue) ProtoMessage()    {}
func (*KeyValue) Descriptor() ([]byte, []int) {
	return fileDescriptor_4383c9ff602ab966, []int{0}
}
func (m *KeyValue) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *KeyValue) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_KeyValue.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *KeyValue) XXX_Merge(src proto.Message) {
	xxx_messageInfo_KeyValue.Merge(m, src)
}
func (m *KeyValue) XXX_Size() int {
	return m.Size()
}
func (m *KeyValue) XXX_DiscardUnknown() {
	xxx_messageInfo_KeyValue.DiscardUnknown(m)
}

var xxx_messageInfo_KeyValue proto.InternalMessageInfo

func (m *KeyValue) GetKey() string {
	if m != nil {
		return m.Key
	}
	return ""
}

func (m *KeyValue) GetValue() []byte {
	if m != nil {
		return m.Value
	}
	return nil
}

type KeyValueLease struct {
	Key   string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	Value []byte `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
	Lease *Lease `protobuf:"bytes,3,opt,name=lease,proto3" json:"lease,omitempty"`
}

func (m *KeyValueLease) Reset()         { *m = KeyValueLease{} }
func (m *KeyValueLease) String() string { return proto.CompactTextString(m) }
func (*KeyValueLease) ProtoMessage()    {}
func (*KeyValueLease) Descriptor() ([]byte, []int) {
	return fileDescriptor_4383c9ff602ab966, []int{1}
}
func (m *KeyValueLease) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *KeyValueLease) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_KeyValueLease.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *KeyValueLease) XXX_Merge(src proto.Message) {
	xxx_messageInfo_KeyValueLease.Merge(m, src)
}
func (m *KeyValueLease) XXX_Size() int {
	return m.Size()
}
func (m *KeyValueLease) XXX_DiscardUnknown() {
	xxx_messageInfo_KeyValueLease.DiscardUnknown(m)
}

var xxx_messageInfo_KeyValueLease proto.InternalMessageInfo

func (m *KeyValueLease) GetKey() string {
	if m != nil {
		return m.Key
	}
	return ""
}

func (m *KeyValueLease) GetValue() []byte {
	if m != nil {
		return m.Value
	}
	return nil
}

func (m *KeyValueLease) GetLease() *Lease {
	if m != nil {
		return m.Lease
	}
	return nil
}

func init() {
	proto.RegisterType((*KeyValue)(nil), "bluzelle.curium.crud.KeyValue")
	proto.RegisterType((*KeyValueLease)(nil), "bluzelle.curium.crud.KeyValueLease")
}

func init() { proto.RegisterFile("crud/KeyValue.proto", fileDescriptor_4383c9ff602ab966) }

var fileDescriptor_4383c9ff602ab966 = []byte{
	// 209 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0x4e, 0x2e, 0x2a, 0x4d,
	0xd1, 0xf7, 0x4e, 0xad, 0x0c, 0x4b, 0xcc, 0x29, 0x4d, 0xd5, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17,
	0x12, 0x49, 0xca, 0x29, 0xad, 0x4a, 0xcd, 0xc9, 0x49, 0xd5, 0x4b, 0x2e, 0x2d, 0xca, 0x2c, 0xcd,
	0xd5, 0x03, 0x29, 0x92, 0x12, 0x00, 0x2b, 0xcd, 0x49, 0x4d, 0x2c, 0x86, 0xaa, 0x53, 0x32, 0xe2,
	0xe2, 0x80, 0xe9, 0x14, 0x12, 0xe0, 0x62, 0xce, 0x4e, 0xad, 0x94, 0x60, 0x54, 0x60, 0xd4, 0xe0,
	0x0c, 0x02, 0x31, 0x85, 0x44, 0xb8, 0x58, 0xcb, 0x40, 0x52, 0x12, 0x4c, 0x0a, 0x8c, 0x1a, 0x3c,
	0x41, 0x10, 0x8e, 0x52, 0x16, 0x17, 0x2f, 0x4c, 0x8f, 0x0f, 0xc8, 0x28, 0x62, 0x35, 0x0a, 0x19,
	0x72, 0xb1, 0x82, 0xed, 0x96, 0x60, 0x56, 0x60, 0xd4, 0xe0, 0x36, 0x92, 0xd6, 0xc3, 0xe6, 0x48,
	0x3d, 0xb0, 0x99, 0x41, 0x10, 0x95, 0x4e, 0x8e, 0x27, 0x1e, 0xc9, 0x31, 0x5e, 0x78, 0x24, 0xc7,
	0xf8, 0xe0, 0x91, 0x1c, 0xe3, 0x84, 0xc7, 0x72, 0x0c, 0x17, 0x1e, 0xcb, 0x31, 0xdc, 0x78, 0x2c,
	0xc7, 0x10, 0xa5, 0x9e, 0x9e, 0x59, 0x92, 0x51, 0x9a, 0xa4, 0x97, 0x9c, 0x9f, 0xab, 0x0f, 0x33,
	0x47, 0x1f, 0x62, 0x8e, 0x7e, 0x85, 0x3e, 0xd8, 0xa3, 0x25, 0x95, 0x05, 0xa9, 0xc5, 0x49, 0x6c,
	0x60, 0x9f, 0x1a, 0x03, 0x02, 0x00, 0x00, 0xff, 0xff, 0x7c, 0xcb, 0x42, 0xab, 0x28, 0x01, 0x00,
	0x00,
}

func (m *KeyValue) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *KeyValue) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *KeyValue) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Value) > 0 {
		i -= len(m.Value)
		copy(dAtA[i:], m.Value)
		i = encodeVarintKeyValue(dAtA, i, uint64(len(m.Value)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Key) > 0 {
		i -= len(m.Key)
		copy(dAtA[i:], m.Key)
		i = encodeVarintKeyValue(dAtA, i, uint64(len(m.Key)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *KeyValueLease) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *KeyValueLease) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *KeyValueLease) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Lease != nil {
		{
			size, err := m.Lease.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintKeyValue(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0x1a
	}
	if len(m.Value) > 0 {
		i -= len(m.Value)
		copy(dAtA[i:], m.Value)
		i = encodeVarintKeyValue(dAtA, i, uint64(len(m.Value)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Key) > 0 {
		i -= len(m.Key)
		copy(dAtA[i:], m.Key)
		i = encodeVarintKeyValue(dAtA, i, uint64(len(m.Key)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintKeyValue(dAtA []byte, offset int, v uint64) int {
	offset -= sovKeyValue(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *KeyValue) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Key)
	if l > 0 {
		n += 1 + l + sovKeyValue(uint64(l))
	}
	l = len(m.Value)
	if l > 0 {
		n += 1 + l + sovKeyValue(uint64(l))
	}
	return n
}

func (m *KeyValueLease) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Key)
	if l > 0 {
		n += 1 + l + sovKeyValue(uint64(l))
	}
	l = len(m.Value)
	if l > 0 {
		n += 1 + l + sovKeyValue(uint64(l))
	}
	if m.Lease != nil {
		l = m.Lease.Size()
		n += 1 + l + sovKeyValue(uint64(l))
	}
	return n
}

func sovKeyValue(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozKeyValue(x uint64) (n int) {
	return sovKeyValue(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *KeyValue) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowKeyValue
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: KeyValue: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: KeyValue: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Key", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKeyValue
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthKeyValue
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthKeyValue
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Key = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Value", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKeyValue
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthKeyValue
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthKeyValue
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Value = append(m.Value[:0], dAtA[iNdEx:postIndex]...)
			if m.Value == nil {
				m.Value = []byte{}
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipKeyValue(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthKeyValue
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *KeyValueLease) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowKeyValue
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: KeyValueLease: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: KeyValueLease: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Key", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKeyValue
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthKeyValue
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthKeyValue
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Key = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Value", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKeyValue
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthKeyValue
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthKeyValue
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Value = append(m.Value[:0], dAtA[iNdEx:postIndex]...)
			if m.Value == nil {
				m.Value = []byte{}
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Lease", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKeyValue
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthKeyValue
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthKeyValue
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Lease == nil {
				m.Lease = &Lease{}
			}
			if err := m.Lease.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipKeyValue(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthKeyValue
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipKeyValue(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowKeyValue
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowKeyValue
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowKeyValue
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthKeyValue
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupKeyValue
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthKeyValue
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthKeyValue        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowKeyValue          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupKeyValue = fmt.Errorf("proto: unexpected end of group")
)
