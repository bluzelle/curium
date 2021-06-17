"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftHelpers = void 0;
const promise_passthrough_1 = require("promise-passthrough");
const lodash_1 = require("lodash");
const js_sha256_1 = require("js-sha256");
typeof window === undefined && (global.fetch = require('node-fetch'));
const splitDataIntoChunks = (data, chunkSize = 500 * 1024) => Promise.all(lodash_1.times(Math.ceil(data.byteLength / chunkSize)).map(chunkNum => new Promise(resolve => setTimeout(() => resolve(data.slice(chunkSize * chunkNum, chunkSize * chunkNum + chunkSize))))));
const uploadNft = (url, data, cb) => splitDataIntoChunks(data)
    .then(chunks => ({ data, chunks }))
    .then(ctx => ({ ...ctx, hash: js_sha256_1.sha256(ctx.data) }))
    .then(promise_passthrough_1.passThroughAwait(ctx => Promise.all(ctx.chunks.map((chunk, chunkNum) => fetch(`${url}/nft/upload/${ctx.hash}/${chunkNum}`, {
    method: 'POST',
    body: chunk
})
    .then(promise_passthrough_1.passThrough(() => cb && cb(chunkNum, ctx.chunks.length)))))))
    .then(({ hash, mimeType }) => ({
    hash, mimeType
}));
exports.nftHelpers = {
    uploadNft: uploadNft
};
//# sourceMappingURL=nft-helpers.js.map