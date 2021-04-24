import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {getTxRpcClient, mnemonicToAddress} from "../../../src/temp";
import Long from "long";
import {passThroughAwait} from "promise-passthrough";
import {MsgClientImpl} from "../../../lib/codec/crud/tx";

describe('txRead()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
    });

    it('should work with empty value', async () => {
        await bz.create('key', '', defaultGasParams());
        expect(await bz.txRead('key', defaultGasParams())).to.have.property('value', '');
    })

    it('should retrieve values in order', async () => {
        const results = await Promise.all([
            bz.create('mykey', 'myvalue', defaultGasParams()),
            bz.txRead('mykey', defaultGasParams()),
            bz.update('mykey', 'avalue', defaultGasParams()),
            bz.txRead('mykey', defaultGasParams())
        ]);
        expect(results?.[1]?.value).to.equal('myvalue');
        expect(results?.[3]?.value).to.equal('avalue');
    })


    it('should retrieve a value from the store', async () => {
        await bz.create('myKey', 'myvalue', defaultGasParams());
        await expect(await bz.txRead('myKey', defaultGasParams()).then(x => x?.value)).to.equal('myvalue');
    });

    it('should throw an error if key does not exist', async () => {
        expect(await bz.txRead('noKey', defaultGasParams()).catch(e => e)).to.match(/Key does not exist/);
    });

    it('should handle parallel reads', async () => {
        const {keys, values} = await createKeys(bz, 5);
        expect(
            await Promise.all(keys.map(key => bz.txRead(key, defaultGasParams()).then(x => x?.value)))
        ).to.deep.equal(values);
    });

    it('should read response in JSON', async () => {
        await bz.create('myKey', 'myvalue', defaultGasParams());
        await bz.txReadTemp('myKey', defaultGasParams());
    });

    it('should use tx rpc client to read', () => {
        return getTxRpcClient()
            .then(passThroughAwait(async (client) => client.Create({
                key: "aven",
                value: new TextEncoder().encode("dauz"),
                uuid: bz.uuid,
                creator: await mnemonicToAddress(bz.mnemonic),
                lease: Long.fromInt(3000),
                metadata: new Uint8Array()
            })))
            .then(async (txClient) => txClient.Read({
                creator: await mnemonicToAddress(bz.mnemonic),
                uuid: bz.uuid,
                key: "aven"
            }))
            .then(x => console.log(x))
            .catch(e => console.log(e))
    });
});


