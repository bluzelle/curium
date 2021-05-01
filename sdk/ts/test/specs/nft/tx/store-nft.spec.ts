import {expect} from 'chai'
import {getSdk} from "../../../helpers/client-helpers/sdk-helpers";
import {BluzelleSdk} from "../../../../src/bz-sdk/bz-sdk";
import {passThroughAwait} from "promise-passthrough";

global.fetch = require('node-fetch')
import {memoize, times} from 'lodash'
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
            }, getLargePayload(100))
                .then(({id}) => fetchData(id))
                .then(({body}) => expect(body).to.deep.equal(getLargePayload(100)))
        });

        it('should store parallel files', () => {
            const files = times(10).map(size => getLargePayload(size * 10 + 1));
            return Promise.all(files.map(file =>
                sdk.helpers.nft.uploadNft({
                    meta: '',
                    mime: 'my/file'
                }, file)
                    .then(({id}) => fetchData(id))
                    .then(({body}) => expect(body).to.deep.equal(file))
            ))
        })
    });

});

const getLargePayload = memoize<(length: number) => Uint8Array>((length) => {
    return new Uint8Array(length * 1024 * 1024).map((v, idx) => idx % 256)
});

const fetchData = (id: string) =>
    fetch(`http://localhost:1317/nft/data/${id}`)
        .then(x => x.arrayBuffer().then(buf => ({x, buf})))
        .then(resp => ({
            body: new Uint8Array(resp.buf),
            contentType: resp.x.headers.get('content-type')
        }))
