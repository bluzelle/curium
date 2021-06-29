void async function () {
    await $`mkdir -p proto/google/api`
    await $`mkdir -p proto/google/protobuf`
        .then(() => $`curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto > proto/google/api/annotations.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto > proto/google/api/http.proto`)

    await $`mkdir -p proto/cosmos/base/query/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/query/v1beta1/pagination.proto > proto/cosmos/base/query/v1beta1/pagination.proto`)

    await $`mkdir -p proto/cosmos/base/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/v1beta1/coin.proto > proto/cosmos/base/v1beta1/coin.proto`)

    await $`mkdir -p proto/cosmos/bank/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/bank/v1beta1/query.proto > proto/cosmos/bank/v1beta1/query.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/bank/v1beta1/bank.proto > proto/cosmos/bank/v1beta1/bank.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/bank/v1beta1/tx.proto > proto/cosmos/bank/v1beta1/tx.proto`)

    await $`mkdir -p proto/cosmos/staking/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/staking/v1beta1/staking.proto > proto/cosmos/staking/v1beta1/staking.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/staking/v1beta1/query.proto > proto/cosmos/staking/v1beta1/query.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/staking/v1beta1/tx.proto > proto/cosmos/staking/v1beta1/tx.proto`)

    await $`mkdir -p proto/cosmos/distribution/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/distribution/v1beta1/distribution.proto > proto/cosmos/distribution/v1beta1/distribution.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/distribution/v1beta1/query.proto > proto/cosmos/distribution/v1beta1/query.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/distribution/v1beta1/tx.proto > proto/cosmos/distribution/v1beta1/tx.proto`)

    await $`mkdir -p proto/cosmos/tx/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/tx/v1beta1/tx.proto > proto/cosmos/tx/v1beta1/tx.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/tx/v1beta1/service.proto > proto/cosmos/tx/v1beta1/service.proto`)

    await $`mkdir -p proto/cosmos/tx/signing/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/tx/signing/v1beta1/signing.proto > proto/cosmos/tx/signing/v1beta1/signing.proto`)

    await $`mkdir -p proto/cosmos/crypto/multisig/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/crypto/multisig/v1beta1/multisig.proto > proto/cosmos/crypto/multisig/v1beta1/multisig.proto`)

    await $`mkdir -p proto/cosmos/base/abci/v1beta1`
        .then(() => $`curl https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/abci/v1beta1/abci.proto > proto/cosmos/base/abci/v1beta1/abci.proto`)

    await $`mkdir -p proto/tendermint/abci`
        .then(() => $`curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/abci/types.proto > proto/tendermint/abci/types.proto`)

    await $`mkdir -p proto/tendermint/types`
        .then(() => $`curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/types/types.proto > proto/tendermint/types/types.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/types/validator.proto > proto/tendermint/types/validator.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/types/params.proto > proto/tendermint/types/params.proto`)

    await $`mkdir -p proto/tendermint/crypto`
        .then(() => $`curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/crypto/proof.proto > proto/tendermint/crypto/proof.proto`)
        .then(() => $`curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/crypto/keys.proto > proto/tendermint/crypto/keys.proto`)

    await $`mkdir -p proto/tendermint/version`
        .then(() => $`curl https://raw.githubusercontent.com/tendermint/tendermint/master/proto/tendermint/version/types.proto > proto/tendermint/version/types.proto`)

    await $`mkdir -p proto/gogoproto`
        .then(() => $`curl https://raw.githubusercontent.com/gogo/protobuf/master/gogoproto/gogo.proto > proto/gogoproto/gogo.proto`)

    await $`mkdir -p proto/cosmos_proto`
        .then(() => $`curl https://raw.githubusercontent.com/regen-network/cosmos-proto/master/cosmos.proto > proto/cosmos_proto/cosmos.proto`)

    //Needed to modify the gogoproto file for the Cosmos modules
    await $`sed -i '' '/google.protobuf.FieldOptions/a \\ 
    optional string castrepeated = 65000;' proto/gogoproto/gogo.proto`


    await $`rm -rf src/codec`
    await $`mkdir -p src/codec`
    await $`protoc \
  --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="./src/codec" \
  --proto_path="../../proto" \
  --proto_path="./proto" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
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
  "./proto/cosmos/distribution/v1beta1/distribution.proto" \
  "./proto/cosmos/distribution/v1beta1/query.proto" \
  "./proto/cosmos/distribution/v1beta1/tx.proto" \
  "./proto/cosmos/tx/v1beta1/tx.proto" \
  "./proto/cosmos/tx/v1beta1/service.proto" \
  "./proto/cosmos/tx/signing/v1beta1/signing.proto" \
  "./proto/cosmos/crypto/multisig/v1beta1/multisig.proto" \
  "./proto/cosmos/base/abci/v1beta1/abci.proto" \
  "./proto/tendermint/abci/types.proto" \
  "./proto/tendermint/types/params.proto"`


}()