import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from "../../../src/legacyAdapter/API";
import {expect} from 'chai'
import delay from "delay";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('txGetLease', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
    });

    it('should throw exception if key does not exist', async () => {
        let err;
        await bz.txGetLease('fake', defaultGasParams())
            .catch(e => err = e.error);
        expect(err).to.match(/Key does not exist/);
    })

    it('should return the lease time left', async () => {
        await bz.create('myKey', 'myValue', defaultGasParams(), {seconds: 30});
        await delay(20000);
        expect((await bz.txGetLease('myKey', defaultGasParams())).lease).to.be.lessThan(12);
    })

});