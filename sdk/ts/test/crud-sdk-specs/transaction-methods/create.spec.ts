import {decodeData, DEFAULT_TIMEOUT, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from 'chai'
import {bluzelle, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {Lease} from "../../../src/codec/crud/lease";
import {getPrintableChars} from "testing/lib/helpers/testHelpers";
import {defaultGasParams} from "../../helpers/client-helpers/client-helpers";
import {Some} from "monet";
import {localChain} from "../../config";



describe('sdk.tx.Create()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: DbSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk().then(client => sdk = client.db);
    });

    it('should create a key-value', () => {

        return sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'keysss',
            value: new TextEncoder().encode('value'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
            .then(() => sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'keysss',
        }))
            .then(resp => resp.value)
            .then(decodeData)
            .then(value => expect(value).to.equal('value'))
    });
    it('should throw an error if key already exists', () => {
        return sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'firstkeys',
            value: new TextEncoder().encode('firstvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
            .then(() => expect(sdk.tx.Create({
                creator: sdk.address,
                uuid: 'uuid',
                key: 'firstkeys',
                value: new TextEncoder().encode('secondvalue'),
                lease: {days: 10} as Lease,
                metadata: new Uint8Array()
            })).to.be.rejectedWith(/key already exists/))
    });

    it('should handle long keys', async () => {
        const longKey = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012'
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: longKey,
            value: new TextEncoder().encode('longvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
        await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: longKey
        })
            .then(resp => resp.value)
            .then(decodeData)
            .then(data => expect(data).to.equal('longvalue'));
    })

    it('should handle values with symbols', async () => {
        const symbols = getPrintableChars();
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'symbolskeys',
            value: new TextEncoder().encode(symbols),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
        await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'symbolskeys'})
            .then(resp => resp.value)
            .then(decodeData)
            .then(readResponse => expect(readResponse).to.equal(symbols));
    });

    it('should throw an error if key is empty', () => {
        return expect(sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: '',
            value: new TextEncoder().encode('emptyvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith('Key cannot be empty')

    })

    it('can store json', async () => {
        const json = JSON.stringify({foo: 10, bar: 'baz', t: true, arr: [1, 2, 3]});
        await sdk.tx.Create({creator: sdk.address,
            uuid: 'uuid',
            key: 'jsonskeys',
            value: new TextEncoder().encode(json),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()})

        await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'jsonskeys'
        })
            .then(resp => resp.value)
            .then(decodeData)
            .then(readResponse => expect(readResponse).to.equal(json));

    });

    it('should throw an error if incorrect owner tries to create in uuid', async () => {
        const sdk2 = await bluzelle({
            mnemonic: bluzelle.newMnemonic(),
            url: localChain.endpoint,
            gasPrice: 0.002,
            maxGas: 100000000
        })
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'mykeyss',
            value: new TextEncoder().encode('myvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()});

        await expect(sdk2.db.tx.Create({
            creator: sdk2.db.address,
            uuid: 'uuid',
            key: 'yourkeyss',
            value: new TextEncoder().encode('yourvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith('Invalid account: check your mnemonic')

    })

    it.skip('should include tx hash and tx height in MsgCreateResponse', () => {
        return sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'dumbojumbo1',
            value: new TextEncoder().encode('elephant'),
            lease: {} as Lease,
            metadata: new Uint8Array()
        })
    });
})


