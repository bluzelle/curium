import {expect} from 'chai'
import {Daemon, DaemonAuth} from "../control/Daemon";
import delay from 'delay'

const {bluzelle} = require('../scripts/blz-tmclient/lib/bluzelle-node');
describe('with single daemon', function() {
    this.timeout(20000);
    let bz;
    beforeEach(async () => {
        await Daemon.stopDaemons();
        const daemon: Daemon = await Daemon.startDaemon('daemon1');
        await delay(5000);
        const auth: DaemonAuth = await daemon.getAuth();

        bz = await bluzelle({
            address: auth.address,
            mnemonic: auth.mnemonic,
            endpoint: "http://localhost:1317",
            chain_id: "integration"
        });
    });


    describe('has()', () => {
        it('should throw error if key does not exist', (done) => {
            bz.has('someKey')
                .then(() => done('has was supposed to throw'))
                .catch((e) => done())
        });

        it('should return true if key exists', async () => {
            await bz.create('someKey', 'someValue', {'gas_price': '0.01'});
            expect(await bz.has('someKey')).to.be.true
        });
    });

    describe('quickread()', () => {
        it('should immediately retrieve a value from the store', async () => {
            await bz.create('myKey', 'myvalue', {'gas_price': '0.01'});
            expect(await bz.quickread('myKey')).to.have.property('value', 'myvalue');
        });

        it('should throw an error if key does not exist', (done) => {
            bz.quickread('myKey')
                .then(() => done('quickread was supposed to throw'))
                .catch((e) => done())
        });
    });
});


