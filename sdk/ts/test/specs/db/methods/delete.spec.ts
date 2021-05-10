import {expect} from 'chai'
import {API} from '../../../../src/legacyAdapter/API';
import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";


describe('delete()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;


    beforeEach(async function () {
        useChaiAsPromised();
        bz = await sentryWithClient();
    });

    // it('should resolve to chain information', async () => {
    //     await bz.create('myKey', 'someValue', defaultGasParams());
    //     const result = await bz.delete('myKey', defaultGasParams())
    //     expect(result.txhash).to.be.a('string');
    //     expect(result.height).to.be.a('number');
    // });

    it('should delete a key in the database', async () => {
        await bz.create('myKey', 'someValue', defaultGasParams());
        expect(await bz.read('myKey')).to.equal('someValue');
        await bz.delete('myKey', defaultGasParams());
        await expect(bz.read('myKey')).to.be.rejectedWith(Error, /key not found/);
    });

    it('should be able to delete an empty value', async () => {
        await bz.create('key', '', defaultGasParams());
        expect(await bz.has('key')).to.be.true;
        await bz.delete('key', defaultGasParams());
        expect(await bz.has('key')).to.be.false;
    })

    it('should throw an error if a key does not exist', async () => {
        expect(
            await bz.delete('noKey', defaultGasParams()).catch(e => e)
        ).to.match(/Key does not exist/);
    });

    it('should handle parallel deletes', async () => {
        const {keys} = await createKeys(bz, 5);
        await Promise.all(keys.map(key => bz.delete(key, defaultGasParams())));
        expect(await bz.keys()).to.have.length(0);
    })
});




