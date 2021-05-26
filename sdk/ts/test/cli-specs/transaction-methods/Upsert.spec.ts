import {
    convertBase64ToString,
    decodeData,
    DEFAULT_TIMEOUT,
    defaultLease,
    encodeData,
    getSdk,
    newSdkClient, parseJSONCliStdout
} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {bluzelle, BluzelleSdk, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from "chai";
import {curiumd} from "../../helpers/cli-helpers/curiumd-helpers";


describe('tx.Upsert()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should update a value for a given key', async () => {

        await curiumd(`tx crud create ${uuid} myKey firstValue 600 --from ${sdk.db.address} --fees 500ubnt -y`)

        await curiumd(`tx crud upsert ${uuid} myKey secondValue 600 --from ${sdk.db.address} --fees 500ubnt -y`)

        expect(await curiumd(`q crud read ${uuid} myKey -o json`)
            .then(parseJSONCliStdout)
            .then(({value}) => convertBase64ToString(value))
        ).to.equal('secondValue');
    });

    it('should create a key if it does not exist', async function () {

        await curiumd(`tx crud upsert ${uuid} nonExistingKey aValue 600 --from ${sdk.db.address} --fees 500ubnt -y`)

        expect(await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'nonExistingKey'
        }).then(resp => decodeData(resp.value))).to.equal('aValue');
    });

    it('should only allow the original owner to update a key', async function() {
        const otherSdk = await newSdkClient(sdk)

        await sdk.db.tx.Upsert({
            creator: sdk.db.address,
            uuid,
            key: 'myKey',
            value: encodeData('myValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        });

        await expect(otherSdk.db.tx.Upsert({
            creator: otherSdk.db.address,
            uuid,
            key: 'myKey',
            value: encodeData('imposter'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/incorrect owner/);

    });

});