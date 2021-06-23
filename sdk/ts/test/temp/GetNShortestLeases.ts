import {expect} from "chai";
import {BluzelleSdk} from "../../src/bz-sdk/bz-sdk";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {encodeData, getSdk, zeroLease} from "../helpers/client-helpers/sdk-helpers";
import Long from 'long'
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('tx.GetNShortestLeases', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string
    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
            .then(() => creator = sdk.db.address)
    });

    it('should return the first 2 shortest leases', async () => {
        await Promise.all([
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'days',
                value: encodeData('value'),
                lease: {...zeroLease, days: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'hours',
                value: encodeData('value'),
                lease: {...zeroLease, hours: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'minutes',
                value: encodeData('value'),
                lease: {...zeroLease, minutes: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'seconds',
                value: encodeData('value'),
                lease: {...zeroLease, seconds: 30},
                metadata: new Uint8Array()
            }),
        ]);
        const result = await sdk.db.tx.GetNShortestLeases({
            creator,
            uuid,
            num: 2
        }).then(resp => resp.keyLeases)


        expect((result.find(({key}) => key === 'seconds')?.seconds || 0)).to.be.closeTo(30, 12);
        expect((result.find(({key}) => key === 'minutes')?.seconds || 0)).to.be.closeTo(60, 12);
    });

    it('should show all leases if n > current num of leases', async () => {
        await Promise.all([
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'days',
                value: encodeData('value'),
                lease: {...zeroLease, days: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'hours',
                value: encodeData('value'),
                lease: {...zeroLease, hours: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'minutes',
                value: encodeData('value'),
                lease: {...zeroLease, minutes: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'seconds',
                value: encodeData('value'),
                lease: {...zeroLease, seconds: 30},
                metadata: new Uint8Array()
            }),
        ]);
        expect(await sdk.db.tx.GetNShortestLeases({
            creator,
            uuid,
            num: 5
        }).then(resp => resp.keyLeases)).to.have.length(4)
    });

    it('should handle shortest leases of the same length', async () => {
        await Promise.all([
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'hours',
                value: encodeData('value'),
                lease: {...zeroLease, hours: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'minutes',
                value: encodeData('value'),
                lease: {...zeroLease, minutes: 1},
                metadata: new Uint8Array()
            }),
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'seconds',
                value: encodeData('value'),
                lease: {...zeroLease, seconds: 60},
                metadata: new Uint8Array()
            }),
        ]);
        const result = await sdk.db.tx.GetNShortestLeases({
            creator,
            uuid,
            num: 2
        }).then(resp => resp.keyLeases)

        expect((result.find(({key}) => key === 'seconds')?.seconds || 0)).to.be.closeTo(60, 20);
        expect((result.find(({key}) => key === 'minutes')?.seconds || 0)).to.be.closeTo(60, 20);
    });
});