import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";


describe('owner()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
    });

    it('should retrieve the owner of a key', async () => {
        await bz.create('myKey', 'myvalue', defaultGasParams());
        expect(await bz.owner('myKey')).to.equal(bz.address);
    });

    it('should throw an error if key does not exist', async () => {
        await expect(bz.owner('noKey')).to.be.rejectedWith(Error, /key not found/);
    });

});


