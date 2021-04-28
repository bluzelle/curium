// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: nft/nft.proto

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

type Nft struct {
	Creator string `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Id      uint32 `protobuf:"varint,2,opt,name=id,proto3" json:"id,omitempty"`
	Mime    string `protobuf:"bytes,3,opt,name=mime,proto3" json:"mime,omitempty"`
	Meta    string `protobuf:"bytes,4,opt,name=meta,proto3" json:"meta,omitempty"`
}

func (m *Nft) Reset()         { *m = Nft{} }
func (m *Nft) String() string { return proto.CompactTextString(m) }
func (*Nft) ProtoMessage()    {}
func (*Nft) Descriptor() ([]byte, []int) {
	return fileDescriptor_fe8ab7e15b7f0646, []int{0}
}
func (m *Nft) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Nft) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Nft.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Nft) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Nft.Merge(m, src)
}
func (m *Nft) XXX_Size() int {
	return m.Size()
}
func (m *Nft) XXX_DiscardUnknown() {
	xxx_messageInfo_Nft.DiscardUnknown(m)
}

var xxx_messageInfo_Nft proto.InternalMessageInfo

func (m *Nft) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Nft) GetId() uint32 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Nft) GetMime() string {
	if m != nil {
		return m.Mime
	}
	return ""
}

func (m *Nft) GetMeta() string {
	if m != nil {
		return m.Meta
	}
	return ""
}

func init() {
	proto.RegisterType((*Nft)(nil), "bluzelle.curium.nft.Nft")
}

func init() { proto.RegisterFile("nft/nft.proto", fileDescriptor_fe8ab7e15b7f0646) }

var fileDescriptor_fe8ab7e15b7f0646 = []byte{
	// 190 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0xcd, 0x4b, 0x2b, 0xd1,
	0xcf, 0x4b, 0x2b, 0xd1, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x12, 0x4e, 0xca, 0x29, 0xad, 0x4a,
	0xcd, 0xc9, 0x49, 0xd5, 0x4b, 0x2e, 0x2d, 0xca, 0x2c, 0xcd, 0xd5, 0xcb, 0x4b, 0x2b, 0x51, 0x0a,
	0xe7, 0x62, 0xf6, 0x4b, 0x2b, 0x11, 0x92, 0xe0, 0x62, 0x4f, 0x2e, 0x4a, 0x4d, 0x2c, 0xc9, 0x2f,
	0x92, 0x60, 0x54, 0x60, 0xd4, 0xe0, 0x0c, 0x82, 0x71, 0x85, 0xf8, 0xb8, 0x98, 0x32, 0x53, 0x24,
	0x98, 0x14, 0x18, 0x35, 0x78, 0x83, 0x98, 0x32, 0x53, 0x84, 0x84, 0xb8, 0x58, 0x72, 0x33, 0x73,
	0x53, 0x25, 0x98, 0xc1, 0xca, 0xc0, 0x6c, 0xb0, 0x58, 0x6a, 0x49, 0xa2, 0x04, 0x0b, 0x54, 0x2c,
	0xb5, 0x24, 0xd1, 0xc9, 0xe1, 0xc4, 0x23, 0x39, 0xc6, 0x0b, 0x8f, 0xe4, 0x18, 0x1f, 0x3c, 0x92,
	0x63, 0x9c, 0xf0, 0x58, 0x8e, 0xe1, 0xc2, 0x63, 0x39, 0x86, 0x1b, 0x8f, 0xe5, 0x18, 0xa2, 0xd4,
	0xd2, 0x33, 0x4b, 0x32, 0x4a, 0x93, 0xf4, 0x92, 0xf3, 0x73, 0xf5, 0x61, 0x4e, 0xd2, 0x87, 0x38,
	0x49, 0xbf, 0x02, 0xe4, 0x5e, 0xfd, 0x92, 0xca, 0x82, 0xd4, 0xe2, 0x24, 0x36, 0xb0, 0xb3, 0x8d,
	0x01, 0x01, 0x00, 0x00, 0xff, 0xff, 0x14, 0x96, 0xa5, 0x4f, 0xc7, 0x00, 0x00, 0x00,
}

func (m *Nft) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Nft) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Nft) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Meta) > 0 {
		i -= len(m.Meta)
		copy(dAtA[i:], m.Meta)
		i = encodeVarintNft(dAtA, i, uint64(len(m.Meta)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.Mime) > 0 {
		i -= len(m.Mime)
		copy(dAtA[i:], m.Mime)
		i = encodeVarintNft(dAtA, i, uint64(len(m.Mime)))
		i--
		dAtA[i] = 0x1a
	}
	if m.Id != 0 {
		i = encodeVarintNft(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintNft(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintNft(dAtA []byte, offset int, v uint64) int {
	offset -= sovNft(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Nft) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovNft(uint64(l))
	}
	if m.Id != 0 {
		n += 1 + sovNft(uint64(m.Id))
	}
	l = len(m.Mime)
	if l > 0 {
		n += 1 + l + sovNft(uint64(l))
	}
	l = len(m.Meta)
	if l > 0 {
		n += 1 + l + sovNft(uint64(l))
	}
	return n
}

func sovNft(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozNft(x uint64) (n int) {
	return sovNft(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Nft) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowNft
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
			return fmt.Errorf("proto: Nft: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Nft: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNft
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
				return ErrInvalidLengthNft
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthNft
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNft
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Id |= uint32(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Mime", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNft
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
				return ErrInvalidLengthNft
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthNft
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Mime = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Meta", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNft
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
				return ErrInvalidLengthNft
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthNft
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Meta = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipNft(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthNft
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
func skipNft(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowNft
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
					return 0, ErrIntOverflowNft
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
					return 0, ErrIntOverflowNft
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
				return 0, ErrInvalidLengthNft
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupNft
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthNft
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthNft        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowNft          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupNft = fmt.Errorf("proto: unexpected end of group")
)