import {expect} from 'chai'
import {getSdk} from "../../../helpers/client-helpers/sdk-helpers";
import {BluzelleSdk} from "../../../../src/bz-sdk/bz-sdk";

describe("CreateNft()", () => {

    let sdk: BluzelleSdk
    beforeEach(() => getSdk().then(s => sdk = s));

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