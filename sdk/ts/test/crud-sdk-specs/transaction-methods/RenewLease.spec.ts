import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {defaultLease, encodeData, getSdk, zeroLease} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('tx.RenewLease()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString();
        creator = sdk.db.address;
    });

    it('should increase the lease time in days', async () => {
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key',
            value: encodeData('value'),
            lease: {...zeroLease, days: 1},
            metadata: new Uint8Array()
        })
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.seconds)).to.be.closeTo(86400, 12);

        await sdk.db.tx.RenewLease({
            creator,
            uuid,
            key: 'key',
            lease: {...zeroLease, days: 2}
        });
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.seconds)).to.be.closeTo(172800, 12);
    });

    it('should reduce the lease time', async () => {
        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key',
            value: encodeData('value'),
            lease: {...zeroLease, seconds: 10000},
            metadata: new Uint8Array()
        })
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.seconds)).to.be.closeTo(10000, 12);

        await sdk.db.tx.RenewLease({
            creator,
            uuid,
            key: 'key',
            lease: {...zeroLease, seconds: 100}
        });
        expect(await sdk.db.tx.GetLease({
            creator,
            uuid,
            key: 'key'
        }).then(resp => resp.seconds)).to.be.closeTo(100, 12);
    });

    it('should throw an error when trying to renew a non-existent lease', () => {
        return expect(sdk.db.tx.RenewLease({
            creator,
            uuid,
            key: 'key',
            lease: {...zeroLease, seconds: 100}
        })).to.be.rejectedWith(/key not found/)
    })

    it('should not charge for renewing a shorter lease', () => {
        let balAfterCreate = 0;

        return sdk.db.tx.Create({
            creator,
            uuid,
            key: 'myKey',
            value: encodeData('myValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        })

            .then(() => sdk.bank.q.Balance({
                address: creator,
                denom: "ubnt"
            }))
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt =>
                balAfterCreate += amt
            )
            .then(() => sdk.db.tx.RenewLease({
                creator,
                uuid,
                key: 'myKey',
                lease: {...zeroLease, seconds: 120},
            }))
            .then(() => sdk.bank.q.Balance({
                address: creator,
                denom: "ubnt"
            }))
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => expect(balAfterCreate - amt).to.be.closeTo(0, 5))
    });

    it('should charge more for renewing a longer lease', () => {
        let balAfterCreate = 0;

        return sdk.db.tx.Create({
            creator,
            uuid,
            key: 'myKey',
            value: encodeData('myValue'),
            metadata: new Uint8Array(),
            lease: defaultLease
        })

            .then(() => sdk.bank.q.Balance({
                address: creator,
                denom: "ubnt"
            }))
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt =>
                balAfterCreate += amt
            )
            .then(() => sdk.db.tx.RenewLease({
                creator,
                uuid,
                key: 'myKey',
                lease: {...zeroLease, days: 1},
            }))
            .then(() => sdk.bank.q.Balance({
                address: creator,
                denom: "ubnt"
            }))
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => expect(balAfterCreate - amt).to.be.closeTo(0, 5))
    })

});