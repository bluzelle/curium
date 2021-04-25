import {expect} from 'chai'
import {getSdk} from "../../../helpers/client-helpers/sdk-helpers";
import {BluzelleSdk} from "../../../../src/bz-sdk/bz-sdk";
import {passThrough, passThroughAwait} from "promise-passthrough";
global.fetch = require('node-fetch')
import {memoize, times} from 'lodash'

describe("Store and retriving a NFT", () => {

    let sdk: BluzelleSdk
    beforeEach(() => getSdk().then(s => sdk = s));

    describe('CreateNft()', () => {
        it('should store a nft record', () => {
            return sdk.nft.tx.CreateNft({
                creator: sdk.nft.address,
                meta: 'my-meta',
                mime: 'image/xxx'
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
            return sdk.nft.tx.CreateNft({
                creator: sdk.nft.address,
                meta: 'my-meta',
                mime: 'my-mime'
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

    describe('Chunk()', () => {
        it('should store nft chunks', () => {
            return sdk.nft.tx.CreateNft({
                creator: sdk.nft.address,
                meta: 'my-meta',
                mime: 'my/mime'
            })
                .then(passThroughAwait(({id}) =>
                    Promise.all([
                        sdk.nft.tx.Chunk({id: id, chunk: 0, data: new TextEncoder().encode('chunk0'), creator: sdk.nft.address}),
                        sdk.nft.tx.Chunk({id: id, chunk: 1, data: new TextEncoder().encode('chunk1'), creator: sdk.nft.address}),
                        sdk.nft.tx.Chunk({id: id, chunk: 2, data: new TextEncoder().encode('chunk2'), creator: sdk.nft.address}),
                    ])
                ))
                .then(({id}) =>
                    fetch(`http://localhost:1317/nft/data/${id}`)
                )
                .then(passThrough(x =>
                    expect(x.headers.get('content-type')).to.equal('my/mime')
                ))
                .then(x => x.text())
                .then(x => {
                    expect(x).to.equal('chunk0chunk1chunk2')
                })
        });
    });

    describe('High load', () => {
        it('should be able to store 100mb', () => {
            return sdk.nft.tx.CreateNft({
                creator: sdk.nft.address,
                meta: 'my-meta',
                mime: 'my/mime'
            })
                .then(passThroughAwait(({id}) =>
                    Promise.all(times(100).map((chunk) =>
                        sdk.nft.tx.Chunk({
                            creator: sdk.nft.address,
                            id,
                            chunk,
                            data: getMbPayload()
                        })
                    )))
                )
                .then(({id}) => fetchData(id))
                .then(x => x);
        })
    })
});

const getMbPayload = memoize<() => Uint8Array>(() =>
    times(1000 * 100).reduce((arr, n, idx) => {
        arr.set([n % 256], idx)
        return arr
    }, new Uint8Array(1000 * 100))
);

const fetchData = (id: number) =>
    fetch(`http://localhost:1317/nft/data/${id}`)
        .then(x => x.arrayBuffer().then(buf => ({x, buf})))
        .then(resp => ({
            body: resp.buf,
            contentType: resp.x.headers.get('content-type')
        }))
