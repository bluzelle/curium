import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {defaultLease, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";


describe('q.Has()', function () {
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
        expect(await sdk.db.q.Has({uuid, key: 'nonExistentKey'}).then(({has}) => has)).to.be.false;
    });

    it('should return true if key exists', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'someKey',
            value: encodeData('someValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });
        expect(await sdk.db.q.Has({uuid, key: 'someKey'}).then(({has}) => has)).to.be.true;
    });

    it('should work with an empty value', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'someKey',
            value: encodeData(''),
            lease: defaultLease,
            metadata: new Uint8Array()
        });
        expect(await sdk.db.q.Has({uuid, key: 'someKey'}).then(({has}) => has)).to.be.true;
    });

})