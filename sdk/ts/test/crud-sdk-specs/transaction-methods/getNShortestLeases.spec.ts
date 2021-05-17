import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {getSdk} from "../../helpers/client-helpers/sdk-helpers";

describe('getNShortestLeases', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string
    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString();
        creator = sdk.db.address;
    });

    it('should return the first 2 shortest leases', async () => {
        await Promise.all([
            sdk.create('key1', 'value', defaultGasParams(), {days: 1}),
            sdk.create('key2', 'value', defaultGasParams(), {hours: 1}),
            sdk.create('key4', 'value', defaultGasParams(), {seconds: 30}),
            sdk.create('key3', 'value', defaultGasParams(), {minutes: 1})
        ]);
        const result = await sdk.getNShortestLeases(2);

        expect(result.find(({key}) => key === 'key3')?.lease).to.be.closeTo(60, 12);
        expect(result.find(({key}) => key === 'key4')?.lease).to.be.closeTo(30, 12);
    })
});