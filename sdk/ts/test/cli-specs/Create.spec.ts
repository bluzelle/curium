import {expect} from "chai";
import {DEFAULT_TIMEOUT, getPrintableChars} from "testing/lib/helpers/testHelpers";
import {bluzelle, BluzelleSdk, DbSdk, newMnemonic} from "../../src/bz-sdk/bz-sdk";
import {
    createKeys, decodeData,
    defaultLease,
    getSdk, newSdkClient,
    zeroLease
} from "../helpers/client-helpers/sdk-helpers";
import Long from 'long'
import delay from "delay";
import {curiumd, execute} from "../helpers/cli-helpers/curiumd-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {Lease} from "../../src/codec/crud/lease";



describe('tx.Create()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised()
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should create a key value', async () => {

        await curiumd(`tx crud create ${uuid} someKey someValue 600 --from ${sdk.db.address} --fees 500ubnt -y`)
        expect(await sdk.db.q.Read({
            uuid,
            key: 'someKey'
        }).then(resp => decodeData(resp.value))).to.equal('someValue')
    });

    it('should expire a key value beyond the specified lease in secods', async () => {

        await curiumd(`tx crud create ${uuid} someKey someValue 10 --from ${sdk.db.address} --fees 500ubnt -y`)
        await delay(10000)
        await expect(sdk.db.q.Read({
            uuid,
            key: 'someKey'
        })).to.be.rejectedWith(/key not found/)
    });

    it('should handle values with symbols', async () => {
        const symbols = getPrintableChars();
        await curiumd(`tx crud create ${uuid} symbolskey ${symbols} 600 --from ${sdk.db.address} --fees 500ubnt -y`)
        await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'symbolskeys'})
            .then(resp => resp.value)
            .then(decodeData)
            .then(readResponse => expect(readResponse).to.equal(symbols));
    });

});