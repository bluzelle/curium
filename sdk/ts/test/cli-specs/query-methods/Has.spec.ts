import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {defaultLease, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {curiumd} from "../../helpers/cli-helpers/curiumd-helpers";


describe('q.Has()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString();
    });

    it('should return false if the key does not exist', () => {
        return curiumd(`q crud has ${uuid} nonExistentKey`)
            .then(({stdout}) => expect(stdout).to.match(/false/))
    });

    it('should return true if key exists', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'someKey',
            value: encodeData('someValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })
            .then(() => curiumd(`q crud has ${uuid} someKey`))
            .then(({stdout}) => expect(stdout).to.match(/true/))
    });

    it('should work with an empty value', async () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'someKey',
            value: encodeData(''),
            lease: defaultLease,
            metadata: new Uint8Array()
        })
            .then(() => curiumd(`q crud has ${uuid} someKey`))
            .then(({stdout}) => expect(stdout).to.match(/true/))
    });

})