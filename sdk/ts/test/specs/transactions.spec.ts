import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {createKeys, sentryWithClient, defaultLease} from "../helpers/client-helpers/client-helpers";
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
            bz.create('foo', 'bar', defaultLease),
            bz.create('foo2', 'bar', defaultLease)
        ]);
        expect(results[0].txhash).not.to.equal(results[1].txhash);
    });

    it('should recover if a transaction fails', async () => {
        await Promise.all([
            bz.create('foo1', 'bar1', defaultLease),
            bz.create('foo2', 'bar2', defaultLease),
            bz.create('foo3', 'bar3', defaultLease),
        ]);

        const results = await Promise.all([
            bz.txRead('foo1', defaultLease()),
            bz.txRead('foo2', defaultLease()),
            bz.create('foo1', 'bar', defaultLease())
                .catch(e => ({value: 'error'})),
            bz.txRead('foo3', defaultLease())
        ]);

        expect(results.map(it => (it as any)?.value)).to.deep.equal(['bar1', 'bar2', 'error', 'bar3'])

    });

    describe('withTransaction()', () => {

        it('it will operate transactionally', async () => {
            try {
                await bz.withTransaction(() => {
                    bz.create('foo', 'bar', defaultLease());
                    bz.txRead('xxx', defaultLease());
                })
            } catch (e) {
            }
            await expect(bz.read('foo')).to.be.rejectedWith(/key not found/);
        });

        it('should preserve message and message response order', async () => {
            await bz.create('first', 'transaction', defaultLease());
            await bz.withTransaction(() => {
                    bz.create('foo', 'bar', defaultLease());
                    bz.txRead('first', defaultLease());
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
                keys.forEach(key => bz.txRead(key, defaultLease()))
            )
                .then(response => response.data.map((it: any) => it.value))
                .then(vs => expect(vs).to.deep.equal(values))
        });

        it('should attach memo to transaction', () =>
            bz.withTransaction(() =>
                    bz.create('aven', 'dauz', defaultLease())
                , {memo: 'foo'})
                .then(response => response.txhash)
                .then(hash => bz.getTx(hash))
                .then(transaction => transaction.tx.value.memo)
                .then(memo => expect(memo).to.equal('foo'))
        );

        it('')
    });
});