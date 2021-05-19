import {
    createKeys,
    decodeData,
    DEFAULT_TIMEOUT,
    defaultLease,
    encodeData,
    getSdk
} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {bluzelle, BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from 'chai'


describe('q.Read()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString();
    });

    it('should immediately retrieve values from the store', () => {

        return createKeys(sdk.db, 3, uuid)
            .then(({keys}) => Promise.all(keys
                .map(async (key) => await sdk.db.q.Read({
                    uuid,
                    key
                })))
            )
            .then(readResponses => readResponses
                .map(resp => decodeData(resp.value)))
            .then(decodedValues => expect(decodedValues).to.deep.equal(['value-0', 'value-1', 'value-2']))

    });

    it('should throw an error if key does not exist', async () => {
        await expect(sdk.db.q.Read({key: 'noKey', uuid})).to.be.rejectedWith(/key not found/);
    });

    it('should handle parallel reads', async () => {
        const {keys, values} = await createKeys(sdk.db, 5, uuid);
        expect(await Promise.all(keys
            .map(key => sdk.db.q.Read({uuid, key})))
            .then(responses => responses
                .map(resp => decodeData(resp.value)))).to.deep.equal(values);
    });


    it('should work for free, for anyone to read', async () => {
        const otherSdk = await bluzelle({
            mnemonic: bluzelle.newMnemonic(),
            url: sdk.db.url,
            gasPrice: 0.002,
            maxGas: 3000000
        });
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'foo',
            value: encodeData('bar'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });
        expect(await otherSdk.db.q.Read({
            uuid,
            key: 'foo'
        }).then(resp => decodeData(resp.value))).to.equal('bar');
    })

    it.skip('should work when there is no mnemonic', async () => {
        const otherSdk = await bluzelle({
            url: sdk.db.url,
            gasPrice: 0.002,
            maxGas: 3000000
        })
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'foo',
            value: encodeData('bar'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });
        expect(await otherSdk.db.q.Read({
            uuid,
            key: 'foo'
        }).then(resp => decodeData(resp.value))).to.equal('bar');
    })
});