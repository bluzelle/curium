import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {encodeData, getSdk, zeroLease} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('tx.RenewLease()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString();
        creator = sdk.db.address;
    });

    it('should increase the lease time in days', async () => {
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key',
            value: encodeData('value'),
            lease: {...zeroLease, days: 1},
            metadata: new Uint8Array()
        })
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400, 12);

        await sdk.db.tx.RenewLease({
            creator,
            uuid,
            key: 'key',
            lease: {...zeroLease, days: 2}
        });
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(172800, 12);
    });

    it('should reduce the lease time', async () => {
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key',
            value: encodeData('value'),
            lease: {...zeroLease, seconds: 10000},
            metadata: new Uint8Array()
        })
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(10000, 12);

        await sdk.db.tx.RenewLease({
            creator,
            uuid,
            key: 'key',
            lease: {...zeroLease, seconds: 100}
        });
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(100, 12);
    });

    it('should throw an error when trying to renew a non-existent lease', () => {
        return expect(sdk.db.tx.RenewLease({
            creator,
            uuid,
            key: 'key',
            lease: {...zeroLease, seconds: 100}
        })).to.be.rejectedWith(/key not found/)
    })
    // ... fee charges, etc.
});