import {
    decodeData,
    DEFAULT_TIMEOUT,
    defaultLease,
    encodeData,
    getSdk,
    zeroLease
} from "../helpers/client-helpers/sdk-helpers";
import {BluzelleSdk} from "../../src/bz-sdk/bz-sdk";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from 'chai'

describe('sdk.xx.withTransaction()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string;
    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
            .then(() => creator = sdk.db.address)
    });

    it('should create multiple key-values', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'firstkey',
                value: encodeData('firstvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            })

            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'secondkey',
                value: encodeData('secondvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            })

            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'thirdkey',
                value: encodeData('thirdvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            })
        }, {memo: ''})

        expect(await sdk.db.q.Read({
            uuid,
            key: 'firstkey'
        }).then(resp => resp.value as Uint8Array).then(decodeData)).to.equal('firstvalue')
        expect(await sdk.db.q.Read({
            uuid,
            key: 'secondkey'
        }).then(resp => resp.value as Uint8Array).then(decodeData)).to.equal('secondvalue')
        expect(await sdk.db.q.Read({
            uuid,
            key: 'thirdkey'
        }).then(resp => resp.value as Uint8Array).then(decodeData)).to.equal('thirdvalue')

    });

    it('should be able to do different transactions in order', () => {
        return Promise.resolve(sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'secondkey',
                value: encodeData('secondvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
            sdk.db.tx.Upsert({
                creator,
                uuid,
                key: 'secondkey',
                value: encodeData('thirdvalue'),
                metadata: new Uint8Array(),
                lease: {...zeroLease, hours: 3}
            });
            sdk.db.tx.Rename({
                creator,
                uuid,
                key: 'secondkey',
                newKey: 'thirdkey'
            });
        }, {memo: ''}))
            .then(() => sdk.db.q.Read({
                uuid,
                key: 'thirdkey'
            }))
            .then(resp => decodeData(resp.value))
            .then(val => expect(val).to.equal('thirdvalue'))
    })
    it('should be able to do different transactions in order, including delete', () => {
        return Promise.resolve(sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'secondkey',
                value: encodeData('secondvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
            sdk.db.tx.Rename({
                creator,
                uuid,
                key: 'secondkey',
                newKey: 'thirdkey'
            });
            sdk.db.tx.Delete({
                creator,
                uuid,
                key: 'thirdkey'
            });
        }, {memo: ''}))
            .then(() => sdk.db.q.Read({
                uuid,
                key: 'thirdkey'
            }))
            .catch(e => expect(e.toString()).to.match(/key not found/))
    })

});