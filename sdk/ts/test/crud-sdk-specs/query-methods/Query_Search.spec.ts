import {times} from "lodash";
import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {defaultLease, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import Long from 'long'


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

    it('should return empty array if no matching keys found', async () => {
        await Promise.all(times(6, n => sdk.db.tx.Create({
            creator,
            uuid,
            key: n.toString(),
            value: encodeData('foo'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })))
        await sdk.db.q.Search({
            uuid,
            searchString: 'letters',

        })
            .then(resp => expect(resp.keyValues).to.have.length(0))

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

        expect(await sdk.db.q.Search({
            uuid,
            searchString: 'foo'
        }).then(resp => resp.keyValues)).to.deep.equal([
            {
                "key": "foo1",
                "value": encodeData("value")
            },
            {
                "key": "foo3",
                "value": encodeData("value")
            }
        ])

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

        expect(await sdk.db.q.Search({
            uuid,
            searchString: ''
        }).then(resp => resp.keyValues)).to.deep.equal([
            {
                "key": "foo1",
                "value": encodeData("value")
            },
            {
                "key": "foo2",
                "value": encodeData("value")
            },
            {
                "key": "foo3",
                "value": encodeData("value")
            }
        ])
    });

    it('should page results', async () => {
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

        expect(await sdk.db.q.Search({
            uuid,
            searchString: 'foo',
            pagination: {
                startKey: '2',
                limit: Long.fromInt(2)
            }
        }).then(resp => resp.keyValues)).to.deep.equal([
                {
                    "key": "foo2",
                    "value": encodeData('value')
                },
                {
                    "key": "foo3",
                    "value": encodeData('value')
                }
            ])
        expect(await sdk.db.q.Search({
            uuid,
            searchString: 'foo',
            pagination: {
                startKey: '3',
                limit: Long.fromInt(3)
            }
        }).then(resp => resp.keyValues)).to.deep.equal([
            {
                "key": "foo3",
                "value": encodeData('value')
            }
        ])

    });



});