import {expect} from "chai";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {bluzelle, BluzelleSdk, DbSdk, newMnemonic} from "../../../src/bz-sdk/bz-sdk";
import {
    createKeys, decodeData,
    defaultLease, encodeData,
    getSdk, newSdkClient,
    zeroLease
} from "../../helpers/client-helpers/sdk-helpers";
import Long from 'long'
import delay from "delay";
import {curiumd, execute} from "../../helpers/cli-helpers/curiumd-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";



describe('q.Read()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised()
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should return an error if the key-value does not exist', async () => {
        await expect(curiumd(`q crud read ${uuid} nonExistentKey`)).to.be.rejectedWith(/key not found/)
    });

    it('should read a key-value', () => {

        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'firstKey',
            value: encodeData('firstValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        })
            .then(() => curiumd(`q crud read ${uuid} firstKey`))
            .then(({stdout}) => expect(stdout).to.match(/firstValue/))

    });

    it.skip('should immediately retrieve values from the store', () => {

        return createKeys(sdk.db, 3, uuid)
            .then(({keys}) => Promise.all(keys
                .map(async (key) => await curiumd(`q crud read ${uuid} ${key}`)))
            )
            .then(readResponses => readResponses
                .forEach(({stdout}, index) => expect(stdout).to.match(new RegExp(encodeData("value-"+index).toString()))))
    });

});