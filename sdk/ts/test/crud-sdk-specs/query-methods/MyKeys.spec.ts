import {expect} from "chai";
import {bluzelle, BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {defaultGasParams} from "../../helpers/client-helpers/client-helpers";
import {defaultLease, encodeData, getSdk, zeroLease} from "../../helpers/client-helpers/sdk-helpers";
import delay from "delay";

describe('myKeys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;

    beforeEach(async () => {
        sdk = await getSdk();
    });

    it.skip('should return a list of only keys that I own', async () => {
        const otherSdk = await bluzelle({
            mnemonic: bluzelle.newMnemonic(),
            url: sdk.db.url,
            gasPrice: 0.002,
            maxGas: 30000000
        });

        await sdk.bank.tx.Send({
            toAddress: otherSdk.bank.address,
            fromAddress: sdk.bank.address,
            amount: [{
                amount: '1000',
                denom: 'ubnt'
            }]
        })

        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid9',
                key: 'my14',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid9',
                key: 'my24',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });

            otherSdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid9',
                key: 'other4',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
        }, {memo: ''});

        expect(await sdk.db.q.MyKeys({
            address: sdk.db.address,
            uuid: 'uuid9'
        }).then(resp => resp.key)).to.deep.equal(['my14', 'my24']);
        expect(await otherSdk.db.q.MyKeys({
            address: otherSdk.db.address,
            uuid: 'uuid9'
        }).then(resp => resp.key)).to.deep.equal(['other4']);
    });

    it('should not show keys that have been deleted', async () => {

        const uuidTime = Date.now().toString()

        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: uuidTime,
                key: 'my1',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: uuidTime,
                key: 'my2',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
        }, {memo: ''});

        expect(await sdk.db.q.MyKeys({
            address: sdk.db.address,
            uuid: uuidTime
        }).then(resp => resp.key)).to.deep.equal(['my1', 'my2']);

        await sdk.db.tx.Delete({
            creator: sdk.db.address,
            key: 'my1',
            uuid: uuidTime
        })

        expect(await sdk.db.q.MyKeys({
            address: sdk.db.address,
            uuid: uuidTime
        }).then(resp => resp.key)).to.deep.equal(['my2'])
    });

    it('should not show a key after it expires', async () => {
        const uuidTime = Date.now().toString()
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: uuidTime,
                key: 'my1',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: {...zeroLease, seconds: 8}
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: uuidTime,
                key: 'my2',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
        }, {memo: ''});

        expect(await sdk.db.q.MyKeys({
            uuid: uuidTime,
            address: sdk.db.address
        }).then(resp => resp.key)).to.deep.equal(['my1', 'my2']);

        await delay(12000);

        expect(await sdk.db.q.MyKeys({
            uuid: uuidTime,
            address: sdk.db.address
        }).then(resp => resp.key)).to.deep.equal(['my2']);
    });

    // it('should not show keys after a deleteAll', async () => {
    //     const ot = bluzelle({
    //         mnemonic: bz.generateBIP39Account(),
    //         endpoint: bz.url,
    //         uuid: bz.uuid
    //     });
    //
    //     await bz.transferTokensTo(otherBz.address, 1000, defaultGasParams());
    //
    //
    //     await bz.withTransaction(() => {
    //         bz.create('my1', 'value', defaultGasParams());
    //         bz.create('my2', 'value', defaultGasParams());
    //         otherBz.create('other', 'value', defaultGasParams());
    //     });
    //
    //     expect(await bz.myKeys()).to.deep.equal(['my1', 'my2']);
    //     await bz.deleteAll(defaultGasParams())
    //     expect(await bz.myKeys()).to.deep.equal([]);
    //     expect(await otherBz.myKeys()).to.deep.equal(['other']);
    //     await otherBz.deleteAll(defaultGasParams());
    //     expect(await otherBz.myKeys()).to.deep.equal([]);
    //
    //     const otherSdk = await bluzelle({
    //         mnemonic: bluzelle.newMnemonic(),
    //         url: sdk.db.url,
    //         gasPrice: 0.002,
    //         maxGas: 30000000
    //     });
    //
    //     await sdk.bank.tx.Send({
    //         toAddress: otherSdk.bank.address,
    //         fromAddress: sdk.bank.address,
    //         amount: [{
    //             amount: '1000',
    //             denom: 'ubnt'
    //         }]
    //     })
    //
    //     await sdk.db.withTransaction(() => {
    //         sdk.db.tx.Create({
    //             creator: sdk.db.address,
    //             uuid: 'uuid9',
    //             key: 'my14',
    //             value: encodeData('value'),
    //             metadata: new Uint8Array(),
    //             lease: defaultLease
    //         });
    //         sdk.db.tx.Create({
    //             creator: sdk.db.address,
    //             uuid: 'uuid9',
    //             key: 'my24',
    //             value: encodeData('value'),
    //             metadata: new Uint8Array(),
    //             lease: defaultLease
    //         });
    //
    //         otherSdk.db.tx.Create({
    //             creator: sdk.db.address,
    //             uuid: 'uuid9',
    //             key: 'other4',
    //             value: encodeData('value'),
    //             metadata: new Uint8Array(),
    //             lease: defaultLease
    //         });
    //     }, {memo: ''});
    //
    //     expect(await sdk.db.q.MyKeys({
    //         address: sdk.db.address,
    //         uuid: 'uuid9'
    //     }).then(resp => resp.key)).to.deep.equal(['my14', 'my24']);
    //     expect(await otherSdk.db.q.MyKeys({
    //         address: otherSdk.db.address,
    //         uuid: 'uuid9'
    //     }).then(resp => resp.key)).to.deep.equal(['other4']);
    // });
    //
    // it('should show the right keys if you rename a key', async () => {
    //     await bz.withTransaction(() => {
    //         bz.create('my1', 'value', defaultGasParams());
    //         bz.create('my2', 'value', defaultGasParams());
    //     });
    //
    //     expect(await bz.myKeys()).to.deep.equal(['my1', 'my2']);
    //
    //     await bz.rename('my1', 'myOne', defaultGasParams());
    //     expect(await bz.myKeys()).to.deep.equal(['my2', 'myOne']);
    // })
})