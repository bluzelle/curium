import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node'
import {API} from '../../../src/legacyAdapter/API'
import {expect} from 'chai'
import delay from "delay";

describe('myKeys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return a list of only keys that I own', async () => {
        const otherBz = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            endpoint: bz.url,
            uuid: bz.uuid
        });

        await bz.transferTokensTo(otherBz.address, 1000, defaultGasParams())

        await bz.withTransaction(() => {
            bz.create('my1', 'value', defaultGasParams());
                bz.create('my2', 'value', defaultGasParams());
                otherBz.create('other', 'value', defaultGasParams());
        });

        expect(await bz.myKeys()).to.deep.equal(['my1', 'my2']);
        expect(await otherBz.myKeys()).to.deep.equal(['other']);
    });

    it('should not show keys that have been deleted', async () => {
        await bz.withTransaction(() => {
            bz.create('my1', 'value', defaultGasParams());
            bz.create('my2', 'value', defaultGasParams());
        });

        expect(await bz.myKeys()).to.deep.equal(['my1', 'my2']);
        await bz.delete('my1', defaultGasParams());
        expect(await bz.myKeys()).to.deep.equal(['my2'])
    });

    it('should not show a key after it expires', async () => {
        await bz.withTransaction(() => {
            bz.create('my1', 'value', defaultGasParams(), {seconds: 10});
            bz.create('my2', 'value', defaultGasParams());
        });

        expect(await bz.myKeys()).to.deep.equal(['my1', 'my2']);
        await delay(12000);
        expect(await bz.myKeys()).to.deep.equal(['my2']);
    });

    it('should not show keys after a deleteAll', async () => {
        const otherBz = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            endpoint: bz.url,
            uuid: bz.uuid
        });

        await bz.transferTokensTo(otherBz.address, 1000, defaultGasParams());


        await bz.withTransaction(() => {
            bz.create('my1', 'value', defaultGasParams());
            bz.create('my2', 'value', defaultGasParams());
            otherBz.create('other', 'value', defaultGasParams());
        });

        expect(await bz.myKeys()).to.deep.equal(['my1', 'my2']);
        await bz.deleteAll(defaultGasParams())
        expect(await bz.myKeys()).to.deep.equal([]);
        expect(await otherBz.myKeys()).to.deep.equal(['other']);
        await otherBz.deleteAll(defaultGasParams());
        expect(await otherBz.myKeys()).to.deep.equal([]);
    });

    it('should show the right keys if you rename a key', async () => {
        await bz.withTransaction(() => {
            bz.create('my1', 'value', defaultGasParams());
            bz.create('my2', 'value', defaultGasParams());
        });

        expect(await bz.myKeys()).to.deep.equal(['my1', 'my2']);

        await bz.rename('my1', 'myOne', defaultGasParams());
        expect(await bz.myKeys()).to.deep.equal(['my2', 'myOne']);
    })
})