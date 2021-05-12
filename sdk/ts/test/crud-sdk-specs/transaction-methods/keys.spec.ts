import {expect} from "chai";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {bluzelle, BluzelleSdk, DbSdk, newMnemonic} from "../../../src/bz-sdk/bz-sdk";
import {defaultLease, getSdk} from "../../helpers/client-helpers/sdk-helpers";


describe('keys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk ;

    beforeEach(async () => {
        sdk = await getSdk()
    });

    it('should return a empty list if there are no keys', async () => {
        expect(await sdk.db.q.Keys({
            uuid: Date.now().toString(),
        }).then(resp => resp.key)).to.have.length(0);
    });

    it('should work with an empty value', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid',
                key: 'key3',
                value: new TextEncoder().encode('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid',
                key: 'key4',
                value: new TextEncoder().encode(''),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''})
        expect(await sdk.db.q.Keys({
            uuid: 'uuid'
        }).then(resp => resp.key)).to.deep.equal(['key3', 'key4']);
    })
    //
    // it('should return a list of keys', async () => {
    //     const {keys} = await createKeys(bz, 5);
    //     expect(await bz.keys()).to.deep.equal(keys);
    // });

    it.skip('should return all keys including ones that are not mine', async () => {    // uuid ownership violation

        const otherSdk = await bluzelle({
            mnemonic: newMnemonic(''),
            url: sdk.db.url,
            gasPrice: 0.002,
            maxGas: 3000000
        });

        await sdk.bank.tx.Send({
            toAddress: otherSdk.bank.address,
            fromAddress: sdk.bank.address,
            amount: [{
                amount: '10',
                denom: 'ubnt'
            }]
        })

        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid2',
                key: 'key1',
                value: new TextEncoder().encode('my1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid2',
                key: 'key2',
                value: new TextEncoder().encode('my2'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            otherSdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid2',
                key: 'key3',
                value: new TextEncoder().encode('other'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''});

        expect(await sdk.db.q.Keys({
            uuid: 'uuid2'
        }).then(resp => resp.key)).to.deep.equal(['my1', 'my2', 'other']);

    })
});