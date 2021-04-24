mkdir -p proto/google/api
mkdir -p proto/google/protobuf
curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto > proto/google/api/annotations.proto
curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto > proto/google/api/http.proto
mkdir -p proto/cosmos/base/query/v1beta1
curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/query/v1beta1/pagination.proto > proto/cosmos/base/query/v1beta1/pagination.proto

rm -rf src/codec
mkdir -p src/codec
protoc \
  --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="./src/codec" \
  --proto_path="../../proto" \
  --proto_path="./proto" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "../../proto/crud/CrudValue.proto" \
  "../../proto/crud/tx.proto" \
  "../../proto/crud/query.proto" \
  "../../proto/nft/tx.proto" \
  "../../proto/nft/query.proto"

