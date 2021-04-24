import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node'
import fs from "fs";

describe('upsert()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        useChaiAsPromised();
        bz = await sentryWithClient();
    });

    it('should work with empty value', async () => {
        await bz.upsert('key1', 'value', defaultGasParams());
        expect(await bz.read('key1')).to.equal('value');
        await bz.upsert('key1', '', defaultGasParams());
        expect(await bz.read('key1')).to.equal('');
    })

    it('should resolve with txhash and height', async () => {
        await bz.create('myKey', 'myValue', defaultGasParams());
        expect(await bz.upsert('myKey', 'anotherValue', defaultGasParams())).to.have.property('txhash');
        expect(await bz.upsert('myKey', 'anotherValue', defaultGasParams())).to.have.property('height');
        console.log(await bz.upsert('mykey', 'anotherValue', defaultGasParams()));
    });

    it('should update a value for a given key', async () => {
        await bz.create('myKey', 'firstValue', defaultGasParams());
        expect(await bz.read('myKey')).to.equal('firstValue');
        await bz.upsert('myKey', 'secondValue', defaultGasParams());
        expect(await bz.read('myKey')).to.equal('secondValue');
    });

    it('should create a key if it does not exist', async function () {
        await bz.upsert('nonExistingKey', 'aValue', defaultGasParams());
        expect(await bz.read('nonExistingKey')).to.equal('aValue');
    });

    it('should only allow the original owner to update a key', async function() {
        const otherBz = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            uuid: bz.uuid,
            endpoint: bz.url
        });

        bz.transferTokensTo(otherBz.address, 10, defaultGasParams());

        await bz.upsert('myKey', 'value', defaultGasParams());

        await otherBz.upsert('myKey', 'otherValue', defaultGasParams())
            .then(() => this.fail('should have thrown "Incorrect Owner"'))
            .catch(e => expect(e.error).to.match(/Incorrect Owner/));
    });

    it('should work renewing with a shorter lease', async () => {
        await bz.upsert('myKey', 'myValue', defaultGasParams());
        await bz.upsert('myKey', 'anotherValue', defaultGasParams(), {minutes: 10});
    });

    it('should work for large entries', async () => {
        const data = fs.readFileSync(`${__dirname}/coin.txt`).toString();


        await bz.upsert('myKey', data, defaultGasParams())
            .catch(() => bz.create('aven', 'dauz', defaultGasParams()))
            .then(async () => expect(await bz.read('aven')).to.equal('dauz'));
    });

    it('should throw an error if key is empty', () => {
        return expect(bz.upsert('', 'value', defaultGasParams())).to.be.rejectedWith('Key cannot be empty')
    })

    it('should allow / in the key', () => {
        return bz.upsert('/', 'dauz', defaultGasParams())
            .then(() => expect(bz.read('/')).to.equal('dauz'))
    })

});


