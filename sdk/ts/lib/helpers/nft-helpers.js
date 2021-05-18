"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftHelpers = void 0;
const promise_passthrough_1 = require("promise-passthrough");
const crypto_1 = require("crypto");
const delay_1 = __importDefault(require("delay"));
// @ts-ignore
const node_fetch_1 = __importDefault(require("node-fetch"));
const nftHelpers = (sdk) => ({
    uploadNft: uploadNft(sdk)
});
exports.nftHelpers = nftHelpers;
const uploadNft = (nft) => (params, data) => {
    const hash = crypto_1.createHash("sha256")
        .update(data)
        .digest("hex");
    return node_fetch_1.default(`${nft.url.replace('26657', '1317')}/nft/upload/${hash}`, {
        method: 'POST',
        body: data,
    })
        .then(() => nft.tx.CreateNft({
        id: hash,
        creator: nft.address,
        host: nft.url,
        ...params
    }))
        .then(promise_passthrough_1.passThroughAwait(waitForFullReplication(nft)))
        .then(promise_passthrough_1.passThroughAwait(({ id }) => nft.tx.PublishFile({ id: id, creator: nft.address })));
};
const waitForFullReplication = (nft) => ({ id }) => nft.q.IsNftFullyReplicated({ id })
    .then(response => response.isReplicated ? (true) : (delay_1.default(500)
    .then(() => waitForFullReplication(nft)({ id }))));
//# sourceMappingURL=nft-helpers.js.map