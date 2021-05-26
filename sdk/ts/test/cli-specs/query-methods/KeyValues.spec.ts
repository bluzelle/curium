import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import Long from 'long'
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from 'chai'
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {
    convertBase64ToString,
    defaultLease,
    encodeData,
    getSdk,
    parseJSONCliStdout
} from "../../helpers/client-helpers/sdk-helpers";
import {curiumd} from "../../helpers/cli-helpers/curiumd-helpers";
import {QueryKeyValuesResponse} from "../../../src/codec/crud/query";
describe('tx.KeyValues()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string

    beforeEach(async () => {
        useChaiAsPromised()
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should be able to handle empty values', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key1',
                value: encodeData('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key2',
                value: new TextEncoder().encode(''),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''})

        await curiumd(`q crud keyValues ${uuid} -o json`)
            .then(parseJSONCliStdout)
            .then(({keyValues}: {keyValues: {key: string, value: string}[]}) => keyValues
                .map(({key, value}) => ({
                    key,
                    value: convertBase64ToString(value || '')
                })))
            .then(keyValues => expect(keyValues).to.deep.equal([{
                key: 'key1',
                value: 'value1'
            }, {
                key: 'key2',
                value: ''
            }]))
    })

    it('should return an empty array if there are no keys', () => {
        return curiumd(`q crud keyValues ${uuid} -o json`)
            .then(parseJSONCliStdout)
            .then(({keyValues}) => expect(keyValues).to.have.length(0))

    })

});
