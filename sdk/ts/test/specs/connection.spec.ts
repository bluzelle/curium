import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {APIAndSwarm, defaultLease, getBluzelleClient, sentryWithClient} from "../helpers/client-helpers/client-helpers";
import {times} from 'lodash'
import {bluzelle} from '../../src/legacyAdapter/bluzelle-node'
import {expect} from 'chai'

describe('connections tests', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: APIAndSwarm;

    beforeEach(async () => {
        useChaiAsPromised();
        bz = await sentryWithClient();

    });

    it('should throw an error if incorrect mnemonic is entered', () => {
        const bz2 = bluzelle({
            mnemonic: 'steel vast chimney city hurt planet trend bread onion high school dream rookie lemon breeze rich praise hero position favorite panel pizza assume enroll',
            endpoint: bz.url,
            uuid: bz.uuid
        });

        return expect(bz2.create('key', 'value', defaultLease())).to.be.rejectedWith(/Invalid account/);

    });

    it.skip('should allow for a large number of simultaneous connections', async function () {
        const CLIENT_COUNT = 5;
        const COUNT_KEYS = 5;

        getBluzelleClient() === 'node' || this.skip();
        // TODO: This test does not work in browser or other proxies since generateBIP39Account is not async
        // and it gets node clients in the loop starting 'bluzelle()' anyway

        console.log('Creating clients');
        const clients = times(CLIENT_COUNT, (n: number) => bluzelle({
            mnemonic: bz.generateBIP39Account(),
            uuid: Date.now().toString(),
            endpoint: bz.url
        }));

        console.log('Funding clients');
        await bz.withTransaction(() => clients.forEach(client =>
            bz.transferTokensTo(client.address, COUNT_KEYS * 5, defaultLease({max_gas: 20000000}))
        ));

        console.log('creating keys');
        await Promise.all(clients.map(client =>
                client.withTransaction(() =>
                    times(COUNT_KEYS, (n: number) =>
                        client.create(`my-key-${n}`, 'foo', defaultLease())
                    ))
            )
        );

        console.log('verifying keys');
        await Promise.all(clients.map(client =>
                client.withTransaction(() =>
                    times(COUNT_KEYS, (n: number) =>
                        client.txRead(`my-key-${n}`, defaultLease())
                            .then((res: any) => expect(res.value).to.equal('foo'))
                    ))
            )
        )
    });

    it('should correct for misequencing', () => {
        const bz2 = bluzelle({
            mnemonic: bz.mnemonic,
            endpoint: bz.url,
            uuid: bz.uuid
        })

        return bz.create('aven', 'dauz', defaultLease())
            .then(() => bz2.create('scott', 'burch', defaultLease()))
            .then(() => bz.create('neeraj', 'murarka', defaultLease()))
            .then(() => Promise.all([
                bz.read('aven'),
                bz.read('scott'),
                bz.read('neeraj')
            ]))
            .then(values => expect(values).to.deep.equal(['dauz', 'burch', 'murarka']))
    });

    it('should correct for misequencing copy', () => {
        const bz2 = bluzelle({
            mnemonic: bz.mnemonic,
            endpoint: bz.url,
            uuid: bz.uuid
        })

        return bz.create('aven', 'dauz', defaultLease())
            .then(() => bz2.create('scott', 'burch', defaultLease()))
            .then(() => bz.create('neeraj', 'murarka', defaultLease()))
            .then(() => bz.create('matthew', 'ilagan', defaultLease()))
            .then(() => Promise.all([
                bz.read('aven'),
                bz.read('scott'),
                bz.read('neeraj'),
                bz.read('matthew')
            ]))
            .then(values => expect(values).to.deep.equal(['dauz', 'burch', 'murarka', 'ilagan']))
    });

    it('should do corrections properly', () => {
        const bz2 = bluzelle({
            mnemonic: bz.mnemonic,
            endpoint: bz.url,
            uuid: bz.uuid
        });

        return bz.create('aven', 'dauz', defaultLease())
            .then(() => bz2.create('jacob', 'creskoff', defaultLease()))
            .then(() => bz2.create('addy', 'parsons', defaultLease()))
            .then(() => bz.create('ali', 'savas', defaultLease()))

            .then(() => Promise.all([
                bz.read('aven'),
                bz.read('jacob'),
                bz.read('addy'),
                bz.read('ali')
            ]))
            .then(values => expect(values).to.deep.equal(['dauz', 'creskoff', 'parsons', 'savas']))
    });

    it('should correct sequencing when using withTransaction()', () => {
        const bz2 = bluzelle({
            mnemonic: bz.mnemonic,
            endpoint: bz.url,
            uuid: bz.uuid
        });

        return bz.withTransaction(() => {
            bz.create('aven', 'dauz', defaultLease()),
                bz.delete('aven', defaultLease())
        })
            .then(() => bz2.create('neeraj', 'murarka', defaultLease()))
            .then(() => bz.create('scott', 'burch', defaultLease()))
            .then(() => Promise.all([
                bz.read('neeraj'),
                bz.read('scott')
            ]))
            .then(values => expect(values).to.deep.equal(['murarka', 'burch']))
    });

    it.skip('should correct sequencing while using withTransaction() and additional crud', () => {
        const bz2 = bluzelle({
            mnemonic: bz.mnemonic,
            endpoint: bz.url,
            uuid: bz.uuid
        });

        return bz.withTransaction(() => {
            bz.create('aven', 'dauz', defaultLease()),
                bz2.create('neeraj', 'murarka', defaultLease()),
                bz.create('scott', 'burch', defaultLease())
        })
            .then(() => bz2.delete('scott', defaultLease()))
            .then(() => bz.delete('aven', defaultLease()))
            .then(() => bz.read('aven'))
            .then(() => expect(1).to.equal(2))
            .catch(e => expect(/unknown request: key not found/.test(e.error)))
            .then(async () => expect(await bz.read('neeraj')).to.equal('murarka'))
    });


})