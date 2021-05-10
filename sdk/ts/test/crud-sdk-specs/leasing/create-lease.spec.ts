import {expect} from "chai";
import delay from "delay";
import {DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {decodeData, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {Lease} from "../../../src/codec/crud/lease";

describe('create', function () {

    let sdk: DbSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk().then(client => sdk = client.db);
    });

    // ['days', 'hours', 'minutes', 'seconds'].forEach(async (unit) => {
    //     it(`should allow lease time in ${unit}`, async () => {
    //         await bz.create('myKey', 'myValue', defaultGasParams(), {[unit]: 20})
    //         expect(await bz.read('myKey')).to.equal('myValue');
    //     })
    // });

    it('should expire key-value beyond lease time', async () => {
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'leaseKey',
            value: encodeData('myValue'),
            lease:  {minutes: 1, hours: 0, days: 0, seconds: 0, years: 0},
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            key: 'leaseKey',
            uuid: 'uuid'
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

        await delay(60000);

        expect(sdk.tx.Read({
            creator: sdk.address,
            key: 'leaseKey',
            uuid: 'uuid'
        })).to.be.rejectedWith(/key does not exist/)

    });

    it('should allow still read within lease time', async () => {
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'leaseKey2',
            value: encodeData('myValue'),
            lease:  {minutes: 1, hours: 1, days: 0, seconds: 0, years: 0},
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            key: 'leaseKey2',
            uuid: 'uuid'
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

        await delay(60000);

        expect(await sdk.tx.Read({
            creator: sdk.address,
            key: 'leaseKey2',
            uuid: 'uuid'
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

    });

    it('getLease()', async () => {
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'leaseKey12',
            value: encodeData('myValue'),
            lease:  {minutes: 1, hours: 2, days: 0, seconds: 0, years: 0},
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            key: 'leaseKey12',
            uuid: 'uuid'
        }).then(resp => decodeData(resp.value))).to.equal('myValue')

        expect(await sdk.tx.GetLease({
            creator: sdk.address,
            key: 'leaseKey12',
            uuid: 'uuid'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(7260, 20)
    });

    // it('should allow for empty lease info', async () => {
    //     await bz.create('myKey', 'myValue', defaultGasParams(), {});
    //     expect(await bz.read('myKey')).to.equal('myValue');
    // });
    //
    // it('should allow for a long lease period', async () => {
    //     await bz.create('myKey', 'myValue', defaultGasParams(), {days: 180});
    //     expect(await bz.read('myKey')).to.equal('myValue');
    //     expect(await bz.getLease('myKey')).to.be.closeTo(86400 * 180, 5);
    // });
    //
    // it('should not timeout a lease before the lease time expires', async () => {
    //     await bz.create('myKey', 'myValue', defaultGasParams(), {seconds: 10});
    //     await delay(9000);
    //     expect(await bz.read('myKey')).to.equal('myValue');
    // })
    //
    // it('should timeout a lease after the lease period', async function () {
    //     await bz.create('myKey', 'myValue', defaultGasParams(), {seconds: 10});
    //     const start = Date.now();
    //     const TIMEOUT = 20000;
    //
    //     while ((await canReadKey()) === false) ;
    //
    //     while ((await canReadKey()) && lessThanTimeout()) ;
    //
    //     expect(await canReadKey()).to.be.false;
    //
    //     async function canReadKey() {
    //         try {
    //             return !!(await bz.read('myKey'));
    //         } catch (e) {
    //             return false;
    //         }
    //     }
    //
    //     function lessThanTimeout() {
    //         return Date.now() - start < TIMEOUT;
    //     }
    // })
    //
    // it.skip('should charge extra for longer leases', async () => {
    //     const value = 'a'.repeat(200000)
    //     const c1 = {
    //         days: 10,
    //         leaseRate: 2.9615511
    //     }
    //     const c2 = {
    //         days: 20,
    //         leaseRate: 2.7949135
    //     }
    //     const create1 = await bz.create('foo1', value, defaultGasParams(), {days: c1.days});
    //     const create2 = await bz.create('foo2', value, defaultGasParams(), {days: c2.days});
    //
    //     const calculateLeaseCost = (rate: number, days: number) =>
    //         Math.round(rate * days * (bz.uuid.length + 'foo1'.length + value.length))
    //
    //     expect(create1.gasUsed - calculateLeaseCost(c1.leaseRate, c1.days))
    //         .to.be.closeTo(create2.gasUsed - calculateLeaseCost(c2.leaseRate, c2.days), 3)
    // });
});

