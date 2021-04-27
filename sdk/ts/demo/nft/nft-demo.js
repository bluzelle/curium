"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bz_sdk_1 = require("../../src/bz-sdk/bz-sdk");
const promises_1 = require("fs/promises");
bz_sdk_1.bluzelle({
    mnemonic: "foam card blouse leaf convince scrub marble pencil camp hover food install waste aunt minute alarm gauge cabin garbage over kitten jealous draft miracle",
    url: "http://localhost:26657",
    gasPrice: 0.002,
    maxGas: 100000000
})
    .then(bz => promises_1.readFile("./test.tiff")
    .then(data => bz.helpers.nft.uploadNft({
    mime: 'image/tiff',
    meta: ''
}, data, (chunk, size) => console.log(chunk, size)))
    .then(({ id }) => console.log('tiff id:', id))
    .then(() => promises_1.readFile('/Users/scott/Desktop/temp.mp4'))
    .then(data => bz.helpers.nft.uploadNft({
    mime: 'video/mp4',
    meta: ''
}, data, (chunk, size) => console.log(chunk, size)))
    .then(({ id }) => console.log('video id:', id)));
//# sourceMappingURL=nft-demo.js.map