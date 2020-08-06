PACKAGES=$(shell go list ./... | grep -v '/simulation')

VERSION := $(shell echo $(shell git describe --tags --dirty) | sed 's/^v//')
COMMIT := $(shell git log -1 --format='%H')
COSMOS_SDK := $(shell grep -i cosmos-sdk go.mod | awk '{print $$2}')

include Makefile.ledger

build_tags += $(BUILD_TAGS)
build_tags := $(strip $(build_tags))

whitespace :=
whitespace += $(whitespace)
comma := ,
build_tags_comma_sep := $(patsubst $(whitespace),$(comma),$(build_tags))
coverage := $(shell mktemp -u).coverage.out

# process linker flags
LDFLAGS = -X github.com/cosmos/cosmos-sdk/version.Name=BluzelleService \
	-X github.com/cosmos/cosmos-sdk/version.ServerName=blzd \
	-X github.com/cosmos/cosmos-sdk/version.ClientName=blzcli \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT)

LDFLAGS_FAUCET    = -X "github.com/cosmos/cosmos-sdk/version.BuildTags=$(build_tags_comma_sep),faucet,cosmos-sdk $(COSMOS_SDK)"
LDFLAGS_NO_FAUCET = -X "github.com/cosmos/cosmos-sdk/version.BuildTags=$(build_tags_comma_sep),cosmos-sdk $(COSMOS_SDK)"

BUILD_FLAGS := -tags "$(build_tags)"
FAUCET_BUILD_FLAGS := -tags "$(build_tags),faucet"

all:
		go build $(BUILD_FLAGS) -ldflags '$(LDFLAGS) $(LDFLAGS_NO_FAUCET)' ./cmd/blzd
		go build $(BUILD_FLAGS) -ldflags '$(LDFLAGS) $(LDFLAGS_NO_FAUCET)' ./cmd/blzcli

clean:
		@rm -f blzd blzcli

mainnet: go.sum
		go install -mod=readonly $(BUILD_FLAGS) -ldflags '$(LDFLAGS) $(LDFLAGS_NO_FAUCET)' ./cmd/blzd
		go install -mod=readonly $(BUILD_FLAGS) -ldflags '$(LDFLAGS) $(LDFLAGS_NO_FAUCET)' ./cmd/blzcli

testnet:
		# only testnet has the faucet enabled... 
		go install -mod=readonly $(FAUCET_BUILD_FLAGS) -ldflags '$(LDFLAGS) $(LDFLAGS_FAUCET)' ./cmd/blzd
		go install -mod=readonly $(FAUCET_BUILD_FLAGS) -ldflags '$(LDFLAGS) $(LDFLAGS_FAUCET)' ./cmd/blzcli

go.sum: go.mod
		@echo "--> Ensure dependencies have not been modified"
		GO111MODULE=on go mod verify

test:
	@go test -mod=readonly $(PACKAGES)

coverage:
	@go test -v -coverprofile=$(coverage) ./x/...
	@go tool cover -html=$(coverage)
	@rm $(coverage)
