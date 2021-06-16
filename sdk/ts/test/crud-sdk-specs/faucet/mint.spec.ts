import {bluzelle, BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {getMintedAccount, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {expect} from "chai";
import {Lease} from "../../../src/codec/hackathon-crud/lease";
import {times} from 'lodash'
describe('mint endpoint', function () {
    //this.timeout(DEFAULT_TIMEOUT);

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

    it('should fund 3 accounts', () => {
        const users = Promise.all(times(5).map(idx => getMintedAccount()
            .then(({mnemonic}) => bluzelle({
                mnemonic,
                gasPrice: 0.002,
                maxGas: 10000000000,
                url: 'https://client.sentry.testnet.private.bluzelle.com:26657'
            }))))


    });
})