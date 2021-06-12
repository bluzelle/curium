import {expect} from "chai";
import delay from "delay";
import {DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {decodeData, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {Lease} from "../../../src/codec/crud/lease";

describe('leasing', function () {

    let sdk: DbSdk;
    let uuid: string;
    let creator: string;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk().then(client => sdk = client.db);
        uuid = Date.now().toString();
        creator = sdk.address;
    });

    // ['days', 'hours', 'minutes', 'seconds'].forEach(async (unit) => {
    //     it(`should allow lease time in ${unit}`, async () => {
    //         await bz.create('myKey', 'myValue', defaultGasParams(), {[unit]: 20})
    //         expect(await bz.read('myKey')).to.equal('myValue');
    //     })
    // });

    it('should expire key-value beyond lease time', async () => {
        await sdk.tx.Create({
            creator,
            uuid,
            key: 'leaseKey',
            value: encodeData('myValue'),
            lease:  {minutes: 1, hours: 0, days: 0, seconds: 0, years: 0},
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator,
            key: 'leaseKey',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

        await delay(60000);

        await expect(sdk.tx.Read({
            creator,
            key: 'leaseKey',
            uuid
        })).to.be.rejectedWith(/key not found/)

    });

    it('should allow still read within lease time', async () => {
        await sdk.tx.Create({
            creator,
            uuid,
            key: 'leaseKey2',
            value: encodeData('myValue'),
            lease:  {minutes: 1, hours: 1, days: 0, seconds: 0, years: 0},
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator,
            key: 'leaseKey2',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

        await delay(60000);

        expect(await sdk.tx.Read({
            creator: sdk.address,
            key: 'leaseKey2',
            uuid,
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

    });

    it('getLease()', async () => {
        await sdk.tx.Create({
            creator,
            uuid,
            key: 'leaseKey12',
            value: encodeData('myValue'),
            lease:  {minutes: 1, hours: 2, days: 0, seconds: 0, years: 0},
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator,
            key: 'leaseKey12',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

        expect(await sdk.tx.GetLease({
            creator,
            key: 'leaseKey12',
            uuid
        }).then(resp => resp.seconds)).to.be.closeTo(7260, 20)
    });

});

