import {expect} from 'chai'
import {API} from '../../../../src/legacyAdapter/API';
import {sentryWithClient} from "../../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {defaultLease, zeroLease} from "../../../helpers/client-helpers/sdk-helpers";

describe('update()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        useChaiAsPromised();
        bz = await sentryWithClient();
    });

    it('should work with empty value', async () => {
        await bz.create('key1', 'value', defaultLease);
        expect(await bz.read('key1')).to.equal('value');
        await bz.update('key1', '', defaultLease);
        expect(await bz.read('key1')).to.equal('');
    })

    it.skip('should resolve with txhash and height', async () => {
        await bz.create('myKey', 'myValue', defaultLease);
        expect(await bz.update('myKey', 'anotherValue', defaultLease)).to.have.property('txhash');
        expect(await bz.update('myKey', 'anotherValue', defaultLease)).to.have.property('height');
    });

    it('should update a value for a given key', async () => {
        await bz.create('myKey2', 'firstValue', defaultLease);
        expect(await bz.read('myKey2')).to.equal('firstValue');
        await bz.update('myKey2', 'secondValue', defaultLease);
        expect(await bz.read('myKey2')).to.equal('secondValue');
    });

    it('should throw error if key does not exist', async function () {
        await expect(bz.update('nonExistingKey2', 'aValue', defaultLease)).to.be.rejectedWith(/key not found/);
    });

    it.skip('should charge if you increase the size of the data', async () => {

        const leaseRate10 = 2.9615511;
        const leaseRate20 = 2.7949135;

        await bz.create('foo1', 'a', {...zeroLease,days: 10});
        const baseUpdate = await bz.update( 'foo1', 'a'.repeat(1000), {...zeroLease, days: 20});

        await bz.create('foo2', 'a', {...zeroLease, days: 20});
        const update = await bz.update( 'foo2', 'a'.repeat(1000), {...zeroLease, days: 30});

        const calculateLeaseCost = (rate: number, days: number) =>
            Math.round(rate * days * (bz.config.uuid.length + 'foo2'.length + 1000 - 'a'.length))

        // expect(baseUpdate.gasUsed - calculateLeaseCost(leaseRate10, 10))
        //     .to.equal(update.gasUsed - calculateLeaseCost(leaseRate20, 10))
    });

    // it('should only allow the original owner to update a key', async function() {
    //     const otherBz = bluzelle({
    //         mnemonic: bz.generateBIP39Account(),
    //         uuid: bz.config.uuid,
    //         url: bz.config.url,
    //         maxGas: bz.config.maxGas,
    //         gasPrice: bz.config.gasPrice,
    //     });
    //
    //     bz.transferTokensTo(otherBz.address, 10, defaultLease());
    //
    //     await bz.create('myKey', 'value', defaultLease());
    //
    //     await otherBz.update('myKey', 'otherValue', defaultLease())
    //         .then(() => this.fail('should have thrown "Incorrect Owner"'))
    //         .catch(e => expect(e.error).to.match(/Incorrect Owner/));
    // })

});


