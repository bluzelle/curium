import {decodeData, DEFAULT_TIMEOUT, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from "chai";
import fs from "fs";

describe('sdk.tx.Upsert()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: DbSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk().then(client => client.db);
    });
    it('should work with empty value', async () => {
        await sdk.tx.Upsert({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key1',
            value: encodeData('value'),
            metadata: new Uint8Array()
        })

        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key1'
        }).then(resp => decodeData(resp.value))).to.equal('value');

        await sdk.tx.Upsert({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key1',
            value: encodeData(''),
            metadata: new Uint8Array()
        })

        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key1'
        }).then(resp => decodeData(resp.value))).to.equal('');
    })

    // it('should resolve with txhash and height', async () => {
    //     await bz.create('myKey', 'myValue', defaultGasParams());
    //     expect(await bz.upsert('myKey', 'anotherValue', defaultGasParams())).to.have.property('txhash');
    //     expect(await bz.upsert('myKey', 'anotherValue', defaultGasParams())).to.have.property('height');
    //     console.log(await bz.upsert('mykey', 'anotherValue', defaultGasParams()));
    // });
    //
    it('should update a value for a given key', async () => {

        await sdk.tx.Upsert({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey',
            value: encodeData('firstValue'),
            metadata: new Uint8Array()
        })

        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey'
        }).then(resp => decodeData(resp.value))).to.equal('firstValue');

        await sdk.tx.Upsert({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey',
            value: encodeData('secondValue'),
            metadata: new Uint8Array()
        })

        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKey'
        }).then(resp => decodeData(resp.value))).to.equal('secondValue');
    });

    it('should create a key if it does not exist', async function () {
        await sdk.tx.Upsert({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'nonExistingKey',
            value: encodeData('aValue'),
            metadata: new Uint8Array()
        })

        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'nonExistingKey'
        }).then(resp => decodeData(resp.value))).to.equal('aValue');
    });

    // it('should only allow the original owner to update a key', async function() {
    //     const otherBz = bluzelle({
    //         mnemonic: bz.generateBIP39Account(),
    //         uuid: bz.uuid,
    //         endpoint: bz.url
    //     });
    //
    //     bz.transferTokensTo(otherBz.address, 10, defaultGasParams());
    //
    //     await bz.upsert('myKey', 'value', defaultGasParams());
    //
    //     await otherBz.upsert('myKey', 'otherValue', defaultGasParams())
    //         .then(() => this.fail('should have thrown "Incorrect Owner"'))
    //         .catch(e => expect(e.error).to.match(/Incorrect Owner/));
    // });
    //
    // it('should work renewing with a shorter lease', async () => {
    //     await bz.upsert('myKey', 'myValue', defaultGasParams());
    //     await bz.upsert('myKey', 'anotherValue', defaultGasParams(), {minutes: 10});
    // });

    it('should throw an error if key is empty', () => {
        return expect(sdk.tx.Upsert({
            creator: sdk.address,
            uuid: 'uuid',
            key: '',
            value: encodeData('emptyKey'),
            metadata: new Uint8Array()
        })).to.be.rejectedWith('Key cannot be empty')
    });

    it('should allow / in the key', () => {
        return sdk.tx.Upsert({
            creator: sdk.address,
            uuid: 'uuid',
            key: '/',
            value: encodeData('slashKey'),
            metadata: new Uint8Array()
        })
            .then(async () => expect(await sdk.tx.Read({
                creator: sdk.address,
                uuid: 'uuid',
                key: '/'
            }).then(resp => decodeData(resp.value))).to.equal('slashKey'))
    });

});