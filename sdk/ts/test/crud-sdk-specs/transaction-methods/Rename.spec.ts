import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {defaultGasParams} from "../../helpers/client-helpers/client-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {encodeData, getSdk, defaultLease, newSdkClient} from "../../helpers/client-helpers/sdk-helpers";


describe('Rename()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    })

    it('should rename a key', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'keyBefore',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Rename({
                creator: sdk.db.address,
                uuid,
                key: 'keyBefore',
                newKey: 'keyAfter',
            });
        }, {memo: ''});

        await sdk.db.q.Keys({
            uuid
        })
            .then((results) => expect(results.key).to.contain('keyAfter'));

    });

    it('should only rename if it is the owner', async () => {
        const otherSdk = await newSdkClient(sdk);

        await sdk.bank.tx.Send({
            fromAddress: sdk.bank.address,
            toAddress: otherSdk.bank.address,
            amount: [{
                amount: '1000',
                denom: 'ubnt'
            }]
        })
        // ...

    });

    it('should throw an error if renaming a non-existent key', () => {
        return expect(sdk.db.tx.Rename({
            creator: sdk.db.address,
            uuid,
            key: 'keyBefore',
            newKey: 'keyAfter',
        })).to.be.rejectedWith(/key does not exist/)

    })
});


