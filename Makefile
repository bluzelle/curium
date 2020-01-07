PACKAGES=$(shell go list ./... | grep -v '/simulation')

VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
COMMIT := $(shell git log -1 --format='%H')

ldflags = -X github.com/bluzelle/curium/version.Name=bluzelle \
	-X github.com/bluzelle/curium/version.ServerName=blzd \
	-X github.com/bluzelle/curium/version.ClientName=blzcli \
	-X github.com/bluzelle/curium/version.Version=$(VERSION) \
	-X github.com/bluzelle/curium/version.Commit=$(COMMIT)

BUILD_FLAGS := -ldflags '$(ldflags)'

include Makefile.ledger
all: install

install: go.sum
		go install -mod=readonly $(BUILD_FLAGS) ./cmd/blzd
		go install -mod=readonly $(BUILD_FLAGS) ./cmd/blzcli

go.sum: go.mod
		@echo "--> Ensure dependencies have not been modified"
		GO111MODULE=on go mod verify

test:
	@go test -mod=readonly $(PACKAGES)