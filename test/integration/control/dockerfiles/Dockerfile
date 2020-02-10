FROM golang:alpine AS build-env
MAINTAINER support@bluzelle.com

# Set up dependencies
ENV PACKAGES make git bash gcc

# Set working directory for the build
WORKDIR /go/src/github.com/bluzelle/

# Build
RUN apk add --no-cache $PACKAGES

RUN git clone https://github.com/bluzelle/curium.git

WORKDIR /go/src/github.com/bluzelle/curium

RUN make install

# Final image
FROM alpine:edge

# Install ca-certificates
RUN apk add --update ca-certificates
WORKDIR /root

# Copy over binaries from the build-env
COPY --from=build-env /go/bin/blzd /usr/bin/blzd
COPY --from=build-env /go/bin/blzcli /usr/bin/blzcli

ENV DEFAULT_PASS=jackjack

ENTRYPOINT blzd init docker --chain-id integration \
           && blzcli config chain-id integration  \
           && blzcli config output json         \
           && blzcli config indent true         \
           && blzcli config trust-node true     \
           && echo $DEFAULT_PASS | blzcli keys add validator 2> keys-add-validator \
           && echo $DEFAULT_PASS | blzd add-genesis-account $(blzcli keys show validator -a) 10000000000bnt 2> add-genesis-account\
           && echo $DEFAULT_PASS | blzd gentx --name validator --amount 100000000bnt 2> gentx                       \
           && sed -i -e 's/minimum-gas-prices = ""/minimum-gas-prices = "0.01bnt"/g' .blzd/config/app.toml  \
           && sed -i -e 's/"bond_denom": "stake"/"bond_denom": "bnt"/g' .blzd/config/genesis.json           \
           && sed -i -e 's/127.0.0.1:26657/0.0.0.0:26657/g' .blzd/config/config.toml \
           && echo $DEFAULT_PASS | blzd collect-gentxs \
           && blzd start
