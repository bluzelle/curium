import {expect} from 'chai'
import {getSdk} from "../../../helpers/client-helpers/sdk-helpers";
import {BluzelleSdk} from "../../../../src/bz-sdk/bz-sdk";
import {passThrough, passThroughAwait} from "promise-passthrough";
global.fetch = require('node-fetch')
import {memoize, times, chunk} from 'lodash'
import {readFile} from "fs/promises";
import {createHash} from 'crypto'

describe("Store and retriving a NFT", () => {

    let sdk: BluzelleSdk
    beforeEach(() => getSdk().then(s => sdk = s));

    describe('CreateNft()', () => {
        it('should store a nft record', () => {
            const hash = createHash("sha256")
                .update("my-nft")
                .digest("hex");
            return sdk.nft.tx.CreateNft({
                creator: sdk.nft.address,
                meta: 'my-meta',
                mime: 'image/xxx',
                id: hash
            })
                .then(({id}) => sdk.nft.q.Nft({id}))
                .then(({Nft}) => {
                    expect(Nft?.creator).to.equal(sdk.nft.address);
                    expect(Nft?.meta).to.equal('my-meta');
                    expect(Nft?.mime).to.equal('image/xxx');
                });
        });
    });

    describe('UpdateNft()', () => {
        it('should update the nft data', () => {
            const hash = createHash("sha256")
                .update("my-nft")
                .digest("hex")



            return sdk.nft.tx.CreateNft({
                creator: sdk.nft.address,
                meta: 'my-meta',
                mime: 'my-mime',
                id: hash
            })
                .then(passThroughAwait(({id}) =>
                    sdk.nft.tx.UpdateNft({
                        id: id,
                        creator: sdk.nft.address,
                        meta: 'my-meta2',
                        mime: 'my-mime2'
                    })
                ))
                .then(({id}) =>
                    sdk.nft.q.Nft({id})
                )
                .then(({Nft}) => {
                    expect(Nft?.mime).to.equal('my-mime2')
                    expect(Nft?.meta).to.equal('my-meta2')
                })
        })
    })

    describe('Helpers', () => {
        it('should store a 100MB file', () => {
            return sdk.helpers.nft.uploadNft({
                    meta: '',
                    mime: 'image/tiff'
                }, getLargePayload())
                    .then(({id}) => fetchData(id))
                    .then(({body}) => expect(body).to.deep.equal(getLargePayload()))
        });
    });
});

const getLargePayload = memoize<() => Uint8Array>(() =>
    times(100 * 1024 * 1024).reduce((arr, n, idx) => {
        arr.set([n % 256], idx)
        return arr
    }, new Uint8Array(100 * 1024 * 1024))
);

const fetchData = (id: string) =>
    fetch(`http://localhost:1317/nft/data/${id}`)
        .then(x => x.arrayBuffer().then(buf => ({x, buf})))
        .then(resp => ({
            body: new Uint8Array(resp.buf),
            contentType: resp.x.headers.get('content-type')
        }))
