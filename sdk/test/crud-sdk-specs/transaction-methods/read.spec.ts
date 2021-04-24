import {DEFAULT_TIMEOUT, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {DbSdk} from "../../../src/bz-sdk/bz-sdk";

describe('sdk.tx.Read()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: DbSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
    });
    it('should read a value from the db', () => {})
});