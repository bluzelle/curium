import {DEFAULT_TIMEOUT, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import Long from 'long'
import {expect} from 'chai'
import {DbSdk} from "../../../src/bz-sdk/bz-sdk";



describe('sdk.tx.Create()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: DbSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
    });

    it('should create a key-value', () => {

        return sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key',
            value: new TextEncoder().encode('value'),
            lease: Long.fromInt(3000),
            metadata: new Uint8Array()
        })
            .then(() => sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'key',
        }))
            .then(resp => new TextDecoder().decode(resp.value))
            .then(value => expect(value).to.equal('value'))
    });
    it('should throw an error if key already exists', () => {});
    it('should throw an error if value (before encoding) is not a string', () => {});
    it('should throw an error if uuid is already taken', () => {});
    it('should throw an error if key is not a string', () => {});
    it('should include tx hash and tx height in MsgCreateResponse', () => {
        return sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'dumbojumbo1',
            value: new TextEncoder().encode('elephant'),
            lease: Long.fromInt(3000),
            metadata: new Uint8Array()
        })
            .then(resp => {
                expect(resp.txHash).to.not.equal("")
                expect(resp).to.not.equal(new Long(0))
            })
    });
})


