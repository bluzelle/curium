package types

import (
	cc "github.com/cosmos/cosmos-sdk/codec"
	"github.com/stretchr/testify/assert"
	"reflect"
	"testing"
)

func TestNewBLZValue(t *testing.T) {
	assert.True(t, reflect.DeepEqual(NewBLZValue(), BLZValue{}))
}

func TestBLZValue_Unmarshal(t *testing.T) {
	value := BLZValue{
		Value: "value",
		Owner: []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
	}

	cdc := cc.New()
	b, _ := cdc.MarshalBinaryBare(value)

	resultValue := BLZValue{}

	assert.True(t, reflect.DeepEqual(value, resultValue.Unmarshal(b)))
}

func TestBLZValue_String(t *testing.T) {
	value := BLZValue{
		Value: "value",
		Owner: []byte("bluzelle1t0ywtmrduldf6h4wqrnnpyp9wr6law2u5jwa23"),
	}
	assert.Equal(t, value.String(), "Value: value Owner: cosmos1vfk827n9d3kx2vt5xpuhwardwfj82mryvcmxsdrhw9exumns09crjamjxekxzaejw56k5ampxgeslhg4h3")

	value = BLZValue{
		Value: "value",
	}
	assert.Equal(t, value.String(), "Value: value Owner: <empty>")

}
