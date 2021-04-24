import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {createKeys, sentryWithClient, defaultGasParams} from "../helpers/client-helpers/client-helpers";
import {API} from '../../src/legacyAdapter/API'
import {expect} from 'chai'
import {useChaiAsPromised} from "testing/lib/globalHelpers";


describe('transactions', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        useChaiAsPromised();
        bz = await sentryWithClient();
    });

    it('should put a single message in a transaction by default', async () => {
        const results = await Promise.all([
            bz.create('foo', 'bar', defaultGasParams()),
            bz.create('foo2', 'bar', defaultGasParams())
        ]);
        expect(results[0].txhash).not.to.equal(results[1].txhash);
    });

    it('should recover if a transaction fails', async () => {
        await Promise.all([
            bz.create('foo1', 'bar1', defaultGasParams()),
            bz.create('foo2', 'bar2', defaultGasParams()),
            bz.create('foo3', 'bar3', defaultGasParams()),
        ]);

        const results = await Promise.all([
            bz.txRead('foo1', defaultGasParams()),
            bz.txRead('foo2', defaultGasParams()),
            bz.create('foo1', 'bar', defaultGasParams())
                .catch(e => ({value: 'error'})),
            bz.txRead('foo3', defaultGasParams())
        ]);

        expect(results.map(it => (it as any)?.value)).to.deep.equal(['bar1', 'bar2', 'error', 'bar3'])

    });

    describe('withTransaction()', () => {

        it('it will operate transactionally', async () => {
            try {
                await bz.withTransaction(() => {
                    bz.create('foo', 'bar', defaultGasParams());
                    bz.txRead('xxx', defaultGasParams());
                })
            } catch (e) {
            }
            await expect(bz.read('foo')).to.be.rejectedWith(/key not found/);
        });

        it('should preserve message and message response order', async () => {
            await bz.create('first', 'transaction', defaultGasParams());
            await bz.withTransaction(() => {
                    bz.create('foo', 'bar', defaultGasParams());
                    bz.txRead('first', defaultGasParams());
                })
                .then(x => x)

        })

        it('should throw an error if withTransaction() is nested', async () => {
            let error;
            try {
                await bz.withTransaction(() => {
                    bz.withTransaction(() => {
                    });
                })
            } catch (e) {
                error = e
            }
            expect(error).to.match(/can not be nested/)
        })

        it('should handle a large number of messages in a transaction', async () => {
            const COUNT = 1000;
            const {keys, values} = await createKeys(bz, COUNT)
            await bz.withTransaction(() =>
                keys.forEach(key => bz.txRead(key, defaultGasParams()))
            )
                .then(response => response.data.map((it: any) => it.value))
                .then(vs => expect(vs).to.deep.equal(values))
        });

        it('should attach memo to transaction', () =>
            bz.withTransaction(() =>
                    bz.create('aven', 'dauz', defaultGasParams())
                , {memo: 'foo'})
                .then(response => response.txhash)
                .then(hash => bz.getTx(hash))
                .then(transaction => transaction.tx.value.memo)
                .then(memo => expect(memo).to.equal('foo'))
        );

        it('')
    });
});