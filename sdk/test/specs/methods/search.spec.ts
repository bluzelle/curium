import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API'
import {expect} from 'chai'
import {times} from 'lodash'

describe('keyValues()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should allow for a blank prefix', async () => {
        await Promise.all(times(6, n => bz.create(n.toString(), 'foo', defaultGasParams())));
        await bz.search('', {limit: 3})
            .then(x => x.map(it => it.key))
            .then(x => expect(x).to.deep.equal(['0','1','2']))
    });

    it('should return a list of keyvalues by default', async () => {
        await bz.withTransaction(() => {
            bz.create('foo1', 'foo', defaultGasParams());
            bz.create('foo2', 'foo', defaultGasParams());
            bz.create('foo3', 'foo', defaultGasParams());
        })
            .then(async () =>
                expect(await bz.search('foo')).to.deep.equal([
                    {
                        "key": "foo1",
                        "value": "foo"
                    },
                    {
                        "key": "foo2",
                        "value": "foo"
                    },
                    {
                        "key": "foo3",
                        "value": "foo"
                    }
                ]))
    });

    it('should find only keys that match the search text', async () => {
        await bz.withTransaction(() => {
            bz.create('afoo1', 'foo', defaultGasParams());
            bz.create('foo2', 'foo', defaultGasParams());
            bz.create('foo3', 'foo', defaultGasParams());
            bz.create('bfoo1', 'foo', defaultGasParams());
        })
            .then(async () => expect(await bz.search('foo')).to.deep.equal([
                {
                    "key": "foo2",
                    "value": "foo"
                },
                {
                    "key": "foo3",
                    "value": "foo"
                }
            ]))
    });

    it('should page results', async () => {
        await bz.withTransaction(() => {
            bz.create('foo1', 'foo', defaultGasParams());
            bz.create('foo2', 'foo', defaultGasParams());
            bz.create('foo3', 'foo', defaultGasParams());
        })

            .then(async () => expect(await bz.search('foo', {page: 1, limit: 2})).to.deep.equal([
                {
                    "key": "foo1",
                    "value": "foo"
                },
                {
                    "key": "foo2",
                    "value": "foo"
                }
            ]))

            .then(async () => expect(await bz.search('foo', {page: 2, limit: 2})).to.deep.equal([
                {
                    "key": "foo3",
                    "value": "foo"
                }
            ]))
    });

    it('should return an empty result if no more pages', async () => {
        await bz.withTransaction(() => {
            bz.create('foo1', 'foo', defaultGasParams());
            bz.create('foo2', 'foo', defaultGasParams());
            bz.create('foo3', 'foo', defaultGasParams());
        })

            .then(async () => expect(await bz.search('foo', {page: 3, limit: 2})).to.have.length(0))
    });

    it('should reverse results if reverse set to true', async () => {
        await bz.withTransaction(() => {
            bz.create('foo1', 'foo', defaultGasParams());
            bz.create('foo2', 'foo', defaultGasParams());
            bz.create('foo3', 'foo', defaultGasParams());
        })

            .then(async () => expect(await bz.search('foo', {reverse: true})).to.deep.equal([
                {
                    "key": "foo3",
                    "value": "foo"
                },
                {
                    "key": "foo2",
                    "value": "foo"
                },
                {
                    "key": "foo1",
                    "value": "foo"
                }
            ]))
    });

    it('should reverse results even when paging', async () => {
        await bz.withTransaction(() => {
            bz.create('foo1', 'foo', defaultGasParams());
            bz.create('foo2', 'foo', defaultGasParams());
            bz.create('foo3', 'foo', defaultGasParams());
        })

            .then(async () => expect(await bz.search('foo', {reverse: true, page: 1, limit: 2})).to.deep.equal([
                {
                    "key": "foo3",
                    "value": "foo"
                },
                {
                    "key": "foo2",
                    "value": "foo"
                }
            ]))
    });
});