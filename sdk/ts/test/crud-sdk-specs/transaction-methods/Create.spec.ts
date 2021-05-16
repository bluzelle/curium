import {decodeData, DEFAULT_TIMEOUT, defaultLease, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from 'chai'
import {bluzelle, BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {Lease} from "../../../src/codec/crud/lease";
import {getPrintableChars} from "testing/lib/helpers/testHelpers";
import {localChain} from "../../config";
import {CalculateGasForLease} from "../../helpers/client-helpers/client-helpers";
import delay from "delay";

describe('sdk.tx.Create()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should create a key-value', async () => {

        const initialBal: number = await sdk.bank.q.Balance({
                address: sdk.bank.address,
                denom: 'ubnt'
            }).then(resp => resp.balance? parseInt(resp.balance.amount): 0)

        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'key',
            value: new TextEncoder().encode('value'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })

        await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'key1',
        })
            .then(resp => resp.value)
            .then(decodeData)
            .then(value => expect(value).to.equal('value'))

        const finalBal: number = await sdk.bank.q.Balance({
            address: sdk.bank.address,
            denom: 'ubnt'
        }).then(resp => resp.balance? parseInt(resp.balance.amount): 0)

        await console.log(initialBal - finalBal)

        await expect(finalBal).to.equal(initialBal - 0.002 * CalculateGasForLease(defaultLease, 'uuid'.length + 'key'.length + 'value'.length))
    });
    it('should throw an error if key already exists', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'firstkeys',
            value: new TextEncoder().encode('firstvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
            .then(() => expect(sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'firstkeys',
                value: new TextEncoder().encode('secondvalue'),
                lease: {days: 10} as Lease,
                metadata: new Uint8Array()
            })).to.be.rejectedWith(/key already exists/))
    });

    it('should handle long keys', async () => {
        const longKey = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012'
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: longKey,
            value: new TextEncoder().encode('longvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
        await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: longKey
        })
            .then(resp => resp.value)
            .then(decodeData)
            .then(data => expect(data).to.equal('longvalue'));
    })

    it('should handle values with symbols', async () => {
        const symbols = getPrintableChars();
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'symbolskeys',
            value: new TextEncoder().encode(symbols),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
        await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'symbolskeys'})
            .then(resp => resp.value)
            .then(decodeData)
            .then(readResponse => expect(readResponse).to.equal(symbols));
    });

    it('should throw an error if key is empty', () => {
        return expect(sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: '',
            value: new TextEncoder().encode('emptyvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith('Key cannot be empty')

    })

    it('can store json', async () => {
        const json = JSON.stringify({foo: 10, bar: 'baz', t: true, arr: [1, 2, 3]});
        await sdk.db.tx.Create({creator: sdk.db.address,
            uuid,
            key: 'jsonskeys',
            value: new TextEncoder().encode(json),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()})

        await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
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

        await sdk.bank.tx.Send({
            toAddress: sdk2.bank.address,
            fromAddress: sdk.bank.address,
            amount: [{
                amount: '100',
                denom: 'ubnt'
            }]
        })
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'mykeyss',
            value: new TextEncoder().encode('myvalue'),
            lease: defaultLease,
            metadata: new Uint8Array()});

        await expect(sdk2.db.tx.Create({
            creator: sdk2.db.address,
            uuid,
            key: 'yourkeyss',
            value: new TextEncoder().encode('yourvalue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/incorrect owner/)

    })

    it.skip('should include tx hash and tx height in MsgCreateResponse', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'dumbojumbo1',
            value: new TextEncoder().encode('elephant'),
            lease: {} as Lease,
            metadata: new Uint8Array()
        })
    });
})


