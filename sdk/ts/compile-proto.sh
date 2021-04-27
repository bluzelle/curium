#mkdir -p proto/google/api
#mkdir -p proto/google/protobuf
#curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto > proto/google/api/annotations.proto
#curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto > proto/google/api/http.proto
#
#mkdir -p proto/cosmos/base/query/v1beta1
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/query/v1beta1/pagination.proto > proto/cosmos/base/query/v1beta1/pagination.proto
#
#mkdir -p proto/cosmos/base/v1beta1
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/v1beta1/coin.proto > proto/cosmos/base/v1beta1/coin.proto
#
#mkdir -p proto/cosmos/bank/v1beta1
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/bank/v1beta1/query.proto > proto/cosmos/bank/v1beta1/query.proto
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/bank/v1beta1/bank.proto > proto/cosmos/bank/v1beta1/bank.proto
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/bank/v1beta1/tx.proto > proto/cosmos/bank/v1beta1/tx.proto
#
#mkdir -p proto/cosmos/staking/v1beta1
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/staking/v1beta1/staking.proto > proto/cosmos/staking/v1beta1/staking.proto
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/staking/v1beta1/query.proto > proto/cosmos/staking/v1beta1/query.proto
#curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/staking/v1beta1/tx.proto > proto/cosmos/staking/v1beta1/tx.proto
#
#mkdir -p proto/tendermint/types
#curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/types/types.proto > proto/tendermint/types/types.proto
#curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/types/validator.proto > proto/tendermint/types/validator.proto
#
#mkdir -p proto/tendermint/crypto
#curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/crypto/proof.proto > proto/tendermint/crypto/proof.proto
#curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/crypto/keys.proto > proto/tendermint/crypto/keys.proto
#
#mkdir -p proto/tendermint/version
#curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/version/types.proto > proto/tendermint/version/types.proto
#
#mkdir -p proto/gogoproto
#curl https://raw.githubusercontent.com/gogo/protobuf/master/gogoproto/gogo.proto > proto/gogoproto/gogo.proto
#
#mkdir -p proto/cosmos_proto
#curl https://raw.githubusercontent.com/regen-network/cosmos-proto/master/cosmos.proto > proto/cosmos_proto/cosmos.proto
#
## Needed to modify the gogoproto file for the Cosmos modules
#sed -i '' '/google.protobuf.FieldOptions/a \
#optional string castrepeated = 65000;' proto/gogoproto/gogo.proto
#



PROTO_DEST=./src/codec

rm -rf $PROTO_DEST
mkdir -p $PROTO_DEST


echo ______________________________________________________
echo $PROTO_FILES
echo -------------------------------------------------------

yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=${PROTO_DEST} \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    --proto_path="../../proto" \
    --proto_path="./proto" \
    "./proto/google/api/annotations.proto" \
            "./proto/google/api/http.proto" \
            "./proto/cosmos/base/query/v1beta1/pagination.proto" \
            "../../proto/crud/lease.proto" \
      "../../proto/crud/CrudValue.proto" \
  "../../proto/crud/tx.proto" \
  "../../proto/crud/query.proto" \
  "../../proto/nft/tx.proto" \
  "../../proto/nft/query.proto" \
  "./proto/gogoproto/gogo.proto" \
  "./proto/tendermint/types/types.proto" \
  "./proto/tendermint/types/validator.proto" \
  "./proto/tendermint/crypto/proof.proto" \
  "./proto/tendermint/crypto/keys.proto" \
  "./proto/tendermint/version/types.proto" \
  "./proto/cosmos_proto/cosmos.proto" \
  "./proto/cosmos/base/v1beta1/coin.proto" \
  "./proto/cosmos/bank/v1beta1/query.proto" \
  "./proto/cosmos/bank/v1beta1/bank.proto" \
  "./proto/cosmos/bank/v1beta1/tx.proto" \
  "./proto/cosmos/staking/v1beta1/staking.proto" \
  "./proto/cosmos/staking/v1beta1/query.proto" \
  "./proto/cosmos/staking/v1beta1/tx.proto" \


# TypeScript code generation
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${PROTO_DEST} \
    --proto_path="../../proto" \
    --proto_path="./proto" \
        "./proto/google/api/annotations.proto" \
        "./proto/google/api/http.proto" \
                    "./proto/cosmos/base/query/v1beta1/pagination.proto" \
                                "../../proto/crud/lease.proto" \
  "../../proto/crud/CrudValue.proto" \
  "../../proto/crud/tx.proto" \
  "../../proto/crud/query.proto" \
  "../../proto/nft/tx.proto" \
  "../../proto/nft/query.proto" \
  "./proto/gogoproto/gogo.proto" \
  "./proto/tendermint/types/types.proto" \
  "./proto/tendermint/types/validator.proto" \
  "./proto/tendermint/crypto/proof.proto" \
  "./proto/tendermint/crypto/keys.proto" \
  "./proto/tendermint/version/types.proto" \
  "./proto/cosmos_proto/cosmos.proto" \
  "./proto/cosmos/base/v1beta1/coin.proto" \
  "./proto/cosmos/bank/v1beta1/query.proto" \
  "./proto/cosmos/bank/v1beta1/bank.proto" \
  "./proto/cosmos/bank/v1beta1/tx.proto" \
  "./proto/cosmos/staking/v1beta1/staking.proto" \
  "./proto/cosmos/staking/v1beta1/query.proto" \
  "./proto/cosmos/staking/v1beta1/tx.proto" \


#protoc \
#  --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
#  --ts_proto_out="./src/codec" \
#  --proto_path="../../proto" \
#  --proto_path="./proto" \
#  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
#$PROTO_FILES
