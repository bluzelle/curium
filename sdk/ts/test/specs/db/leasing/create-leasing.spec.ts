import {DEFAULT_TIMEOUT, sentryWithClient} from "../../../helpers/client-helpers/client-helpers";
import {API} from "../../../../src/legacyAdapter/API";
import {expect} from "chai";
import {defaultLease, zeroLease} from "../../../helpers/client-helpers/sdk-helpers";
import delay from 'delay'

describe('create', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    ['days', 'hours', 'minutes', 'seconds'].forEach(async (unit) => {
        it(`should allow lease time in ${unit}`, async () => {
            await bz.create('myKey77', 'myValue',{...defaultLease, [unit]: 20})
            expect(await bz.read('myKey77')).to.equal('myValue');
        })
    });

    it('should allow for lease time in multiple units', async () => {
        await bz.create('myKey44', 'myValue',{...defaultLease, minutes: 30, hours: 1, days: 1, seconds: 30});
        expect(await bz.read('myKey44')).to.equal('myValue');
        expect(await bz.getLease('myKey44')).to.be.closeTo(91830, 5);
    });

    // it('should allow for empty lease info', async () => {
    //     await bz.create('myKey', 'myValue', defaultGasParams(), {});
    //     expect(await bz.read('myKey')).to.equal('myValue');
    // });
    //
    it('should allow for a long lease period', async () => {
        await bz.create('myKey55', 'myValue', {...defaultLease, days: 180});
        expect(await bz.read('myKey55')).to.equal('myValue');
        expect(await bz.getLease('myKey55')).to.be.closeTo(86400 * 180, 5);
    });

    it('should not timeout a lease before the lease time expires', async () => {
        await bz.create('myShortKey2', 'myValue', {...zeroLease, seconds: 15});
        await delay(9000);
        expect(await bz.read('myShortKey2')).to.equal('myValue');
    })
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
    it('should charge extra for longer leases', async () => {
        const value = 'a'.repeat(200000)
        const c1 = {
            days: 10,
            leaseRate: 2.9615511
        }
        const c2 = {
            days: 20,
            leaseRate: 2.7949135
        }
        const create1 = await bz.create('foo1', value, {...zeroLease, days: c1.days});
        const create2 = await bz.create('foo2', value, {...zeroLease, days: c2.days});

        const calculateLeaseCost = (rate: number, days: number) =>
            Math.round(rate * days * (bz.uuid.length + 'foo1'.length + value.length))

        expect(create1.gasUsed - calculateLeaseCost(c1.leaseRate, c1.days))
            .to.be.closeTo(create2.gasUsed - calculateLeaseCost(c2.leaseRate, c2.days), 3)
    });
});

