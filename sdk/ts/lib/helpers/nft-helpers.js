"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftHelpers = void 0;
const promise_passthrough_1 = require("promise-passthrough");
const lodash_1 = require("lodash");
const nftHelpers = (sdk) => ({
    uploadNft: uploadNft(sdk)
});
exports.nftHelpers = nftHelpers;
const uploadNft = (nft) => (params, data, cb) => {
    return nft.tx.CreateNft({
        creator: nft.address,
        ...params
    })
        .then(promise_passthrough_1.passThroughAwait(({ id }) => Promise.all(lodash_1.chunk(data, 500000).map((chunk, idx) => {
        return nft.tx.Chunk({
            creator: nft.address,
            id,
            chunk: idx,
            data: new Uint8Array(chunk)
        })
            .then(() => cb && cb(idx, chunk.length));
    }))));
};
//# sourceMappingURL=nft-helpers.js.map