import {DEFAULT_TIMEOUT, defaultLease, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from 'chai'

describe('sdk.q.Read()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
    });
    it('should read a value from the db', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: 'uuid3',
            key: 'key3',
            value: new TextEncoder().encode('value1'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        expect(await sdk.db.q.Read({
            uuid: 'uuid3',
            key: 'key3'
        }).then(resp => new TextDecoder().decode(resp.value))).to.equal('value1')
    })
});