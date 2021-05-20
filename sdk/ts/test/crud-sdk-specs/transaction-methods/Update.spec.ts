import {
    decodeData,
    DEFAULT_TIMEOUT,
    defaultLease,
    encodeData,
    getSdk,
    newSdkClient
} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {bluzelle, BluzelleSdk, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from "chai";
import delay from "delay";


describe('tx.Update()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should work with empty value', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'emptykey1',
            value: encodeData('value'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });
        expect(await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'emptykey1'
        }).then(resp => decodeData(resp.value))).to.equal('value');
        await sdk.db.tx.Update({
            creator: sdk.db.address,
            uuid,
            key: 'emptykey1',
            value: encodeData(''),
            metadata: new Uint8Array(),
            lease: defaultLease
        });
        expect(await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'emptykey1'
        }).then(resp => decodeData(resp.value))).to.equal('');
    })

    // it('should resolve with txhash and height', async () => {
    //     await bz.create('myKey', 'myValue', defaultGasParams());
    //     expect(await bz.update('myKey', 'anotherValue', defaultGasParams())).to.have.property('txhash');
    //     expect(await bz.update('myKey', 'anotherValue', defaultGasParams())).to.have.property('height');
    // });

    it('should update a value for a given key', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'myKey',
            value: encodeData('firstValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });
        expect(await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'myKey'
        }).then(resp => decodeData(resp.value))).to.equal('firstValue');

        await sdk.db.tx.Update({
            creator: sdk.db.address,
            uuid,
            key: 'myKey',
            value: encodeData('secondValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });
        expect(await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'myKey'
        }).then(resp => decodeData(resp.value))).to.equal('secondValue');
    });

    it('should throw error if key does not exist', async () => {
        await expect(sdk.db.tx.Update({
            creator: sdk.db.address,
            uuid,
            key: 'nonExistingKey',
            value: encodeData('nonExistingValue'),
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/key not found/)

    });

    it('should update lease', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'highLease7',
            value: encodeData('firstValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });
        expect(await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'highLease7'
        }).then(resp => decodeData(resp.value))).to.equal('firstValue');

        await sdk.db.tx.Update({
            creator: sdk.db.address,
            uuid,
            key: 'highLease7',
            value: encodeData('secondValue'),
            lease: {seconds: 0, minutes: 3, hours: 0, days: 0, years: 0},
            metadata: new Uint8Array()
        });

        expect(await sdk.db.tx.GetLease({
            creator: sdk.db.address,
            uuid,
            key: 'highLease7'
        }).then(resp => resp.leaseBlocks.toInt() * 5.5)).to.be.closeTo(3 * 60, 30)
    });

    it('should expire beyond updated lease time', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'highLease4',
            value: encodeData('firstValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });
        expect(await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'highLease4'
        }).then(resp => decodeData(resp.value))).to.equal('firstValue');

        await sdk.db.tx.Update({
            creator: sdk.db.address,
            uuid,
            key: 'highLease4',
            value: encodeData('secondValue'),
            lease: {seconds: 20, minutes: 0, hours: 0, days: 0, years: 0},
            metadata: new Uint8Array()
        });

        await delay(60000)

        await expect(sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'highLease4'
        })).to.be.rejectedWith(/key highLease4 doesn't exist/)
    });

    //
    // it.skip('should charge if you increase the size of the data', async () => {
    //
    //     const leaseRate10 = 2.9615511;
    //     const leaseRate20 = 2.7949135;
    //
    //     await bz.create('foo1', 'a', defaultGasParams(), {days: 10});
    //     const baseUpdate = await bz.update( 'foo1', 'a'.repeat(1000), defaultGasParams(), {days: 20});
    //
    //     await bz.create('foo2', 'a', defaultGasParams(), {days: 20});
    //     const update = await bz.update( 'foo2', 'a'.repeat(1000), defaultGasParams(), {days: 30});
    //
    //     const calculateLeaseCost = (rate: number, days: number) =>
    //         Math.round(rate * days * (bz.uuid.length + 'foo2'.length + 1000 - 'a'.length))
    //
    //     // expect(baseUpdate.gasUsed - calculateLeaseCost(leaseRate10, 10))
    //     //     .to.equal(update.gasUsed - calculateLeaseCost(leaseRate20, 10))
    // });
    //
    it('should only allow the original owner to update a key', async function() {
        const otherSdk = await newSdkClient(sdk)

        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'myKey',
            value: encodeData('myValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });

        await expect(otherSdk.db.tx.Update({
            creator: otherSdk.db.address,
            uuid,
            key: 'myKey',
            value: encodeData('imposter'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/incorrect owner/);
    })
});