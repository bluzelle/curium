package ante

import (
	"github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"
	"testing"
)

type FreeGasMeterTestSuite struct {
	suite.Suite
	GasMeter          types.GasMeter
	ZeroLimitGasMeter types.GasMeter
}

func (suite *FreeGasMeterTestSuite) SetupTest() {
	suite.GasMeter = NewChargingGasMeter(1000)
	suite.ZeroLimitGasMeter = NewChargingGasMeter(0)
}

func (suite *FreeGasMeterTestSuite) TestFreeGasMeter_GasConsumed() {
	suite.Run("GasConsumed() always returns 0", func() {
		suite.GasMeter.ConsumeGas(100, "consume gas")
		suite.Equal(uint64(0), suite.GasMeter.GasConsumed())
	})
}

func (suite *FreeGasMeterTestSuite) TestFreeGasMeter_GasConsumedToLimit() {
	suite.Run("GasConsumedToLimit() always returns 0", func() {
		suite.GasMeter.ConsumeGas(1000, "consume gas")
		suite.Equal(uint64(0), suite.GasMeter.GasConsumedToLimit())
	})
}

func (suite *FreeGasMeterTestSuite) TestFreeGasMeter_IsPastLimit() {
	suite.Run("Should not panic on gas consumed", func() {
		suite.ZeroLimitGasMeter.ConsumeGas(1000, "consume gas")
	})

	suite.Run("Should not show past limit if limit is 0", func() {
		suite.ZeroLimitGasMeter.ConsumeGas(1000, "consume gas")
		suite.Falsef(suite.ZeroLimitGasMeter.IsPastLimit(), "should return false")
	})
}

func (suite *FreeGasMeterTestSuite) TestFreeGasMeter_ConsumeGas() {
	suite.Run("Should not panic if gas consumed is equal than limit", func() {
		suite.GasMeter.ConsumeGas(1000, "just right")
	})

	suite.Run("Should panic if gas consumed is more than limit", func() {
		defer func() { recover() }()

		suite.GasMeter.ConsumeGas(1001, "too much")

		// Never reaches here if `OtherFunctionThatPanics` panics.
		suite.Errorf(nil, "did not panic")
	})
}

func (suite *FreeGasMeterTestSuite) TestFreeGasMeter_ConsumeBillableGas() {
	suite.Run("should consume gas and update billableGas", func() {
		gasMeter := suite.GasMeter.(CrudGasMeterInterface)
		gasMeter.ConsumeBillableGas(1000, "just right")
		suite.Equal(uint64(1000), gasMeter.BillableGasConsumed())
	})
}

func TestFreeGasMeter(t *testing.T) {
	suite.Run(t, new(FreeGasMeterTestSuite))
}
