import {decodeData, DEFAULT_TIMEOUT, defaultLease, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {bluzelle, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from "chai";
import {defaultGasParams} from "../../helpers/client-helpers/client-helpers";
import {localChain} from "../../config";

describe('sdk.tx.Update()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: DbSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk().then(client => client.db);
    });

    it('should work with empty value', async () => {
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key!',
            value: encodeData('value'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key!'
        }).then(resp => decodeData(resp.value))).to.equal('value');
        await sdk.tx.Update({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key!',
            value: encodeData(''),
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key!'
        }).then(resp => decodeData(resp.value))).to.equal('');
    })

    // it('should resolve with txhash and height', async () => {
    //     await bz.create('myKey', 'myValue', defaultGasParams());
    //     expect(await bz.update('myKey', 'anotherValue', defaultGasParams())).to.have.property('txhash');
    //     expect(await bz.update('myKey', 'anotherValue', defaultGasParams())).to.have.property('height');
    // });

    it('should update a value for a given key', async () => {
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey',
            value: encodeData('firstValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey'
        }).then(resp => decodeData(resp.value))).to.equal('firstValue');
        await sdk.tx.Update({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey',
            value: encodeData('secondValue'),
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey'
        }).then(resp => decodeData(resp.value))).to.equal('secondValue');
    });

    it('should throw error if key does not exist', function () {
        expect(sdk.tx.Update({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'nonExistingKey',
            value: encodeData('nonExistingValue'),
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/key does not exist/)

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
    // it('should only allow the original owner to update a key', async function() {
    //
    //     const otherSdk = bluzelle({
    //         mnemonic: bluzelle.newMnemonic(),
    //         url: localChain.endpoint,
    //         gasPrice: 0.002,
    //         maxGas: 100000000
    //     });
    //
    //     bz.transferTokensTo(otherBz.address, 10, defaultGasParams());
    //
    //     await bz.create('myKey', 'value', defaultGasParams());
    //
    //     await otherBz.update('myKey', 'otherValue', defaultGasParams())
    //         .then(() => this.fail('should have thrown "Incorrect Owner"'))
    //         .catch(e => expect(e.error).to.match(/Incorrect Owner/));
    // })
});