import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {defaultLease, getSdk, newSdkClient} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('tx.Has()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
    });

    it('should return false if the key does not exist', async () => {
        expect(await sdk.db.tx.Has({
            key: 'someKey',
            creator: sdk.db.address,
            uuid,
        })).to.have.property('has', false);
    });

    it('should return true if key exists', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            key: 'someKey4',
            uuid,
            value: new TextEncoder().encode('someValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })
        expect(await sdk.db.tx.Has({
            creator: sdk.db.address,
            key: 'someKey4',
            uuid,
        })).to.have.property('has', true);
    });

    it('should let other users check if key exists', async () => {
        const otherSdk = await newSdkClient(sdk)

        await sdk.db.tx.Create({
            creator: sdk.db.address,
            key: 'someKey',
            uuid,
            value: new TextEncoder().encode('someValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        expect(await otherSdk.db.tx.Has({
            creator: otherSdk.db.address,
            key: 'someKey',
            uuid,
        })).to.have.property('has', true)

    })

});