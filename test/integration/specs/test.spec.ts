import {expect} from 'chai'
import {Daemon, DaemonAuth} from "../control/Daemon";
import delay from 'delay'

const {bluzelle} = require('../scripts/blz-tmclient/lib/bluzelle-node');

let bz;
beforeEach(async () => {
    await Daemon.stopDaemons();
    const daemon: Daemon = await Daemon.startDaemon('daemon1');
    await delay(10000);
    const auth: DaemonAuth = await daemon.getAuth();

    console.log(auth);

    bz = await bluzelle({
        address: auth.address,
        mnemonic: auth.mnemonic,
        endpoint: "http://localhost:1317",
        chain_id: "integration"
    });
});

describe('a suite', () => {
    it('should pass', async () => {
        await bz.create('mykey', 'myvalue', {'gas_price': '0.01'});
        await delay(10000);
        const x = await bz.quickread('myKey');
        console.log('*******', x);

    })
});

