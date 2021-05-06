import {decodeData, DEFAULT_TIMEOUT, defaultLease, encodeData, getSdk} from "../helpers/client-helpers/sdk-helpers";
import {BluzelleSdk} from "../../src/bz-sdk/bz-sdk";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from 'chai'

describe('sdk.xx.withTransaction()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk
    ;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk()
    });

    it('should create multiple key-values', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid',
                key: 'firstkey',
                value: encodeData('firstvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            })

            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid',
                key: 'secondkey',
                value: encodeData('secondvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            })

            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: 'uuid',
                key: 'thirdkey',
                value: encodeData('thirdvalue'),
                metadata: new Uint8Array(),
                lease: defaultLease
            })
        }, {memo: ''})

        expect(await sdk.db.q.CrudValue({
            uuid: 'uuid',
            key: 'firstkey'
        }).then(resp => resp.CrudValue?.value as Uint8Array).then(decodeData)).to.equal('firstvalue')
        expect(await sdk.db.q.CrudValue({
            uuid: 'uuid',
            key: 'secondkey'
        }).then(resp => resp.CrudValue?.value as Uint8Array).then(decodeData)).to.equal('secondvalue')
        expect(await sdk.db.q.CrudValue({
            uuid: 'uuid',
            key: 'thirdkey'
        }).then(resp => resp.CrudValue?.value as Uint8Array).then(decodeData)).to.equal('thirdvalue')

    })


});