import {times} from "lodash";
import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {
    convertBase64ToString,
    convertStringtoBase64,
    createKeys,
    defaultLease,
    encodeData,
    getSdk,
    parseJSONCliStdout
} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import Long from 'long'
import {curiumd} from "../../helpers/cli-helpers/curiumd-helpers";


describe('q.Search()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string


    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString();
        creator = sdk.db.address;
    });

    it('should return empty array if no matching keys found', () => {
        return createKeys(sdk.db, 5, uuid)
            .then(() => curiumd(`q crud search ${uuid} letters -o json`))
            .then(parseJSONCliStdout)
            .then(({keyValues}) => expect(keyValues).to.have.length(0))
    });

    it('should return a list of keyvalues that match search string', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'foo1',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'notfoo2',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'foo3',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });

        }, {memo: ''})

        await curiumd(`q crud search ${uuid} foo -o json`)
            .then(parseJSONCliStdout)
            .then(({keyValues}) => expect(keyValues).to.deep.equal([
                {
                    "key": "foo1",
                    "value": convertStringtoBase64("value")
                },
                {
                    "key": "foo3",
                    "value": convertStringtoBase64("value")
                }
            ]))

    });

    it('should allow for empty search string', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'foo1',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'foo2',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'foo3',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });

        }, {memo: ''})


        await curiumd(`q crud search ${uuid} foo -o json`)
            .then(parseJSONCliStdout)
            .then(({keyValues}) => expect(keyValues).to.deep.equal([
                {
                    "key": "foo1",
                    "value": convertStringtoBase64("value")
                },
                {
                    "key": "foo2",
                    "value": convertStringtoBase64("value")
                },
                {
                    "key": "foo3",
                    "value": convertStringtoBase64("value")
                }
            ]))

    });

});