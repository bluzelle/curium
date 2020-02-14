#!/bin/sh

if [ "$NODE_NAME" = "swarm01" ]; then
  tar xvf ./blz-test.tar.xz
  blzd start &
  sleep 5s
  blzcli rest-server --laddr tcp://0.0.0.0:1317
else
  blzd init $NODE_NAME --chain-id bluzelle
  blzcli config chain-id bluzelle
  blzcli config output json
  blzcli config indent true
  blzcli config trust-node true
  tar -xf blz-test.tar.xz .blzd/config/genesis.json
  sed -i -e 's/minimum-gas-prices = ""/minimum-gas-prices = "0.01bnt"/g' .blzd/config/app.toml
  NODE_ID=$(cat .blzd/config/genesis.json | grep \"memo\" | awk -F'[@|:|\"]' '{print $5}')@${LOCAL_IP}:26656
  blzd start --p2p.persistent_peers ${NODE_ID}
fi
