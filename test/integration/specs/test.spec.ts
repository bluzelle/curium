import {expect} from 'chai'
import {Daemon} from "../control/Daemon";

const {bluzelle} = require('../scripts/blz-tmclient/lib/bluzelle-node');

let bz;
beforeEach(async () => {
   await Daemon.stopDaemons();
   const daemon:Daemon = await Daemon.startDaemon('daemon1');
   const status = await daemon.status();
   console.log(status);

    bz = await bluzelle({
        address: 'cosmos17jfr2dqreyfctfga2y4p99vwrypvc4q6usapdj',
        mnemonic: 'uniform tumble fragile define modify boy burger nose lizard hub shine novel brass document aerobic tomorrow jaguar now since sentence person auction dignity miss',
        endpoint: "http://localhost:26657",
        chain_id: "integration"
    });
});

describe('a suite', () => {
    it('should pass', () => {
        expect(true).to.be.true
    })
});

