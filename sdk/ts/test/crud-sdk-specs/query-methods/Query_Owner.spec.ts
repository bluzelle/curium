import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {getSdk, createKeys, encodeData, defaultLease, newSdkClient} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('q.Owner)(', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string
    let creator: string
    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
            .then(() => creator = sdk.db.address)
    });
    it('should throw an error for owner of nonexistent key', () => {
        return expect(sdk.db.q.Owner({
            uuid,
            key: 'nonExistentKey'
        })).to.be.rejectedWith(/key not found/)
    });

    it('should give back the correct owner', () => {
        return sdk.db.tx.Create({
            creator,
            uuid,
            key: 'myKey',
            value: encodeData('myValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })
            .then(() => sdk.db.q.Owner({
                uuid,
                key: 'myKey'
            }))
            .then(resp => resp.owner)
            .then(address => expect(address).to.equal(sdk.db.address))

    });

    it('should return the address of the owner of the uuid', () => {
        let otherSdk: BluzelleSdk
        return newSdkClient(sdk)
            .then(client => otherSdk = client)
            .then(client =>
                client.db.tx.Create({
                creator: client.db.address,
                uuid,
                key: 'myKey',
                value: encodeData('myValue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            }))
            .then(() => sdk.db.q.Owner({
                uuid,
                key: 'myKey'
            }))
            .then(resp => expect(resp.owner).to.equal(otherSdk.db.address))

    });
})
