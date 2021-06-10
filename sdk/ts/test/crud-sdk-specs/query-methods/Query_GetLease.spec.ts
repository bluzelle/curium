import {DEFAULT_TIMEOUT} from "../../helpers/client-helpers/client-helpers";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {encodeData, getSdk, zeroLease} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from "chai";
import delay from "delay"

describe('q.GetLease()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string;
    beforeEach(async () => {
        sdk = await getSdk();
        useChaiAsPromised();
        uuid = Date.now().toString();
        creator = sdk.db.address
    });

    it('should throw exception if key does not exist', async () => {
        await expect(sdk.db.q.GetLease({
            uuid,
            key: 'nonExistentKey'
        })).to.be.rejectedWith(/key nonExistentKey doesn't exist/);
    })

    it('should return the lease time left', async () => {
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'myKey',
            value: encodeData('myValue'),
            lease: {...zeroLease, seconds: 30},
            metadata: new Uint8Array()
        });
        await delay(10000);
        expect(await sdk.db.q.GetLease({
            uuid,
            key: 'myKey'
        }).then(resp => resp.seconds)).to.be.lessThan(28);
    })

    it('should throw an error if lease has already expired', async () => {
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'expiredKey',
            value: encodeData('myValue'),
            lease: {...zeroLease, seconds: 10},
            metadata: new Uint8Array()
        });

        await delay(13000);

        await expect(sdk.db.q.GetLease({
            uuid,
            key: 'expiredKey'
        })).to.be.rejectedWith(/key expiredKey doesn't exist/);

    })

});