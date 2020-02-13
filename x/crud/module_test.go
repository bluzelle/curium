package crud

import (
	"encoding/json"
	"github.com/bluzelle/curium/x/crud/internal/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"reflect"
	"testing"
)

func TestAppModuleBasic_Name(t *testing.T) {
	sut := AppModuleBasic{}
	if sut.Name() != "crud" {
		t.Error("Expected ModuleName, crud, not set")
	}
}

// TODO: test RegisterCodec

func TestAppModuleBasic_DefaultGenesis(t *testing.T) {
	genesis := AppModuleBasic{}.DefaultGenesis()
	if genesis == nil {
		t.Error("DefaultGenesis() returned nil")
	}

	// Note: see crud/genesis.go func DefaultGenesisState() GenesisState
	if string(genesis) != "{\"BlzValues\":null}" {
		t.Error("Unexpected DefaultGenesis")
	}
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
	if err != nil {
		t.Errorf("ValidateGenesis returned err - %s:%s", err, err.Error())
	}
}

// TODO func TestAppModuleBasic_RegisterRESTRoutes(t *testing.T)

func TestAppModuleBasic_GetQueryCmd(t *testing.T) {
	cdc := codec.Codec{}
	command := AppModuleBasic{}.GetQueryCmd(&cdc)

	if command == nil {
		t.Error("GetQueryCmd function returned nil")
	} else {
		if command.Use != "crud" {
			t.Errorf("command.Use has value of [%s],  expected was [crud]", types.ModuleName)
		}
		if command.Short != "Querying commands for the crud module" {
			t.Errorf("command.Use has value of [%s],  expected was [%s]", command.Use, types.ModuleName)
		}
		if !command.DisableFlagParsing {
			t.Error("command.DisableFlagParsing must be set to true")
		}
		if command.SuggestionsMinimumDistance != 2 {
			t.Errorf("command.SuggestionsMinimumDistance is [%d] expected value is 2", command.SuggestionsMinimumDistance)
		}

		sf1 := reflect.ValueOf(command.RunE)
		sf2 := reflect.ValueOf(client.ValidateCmd)
		if sf1 != sf2 {
			t.Error("command.RunE must be set client.ValidateCmd")
		}
	}
}

func TestAppModuleBasic_GetQueryCmd_CrudQueries(t *testing.T) {
	cdc := codec.Codec{}
	command := AppModuleBasic{}.GetQueryCmd(&cdc)

	commands := command.Commands()
	if 3 != len(command.Commands()) {
		t.Errorf("Number of Queries is [%d] - expected 3", len(commands))
	}

	expectedUses := [...]string{"has [UUID] [key]", "keys [UUID]", "read [UUID] [key]"}
	expectedNames := [...]string{"has", "keys", "read"}

	for i := 0; i < 3; i++ {
		expectedUse := expectedUses[i]
		expectedName := expectedNames[i]
		cmd := commands[i]
		if expectedUse != cmd.Use {
			t.Errorf("Actual Use() returned [%s] but expected is [%s]", cmd.Use, expectedUse)
		}

		if expectedName != cmd.Name() {
			t.Errorf("Actual Name() returned [%s] but expected is [%s]", cmd.Name(), expectedName)
		}
	}
}

func TestAppModuleBasic_GetTxCmd(t *testing.T) {
	cdc := codec.Codec{}
	sut := AppModuleBasic{}
	cmd := sut.GetTxCmd(&cdc)

	if nil == cmd {
		t.Error("GetTxCmd method returned nil")
	} else {
		if "crud" != cmd.Use {
			t.Errorf("GetTxCmd().Use is set to [%s], expected [crud]", cmd.Use)
		}

		if "func(*cobra.Command, []string) error" != reflect.TypeOf(client.ValidateCmd).String() {
			t.Error("client.ValidateCmd was not the expected method type")
		}

		if 2 != cmd.SuggestionsMinimumDistance {
			t.Errorf("GetTxCmd().SuggestionsMinimumDistance is set to [%d], expected [2]", cmd.SuggestionsMinimumDistance)
		}

		commands := cmd.Commands()
		if 6 != len(commands) {
			t.Errorf("GetTxCmd() reports [%d], expected [6]", len(commands))
		}
		// TODO: test crud commands -> create, read, update ...
	}
}

func TestNewAppModule(t *testing.T) {
	// TODO: this test needs fleshing out
	k := Keeper{}
	var bankkeeper bank.Keeper
	sut := NewAppModule(k, bankkeeper)

	if "crud" != sut.Route() {
		t.Errorf("AppModule Route() returned [%x] - expected [crud]", sut.Route())
	}
}

func TestAppModule_Name(t *testing.T) {
	k := Keeper{}
	var bankkeeper bank.Keeper
	sut := NewAppModule(k, bankkeeper)

	if "crud" != sut.Name() {
		t.Errorf("AppModule Name method returns [%s] but expected is [crud]", sut.Name())
	}
}

// TODO func TestAppModule_RegisterInvariants(t *testing.T)

func TestAppModule_Route(t *testing.T) {
	sut := AppModule{}
	if "crud" != sut.Route() {
		t.Errorf("AppModule.Rout() returned [%s] but expected is [crud]", sut.Route())
	}
}

// TODO: func TestAppModule_NewHandler(t *testing.T) is a wrapper, implement this test in handler_test.go

func TestAppModule_QuerierRoute(t *testing.T) {
	sut := AppModule{}
	if "crud" != sut.QuerierRoute() {
		t.Errorf("AppModule method QuerierRoute() returned [%s], expected crud", sut.QuerierRoute())
	}
}

func TestAppModule_NewQuerierHandler(t *testing.T) {
	sut := AppModule{}
	querier := sut.NewQuerierHandler()

	if "func(types.Context, []string, types.RequestQuery) ([]uint8, types.Error)" != reflect.TypeOf(querier).String() {
		t.Error("NewQuerierHandler didn't return the expected function")
	}

	// TODO: test the existence of a query?
}

// TODO AppModule BeginBlock method is empty

// TODO AppModule EndBlock calls an abci method ValidatorUpdate, currently unsure of what to test in this case

// TODO TestAppModule_InitGenesis(t *testing.T) Need to figure out how to mock objects in Cosmos-sdk

// TODO func TestAppModule_ExportGenesis(t *testing.T) Need to figure out how to mock objects in Cosmos-sdk
