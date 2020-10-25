package tax

import (
	"encoding/json"
	"reflect"
	"testing"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/stretchr/testify/assert"
)

func TestAppModuleBasic_Name(t *testing.T) {
	sut := AppModuleBasic{}
	assert.Equal(t, sut.Name(), "tax")
}

func TestAppModuleBasic_DefaultGenesis(t *testing.T) {
	genesis := AppModuleBasic{}.DefaultGenesis()
	assert.NotNil(t, genesis)
	assert.Equal(t, string(genesis), "")
}

func TestAppModuleBasic_ValidateGenesis(t *testing.T) {
	bz := json.RawMessage{}

	err := AppModuleBasic.ValidateGenesis(AppModuleBasic{}, bz)
	if err == nil {
		t.Error("ValidateGenesis did not return an error for an empty genesis file")
	} else if err.Error() != "UnmarshalJSON cannot decode empty bytes" {
		t.Errorf("ValidateGenesis returned err - %s:%s", err, err.Error())
	}

	bz = AppModuleBasic{}.DefaultGenesis()
	err = AppModuleBasic.ValidateGenesis(AppModuleBasic{}, bz)
	assert.Nil(t, err)
}

func TestAppModuleBasic_GetQueryCmd(t *testing.T) {
	cdc := codec.Codec{}
	command := AppModuleBasic{}.GetQueryCmd(&cdc)

	if command == nil {
		t.Error("GetQueryCmd function returned nil")
	} else {
		assert.Equal(t, command.Use, "tax")
		assert.Equal(t, command.Short, "Querying commands for the tax module")
		assert.True(t, command.DisableFlagParsing)
		assert.Equal(t, command.SuggestionsMinimumDistance, 2)

		sf1 := reflect.ValueOf(command.RunE)
		sf2 := reflect.ValueOf(client.ValidateCmd)
		assert.Equal(t, sf1, sf2)
	}
}

func TestAppModuleBasic_GetQueryCmd_TaxQueries(t *testing.T) {
	cdc := codec.Codec{}
	command := AppModuleBasic{}.GetQueryCmd(&cdc)

	commands := command.Commands()
	assert.Len(t, command.Commands(), 7)

	expectedUses := [...]string{"info"}
	expectedNames := [...]string{"info"}

	for i := 0; i < len(command.Commands()); i++ {
		expectedUse := expectedUses[i]
		expectedName := expectedNames[i]
		cmd := commands[i]
		assert.Equal(t, expectedUse, cmd.Use)
		assert.Equal(t, expectedName, cmd.Name())
	}
}

func TestAppModuleBasic_GetTxCmd(t *testing.T) {
	cdc := codec.Codec{}
	sut := AppModuleBasic{}
	cmd := sut.GetTxCmd(&cdc)

	if nil == cmd {
		t.Error("GetTxCmd method returned nil")
	} else {
		assert.Equal(t, "tax", cmd.Use)
		assert.Equal(t, "func(*cobra.Command, []string) error", reflect.TypeOf(client.ValidateCmd).String())
		assert.Equal(t, 2, cmd.SuggestionsMinimumDistance)

		commands := cmd.Commands()
		assert.Len(t, commands, 15)
	}
}

func TestNewAppModule(t *testing.T) {
	k := Keeper{}
	var bankkeeper bank.Keeper
	sut := NewAppModule(false, k, bankkeeper)

	assert.Equal(t, "tax", sut.Route())
}

func TestAppModule_Name(t *testing.T) {
	k := Keeper{}
	var bankkeeper bank.Keeper
	sut := NewAppModule(false, k, bankkeeper)

	assert.Equal(t, "tax", sut.Name())
}

func TestAppModule_Route(t *testing.T) {

}

func TestAppModule_QuerierRoute(t *testing.T) {
	sut := AppModule{}
	assert.Equal(t, "tax", sut.QuerierRoute())
}

func TestAppModule_NewQuerierHandler(t *testing.T) {
	sut := AppModule{}
	querier := sut.NewQuerierHandler()
	assert.Equal(t, "func(types.Context, []string, types.RequestQuery) ([]uint8, error)", reflect.TypeOf(querier).String())
}
