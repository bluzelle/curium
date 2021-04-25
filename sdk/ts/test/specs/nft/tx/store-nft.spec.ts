import {expect} from 'chai'
import {getSdk} from "../../../helpers/client-helpers/sdk-helpers";
import {BluzelleSdk} from "../../../../src/bz-sdk/bz-sdk";
import {passThroughAwait} from "promise-passthrough";
global.fetch = require('node-fetch')

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
                .then(x => x.text())
                .then(x => {
                    expect(x).to.equal('chunk0chunk1chunk2')
                })

        })
    })
});