import {DEFAULT_TIMEOUT, sentryWithClient, defaultGasParams} from "../../helpers/client-helpers/client-helpers";
import {API} from "../../../src/legacyAdapter/API";
import {expect} from 'chai'
import delay from "delay";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('getLease', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
    });

    it('should throw exception if key does not exist', async () => {
        await expect(bz.getLease('myKey')).to.be.rejectedWith(/key not found/);
    })

    it('should return the lease time left', async () => {
        await bz.create('myKey', 'myValue', defaultGasParams(), {seconds: 30});
        await delay(20000);
        expect(await bz.getLease('myKey')).to.be.lessThan(20);
    })

});