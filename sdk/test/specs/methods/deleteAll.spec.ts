import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {
    createKeys,
    DEFAULT_TIMEOUT,
    defaultGasParams,
    newBzClient,
    sentryWithClient
} from "../../helpers/client-helpers/client-helpers";


describe('deleteAll()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should do nothing if there are no keys', async () => {
        await bz.deleteAll(defaultGasParams());
    });

    it('should delete all keys', async () => {
        await createKeys(bz, 5);
        expect(await bz.count()).to.equal(5);
        await bz.deleteAll(defaultGasParams());
        expect(await bz.count()).to.equal(0);
    });

    it('should delete all keys that you own and only keys that you own', async () => {
        const bz2 = await newBzClient(bz);
        await bz.withTransaction(() => {
            bz.create('myKey1', 'myValue', defaultGasParams());
            bz.create('myKey2', 'myValue', defaultGasParams());
            bz.create('myKey3', 'myValue', defaultGasParams());
            bz.create('myKey4', 'myValue', defaultGasParams());
            bz2.create('notMyKey', 'notMyValue', defaultGasParams());
        });
        await bz.deleteAll(defaultGasParams());
        expect(await bz.keys()).to.deep.equal(['notMyKey']);
    });
});



