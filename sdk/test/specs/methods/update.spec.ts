import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node'

describe('update()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        useChaiAsPromised();
        bz = await sentryWithClient();
    });

    it('should work with empty value', async () => {
        await bz.create('key1', 'value', defaultGasParams());
        expect(await bz.read('key1')).to.equal('value');
        await bz.update('key1', '', defaultGasParams());
        expect(await bz.read('key1')).to.equal('');
    })

    it('should resolve with txhash and height', async () => {
        await bz.create('myKey', 'myValue', defaultGasParams());
        expect(await bz.update('myKey', 'anotherValue', defaultGasParams())).to.have.property('txhash');
        expect(await bz.update('myKey', 'anotherValue', defaultGasParams())).to.have.property('height');
    });

    it('should update a value for a given key', async () => {
        await bz.create('myKey', 'firstValue', defaultGasParams());
        expect(await bz.read('myKey')).to.equal('firstValue');
        await bz.update('myKey', 'secondValue', defaultGasParams());
        expect(await bz.read('myKey')).to.equal('secondValue');
    });

    it('should throw error if key does not exist', async function () {
        expect(await bz.update('nonExistingKey', 'aValue', defaultGasParams()).catch(e => e.error)).to.match(/Key does not exist/);
    });

    it.skip('should charge if you increase the size of the data', async () => {

        const leaseRate10 = 2.9615511;
        const leaseRate20 = 2.7949135;

        await bz.create('foo1', 'a', defaultGasParams(), {days: 10});
        const baseUpdate = await bz.update( 'foo1', 'a'.repeat(1000), defaultGasParams(), {days: 20});

        await bz.create('foo2', 'a', defaultGasParams(), {days: 20});
        const update = await bz.update( 'foo2', 'a'.repeat(1000), defaultGasParams(), {days: 30});

        const calculateLeaseCost = (rate: number, days: number) =>
            Math.round(rate * days * (bz.uuid.length + 'foo2'.length + 1000 - 'a'.length))

        // expect(baseUpdate.gasUsed - calculateLeaseCost(leaseRate10, 10))
        //     .to.equal(update.gasUsed - calculateLeaseCost(leaseRate20, 10))
    });

    it('should only allow the original owner to update a key', async function() {
        const otherBz = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            uuid: bz.uuid,
            endpoint: bz.url
        });

        bz.transferTokensTo(otherBz.address, 10, defaultGasParams());

        await bz.create('myKey', 'value', defaultGasParams());

        await otherBz.update('myKey', 'otherValue', defaultGasParams())
            .then(() => this.fail('should have thrown "Incorrect Owner"'))
            .catch(e => expect(e.error).to.match(/Incorrect Owner/));
    })

});


