import {expect} from 'chai'
import {Daemon, DaemonAuth} from "../control/Daemon";

const {bluzelle} = require('../scripts/blz-tmclient/lib/bluzelle-node');

let bz;
beforeEach(async () => {
   await Daemon.stopDaemons();
   const daemon:Daemon = await Daemon.startDaemon('daemon1');
   const auth:DaemonAuth = await daemon.getAuth();

   console.log(auth);

    bz = await bluzelle({
        address: auth.address,
        mnemonic: auth.mnemonic,
        endpoint: "http://localhost:26657",
        chain_id: "integration"
    });
});

describe('a suite', () => {
    it('should pass', () => {
        expect(true).to.be.true
    })
});

