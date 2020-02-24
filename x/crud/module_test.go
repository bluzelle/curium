package crud

import (
	"encoding/json"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/stretchr/testify/assert"
	"reflect"
	"testing"
)

func TestAppModuleBasic_Name(t *testing.T) {
	sut := AppModuleBasic{}
	assert.Equal(t, sut.Name(), "crud")
}

// TODO: test RegisterCodec

func TestAppModuleBasic_DefaultGenesis(t *testing.T) {
	genesis := AppModuleBasic{}.DefaultGenesis()
	assert.NotNil(t, genesis)

	// Note: see crud/genesis.go func DefaultGenesisState() GenesisState
	assert.Equal(t, string(genesis), "{\"BlzValues\":null}")
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

// TODO func TestAppModuleBasic_RegisterRESTRoutes(t *testing.T)

func TestAppModuleBasic_GetQueryCmd(t *testing.T) {
	cdc := codec.Codec{}
	command := AppModuleBasic{}.GetQueryCmd(&cdc)

	if command == nil {
		t.Error("GetQueryCmd function returned nil")
	} else {
		assert.Equal(t, command.Use, "crud")
		assert.Equal(t, command.Short, "Querying commands for the crud module")
		assert.True(t, command.DisableFlagParsing)
		assert.Equal(t, command.SuggestionsMinimumDistance, 2)

		sf1 := reflect.ValueOf(command.RunE)
		sf2 := reflect.ValueOf(client.ValidateCmd)
		assert.Equal(t, sf1, sf2)
	}
}

func TestAppModuleBasic_GetQueryCmd_CrudQueries(t *testing.T) {
	cdc := codec.Codec{}
	command := AppModuleBasic{}.GetQueryCmd(&cdc)

	commands := command.Commands()
	assert.Len(t, command.Commands(), 3)

	expectedUses := [...]string{"has [UUID] [key]", "keys [UUID]", "read [UUID] [key]"}
	expectedNames := [...]string{"has", "keys", "read"}

	for i := 0; i < 3; i++ {
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
		assert.Equal(t, "crud", cmd.Use)
		assert.Equal(t, "func(*cobra.Command, []string) error", reflect.TypeOf(client.ValidateCmd).String())
		assert.Equal(t, 2, cmd.SuggestionsMinimumDistance)

		commands := cmd.Commands()
		assert.Len(t, commands, 6)

		// TODO: test crud commands -> create, read, update ...
	}
}

func TestNewAppModule(t *testing.T) {
	// TODO: this test needs fleshing out
	k := Keeper{}
	var bankkeeper bank.Keeper
	sut := NewAppModule(k, bankkeeper)

	assert.Equal(t, "crud", sut.Route())
}

func TestAppModule_Name(t *testing.T) {
	k := Keeper{}
	var bankkeeper bank.Keeper
	sut := NewAppModule(k, bankkeeper)

	assert.Equal(t, "crud", sut.Name())
}

// TODO func TestAppModule_RegisterInvariants(t *testing.T)

func TestAppModule_Route(t *testing.T) {
	sut := AppModule{}
	assert.Equal(t, "crud", sut.Route())
}

// TODO: func TestAppModule_NewHandler(t *testing.T) is a wrapper, implement this test in handler_test.go

func TestAppModule_QuerierRoute(t *testing.T) {
	sut := AppModule{}
	assert.Equal(t, "crud", sut.QuerierRoute())
}

func TestAppModule_NewQuerierHandler(t *testing.T) {
	sut := AppModule{}
	querier := sut.NewQuerierHandler()
	assert.Equal(t, "func(types.Context, []string, types.RequestQuery) ([]uint8, types.Error)", reflect.TypeOf(querier).String())

	// TODO: test the existence of a query?
}

// TODO AppModule BeginBlock method is empty

// TODO AppModule EndBlock calls an abci method ValidatorUpdate, currently unsure of what to test in this case

// TODO TestAppModule_InitGenesis(t *testing.T) Need to figure out how to mock objects in Cosmos-sdk

// TODO func TestAppModule_ExportGenesis(t *testing.T) Need to figure out how to mock objects in Cosmos-sdk
