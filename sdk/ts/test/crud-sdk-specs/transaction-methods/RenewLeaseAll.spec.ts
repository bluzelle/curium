import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {encodeData, getSdk, newSdkClient, zeroLease} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";


describe('tx.RenewLeaseAll()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString();
        creator = sdk.db.address
    });

    it('should increase the lease time to the amount passed', async () => {
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key1',
            value: encodeData('value'),
            lease: {...zeroLease, days: 1},
            metadata: new Uint8Array()
        });
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key2',
            value: encodeData('value'),
            lease: {...zeroLease, days: 2},
            metadata: new Uint8Array()
        });
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key1'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400, 12);
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key2'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400 * 2, 12);

        await sdk.db.tx.RenewLeasesAll({
            creator,
            uuid,
            lease: {...zeroLease, days: 2}
        });
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key1'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400 * 2, 12);
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key2'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400 * 2, 12);
    });

    it.skip('should only allow owner of uuid to renew leases', async () => {

        const otherSdk = await newSdkClient(sdk)

        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key1',
            value: encodeData('value'),
            lease: {...zeroLease, days: 1},
            metadata: new Uint8Array()
        });
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key2',
            value: encodeData('value'),
            lease: {...zeroLease, days: 2},
            metadata: new Uint8Array()
        });
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key1'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400, 12);

        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key2'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400 * 2, 12);

        await expect(otherSdk.db.tx.RenewLeasesAll({
            creator: otherSdk.db.address,
            uuid,
            lease: {...zeroLease, days: 2}
        })).to.be.rejectedWith(/Incorrect owner/)

        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key1'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400, 12);
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key2'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(86400 * 2, 12);

    });

    it('should throw an error when trying to renew a non-existent lease', async () => {
        await expect(sdk.db.tx.RenewLeasesAll({
            creator,
            uuid,
            lease: {...zeroLease, seconds: 100}
        })).to.be.rejectedWith(/Uuid is empty/)
    })


})