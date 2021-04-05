// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package contract

import (
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// TestingRecord is an auto generated low-level Go binding around an user-defined struct.
type TestingRecord struct {
	Key   string
	Value string
	Opt   string
}

// TestingABI is the input ABI used to generate the binding from.
const TestingABI = "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"getAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getBool\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getString\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSynchronizerData\",\"outputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"opt\",\"type\":\"string\"}],\"internalType\":\"structTesting.Record[]\",\"name\":\"\",\"type\":\"tuple[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getUint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]"

// TestingFuncSigs maps the 4-byte function signature to its string representation.
var TestingFuncSigs = map[string]string{
	"38cc4831": "getAddress()",
	"12a7b914": "getBool()",
	"89ea642f": "getString()",
	"4b862657": "getSynchronizerData()",
	"000267a4": "getUint()",
	"8da5cb5b": "owner()",
}

// TestingBin is the compiled bytecode used for deploying new contracts.
var TestingBin = "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331781556040805160a08101825260036060820181815262666f6f60e81b6080840152825282518084018452908152623130b960e91b6020828101919091528083019190915282518084018452600681526563726561746560d01b818301529282019290925291805260018152815180517fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb49926100c09284929101906102b2565b5060208281015180516100d992600185019201906102b2565b50604082015180516100f59160028401916020909101906102b2565b50506040805160a08101825260036060820181815262666f6f60e81b60808401528252825180840184529081526218985d60ea1b6020828101919091528083019190915282518084018452600681526575706461746560d01b8183015292820192909252600160008190528252805180519193507fcc69885fda6bcc1a4ace058b4a62bf5e179ea78fd58a1ccd71c22cc9b688792f9261019a928492909101906102b2565b5060208281015180516101b392600185019201906102b2565b50604082015180516101cf9160028401916020909101906102b2565b50506040805160a08101825260036060820181815262666f6f60e81b60808401528252825180840184529081526218985d60ea1b6020828101919091528083019190915282518084018452600681526564656c65746560d01b8183015292820192909252600260005260018252805180519193507fd9d16d34ffb15ba3a3d852f0d403e2ce1d691fb54de27ac87cd2f993f3ec330f92610274928492909101906102b2565b50602082810151805161028d92600185019201906102b2565b50604082015180516102a99160028401916020909101906102b2565b50905050610386565b8280546102be9061034b565b90600052602060002090601f0160209004810192826102e05760008555610326565b82601f106102f957805160ff1916838001178555610326565b82800160010185558215610326579182015b8281111561032657825182559160200191906001019061030b565b50610332929150610336565b5090565b5b808211156103325760008155600101610337565b600181811c9082168061035f57607f821691505b6020821081141561038057634e487b7160e01b600052602260045260246000fd5b50919050565b610515806103956000396000f3fe608060405234801561001057600080fd5b50600436106100615760003560e01c80620267a41461006657806312a7b9141461007b57806338cc48311461008a5780634b862657146100af57806389ea642f146100c45780638da5cb5b146100f2575b600080fd5b60405161303981526020015b60405180910390f35b60405160018152602001610072565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610072565b6100b7610105565b60405161007291906103c3565b604080518082018252600c81526b68656c6c6f20776f726c642160a01b602082015290516100729190610463565b600054610097906001600160a01b031681565b6040805160038082526080820190925260609160009190816020015b61014560405180606001604052806060815260200160608152602001606081525090565b81526020019060019003908161012157905050905060005b6003811015610372576000818152600160205260409081902081516060810190925280548290829061018e9061047d565b80601f01602080910402602001604051908101604052809291908181526020018280546101ba9061047d565b80156102075780601f106101dc57610100808354040283529160200191610207565b820191906000526020600020905b8154815290600101906020018083116101ea57829003601f168201915b505050505081526020016001820180546102209061047d565b80601f016020809104026020016040519081016040528092919081815260200182805461024c9061047d565b80156102995780601f1061026e57610100808354040283529160200191610299565b820191906000526020600020905b81548152906001019060200180831161027c57829003601f168201915b505050505081526020016002820180546102b29061047d565b80601f01602080910402602001604051908101604052809291908181526020018280546102de9061047d565b801561032b5780601f106103005761010080835404028352916020019161032b565b820191906000526020600020905b81548152906001019060200180831161030e57829003601f168201915b50505050508152505082828151811061035457634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061036a906104b8565b91505061015d565b50905090565b60008151808452815b8181101561039d57602081850181015186830182015201610381565b818111156103ae5782602083870101525b50601f01601f19169290920160200192915050565b60006020808301818452808551808352604092508286019150828160051b870101848801865b8381101561045557603f1989840301855281516060815181865261040f82870182610378565b915050888201518582038a8701526104278282610378565b915050878201519150848103888601526104418183610378565b9689019694505050908601906001016103e9565b509098975050505050505050565b6000602082526104766020830184610378565b9392505050565b600181811c9082168061049157607f821691505b602082108114156104b257634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156104d857634e487b7160e01b81526011600452602481fd5b506001019056fea26469706673582212204782674e89d6519f0b95d7b483c7c4dea57ba3be14ddfeb1af513492c8f2a55164736f6c63430008030033"

// DeployTesting deploys a new Ethereum contract, binding an instance of Testing to it.
func DeployTesting(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *Testing, error) {
	parsed, err := abi.JSON(strings.NewReader(TestingABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}

	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(TestingBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Testing{TestingCaller: TestingCaller{contract: contract}, TestingTransactor: TestingTransactor{contract: contract}, TestingFilterer: TestingFilterer{contract: contract}}, nil
}

// Testing is an auto generated Go binding around an Ethereum contract.
type Testing struct {
	TestingCaller     // Read-only binding to the contract
	TestingTransactor // Write-only binding to the contract
	TestingFilterer   // Log filterer for contract events
}

// TestingCaller is an auto generated read-only Go binding around an Ethereum contract.
type TestingCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TestingTransactor is an auto generated write-only Go binding around an Ethereum contract.
type TestingTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TestingFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type TestingFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TestingSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type TestingSession struct {
	Contract     *Testing          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// TestingCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type TestingCallerSession struct {
	Contract *TestingCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// TestingTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type TestingTransactorSession struct {
	Contract     *TestingTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// TestingRaw is an auto generated low-level Go binding around an Ethereum contract.
type TestingRaw struct {
	Contract *Testing // Generic contract binding to access the raw methods on
}

// TestingCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type TestingCallerRaw struct {
	Contract *TestingCaller // Generic read-only contract binding to access the raw methods on
}

// TestingTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type TestingTransactorRaw struct {
	Contract *TestingTransactor // Generic write-only contract binding to access the raw methods on
}

// NewTesting creates a new instance of Testing, bound to a specific deployed contract.
func NewTesting(address common.Address, backend bind.ContractBackend) (*Testing, error) {
	contract, err := bindTesting(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Testing{TestingCaller: TestingCaller{contract: contract}, TestingTransactor: TestingTransactor{contract: contract}, TestingFilterer: TestingFilterer{contract: contract}}, nil
}

// NewTestingCaller creates a new read-only instance of Testing, bound to a specific deployed contract.
func NewTestingCaller(address common.Address, caller bind.ContractCaller) (*TestingCaller, error) {
	contract, err := bindTesting(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &TestingCaller{contract: contract}, nil
}

// NewTestingTransactor creates a new write-only instance of Testing, bound to a specific deployed contract.
func NewTestingTransactor(address common.Address, transactor bind.ContractTransactor) (*TestingTransactor, error) {
	contract, err := bindTesting(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &TestingTransactor{contract: contract}, nil
}

// NewTestingFilterer creates a new log filterer instance of Testing, bound to a specific deployed contract.
func NewTestingFilterer(address common.Address, filterer bind.ContractFilterer) (*TestingFilterer, error) {
	contract, err := bindTesting(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &TestingFilterer{contract: contract}, nil
}

// bindTesting binds a generic wrapper to an already deployed contract.
func bindTesting(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(TestingABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Testing *TestingRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Testing.Contract.TestingCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Testing *TestingRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Testing.Contract.TestingTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Testing *TestingRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Testing.Contract.TestingTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Testing *TestingCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Testing.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Testing *TestingTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Testing.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Testing *TestingTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Testing.Contract.contract.Transact(opts, method, params...)
}

// GetAddress is a free data retrieval call binding the contract method 0x38cc4831.
//
// Solidity: function getAddress() view returns(address)
func (_Testing *TestingCaller) GetAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Testing.contract.Call(opts, &out, "getAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetAddress is a free data retrieval call binding the contract method 0x38cc4831.
//
// Solidity: function getAddress() view returns(address)
func (_Testing *TestingSession) GetAddress() (common.Address, error) {
	return _Testing.Contract.GetAddress(&_Testing.CallOpts)
}

// GetAddress is a free data retrieval call binding the contract method 0x38cc4831.
//
// Solidity: function getAddress() view returns(address)
func (_Testing *TestingCallerSession) GetAddress() (common.Address, error) {
	return _Testing.Contract.GetAddress(&_Testing.CallOpts)
}

// GetBool is a free data retrieval call binding the contract method 0x12a7b914.
//
// Solidity: function getBool() view returns(bool)
func (_Testing *TestingCaller) GetBool(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _Testing.contract.Call(opts, &out, "getBool")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// GetBool is a free data retrieval call binding the contract method 0x12a7b914.
//
// Solidity: function getBool() view returns(bool)
func (_Testing *TestingSession) GetBool() (bool, error) {
	return _Testing.Contract.GetBool(&_Testing.CallOpts)
}

// GetBool is a free data retrieval call binding the contract method 0x12a7b914.
//
// Solidity: function getBool() view returns(bool)
func (_Testing *TestingCallerSession) GetBool() (bool, error) {
	return _Testing.Contract.GetBool(&_Testing.CallOpts)
}

// GetString is a free data retrieval call binding the contract method 0x89ea642f.
//
// Solidity: function getString() view returns(string)
func (_Testing *TestingCaller) GetString(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _Testing.contract.Call(opts, &out, "getString")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetString is a free data retrieval call binding the contract method 0x89ea642f.
//
// Solidity: function getString() view returns(string)
func (_Testing *TestingSession) GetString() (string, error) {
	return _Testing.Contract.GetString(&_Testing.CallOpts)
}

// GetString is a free data retrieval call binding the contract method 0x89ea642f.
//
// Solidity: function getString() view returns(string)
func (_Testing *TestingCallerSession) GetString() (string, error) {
	return _Testing.Contract.GetString(&_Testing.CallOpts)
}

// GetSynchronizerData is a free data retrieval call binding the contract method 0x4b862657.
//
// Solidity: function getSynchronizerData() view returns((string,string,string)[])
func (_Testing *TestingCaller) GetSynchronizerData(opts *bind.CallOpts) ([]TestingRecord, error) {
	var out []interface{}
	err := _Testing.contract.Call(opts, &out, "getSynchronizerData")

	if err != nil {
		return *new([]TestingRecord), err
	}

	out0 := *abi.ConvertType(out[0], new([]TestingRecord)).(*[]TestingRecord)

	return out0, err

}

// GetSynchronizerData is a free data retrieval call binding the contract method 0x4b862657.
//
// Solidity: function getSynchronizerData() view returns((string,string,string)[])
func (_Testing *TestingSession) GetSynchronizerData() ([]TestingRecord, error) {
	return _Testing.Contract.GetSynchronizerData(&_Testing.CallOpts)
}

// GetSynchronizerData is a free data retrieval call binding the contract method 0x4b862657.
//
// Solidity: function getSynchronizerData() view returns((string,string,string)[])
func (_Testing *TestingCallerSession) GetSynchronizerData() ([]TestingRecord, error) {
	return _Testing.Contract.GetSynchronizerData(&_Testing.CallOpts)
}

// GetUint is a free data retrieval call binding the contract method 0x000267a4.
//
// Solidity: function getUint() view returns(uint256)
func (_Testing *TestingCaller) GetUint(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Testing.contract.Call(opts, &out, "getUint")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetUint is a free data retrieval call binding the contract method 0x000267a4.
//
// Solidity: function getUint() view returns(uint256)
func (_Testing *TestingSession) GetUint() (*big.Int, error) {
	return _Testing.Contract.GetUint(&_Testing.CallOpts)
}

// GetUint is a free data retrieval call binding the contract method 0x000267a4.
//
// Solidity: function getUint() view returns(uint256)
func (_Testing *TestingCallerSession) GetUint() (*big.Int, error) {
	return _Testing.Contract.GetUint(&_Testing.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Testing *TestingCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Testing.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Testing *TestingSession) Owner() (common.Address, error) {
	return _Testing.Contract.Owner(&_Testing.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Testing *TestingCallerSession) Owner() (common.Address, error) {
	return _Testing.Contract.Owner(&_Testing.CallOpts)
}
