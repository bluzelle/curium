import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {getSwarm} from "testing/lib/helpers/swarmHelpers";
import {checkBalance, getMintedAccount, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {Lease} from "../../../src/codec/crud/lease";
import {expect} from "chai";
import {passThroughAwait} from "promise-passthrough";

describe('tx.Create()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string;
    beforeEach(async function () {
        useChaiAsPromised();
        return getMintedAccount()
            .then(({mnemonic}) => getSdk(mnemonic))
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
            .then(() => creator = sdk.db.address)
    });

    it('should create a key-value in the database', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'someKey',
            value: new TextEncoder().encode('someValue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
            .then(() => sdk.db.tx.Read({
                creator,
                uuid,
                key: 'someKey'
            }))
            .then(resp => new TextDecoder().decode(resp.value))
            .then(val => expect(val).to.equal('someValue'))
    })

})