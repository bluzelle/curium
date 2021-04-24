import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API';
import {expect} from 'chai'
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node'

describe('keys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return a empty list if there are no keys', async () => {
        expect(await bz.keys()).to.have.length(0);
    });

    it('should work with an empty value', async () => {
        await bz.withTransaction(() => {
            bz.create('key1', 'value1', defaultGasParams());
            bz.create('key2', '', defaultGasParams());
        })
        expect(await bz.keys()).to.deep.equal(['key1', 'key2']);
    })

    it('should return a list of keys', async () => {
        const {keys} = await createKeys(bz, 5);
        expect(await bz.keys()).to.deep.equal(keys);
    });

    it('should return all keys including ones that are not mine', async () => {
        const otherBz = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            endpoint: bz.url,
            uuid: bz.uuid
        });

        await bz.transferTokensTo(otherBz.address, 10, defaultGasParams())

        await bz.withTransaction(() => {
            bz.create('my1', 'value', defaultGasParams());
                bz.create('my2', 'value', defaultGasParams());
                otherBz.create('other', 'value', defaultGasParams());
        });

        expect(await bz.keys()).to.deep.equal(['my1', 'my2', 'other']);

    })
});
