import {getBzClient} from "./oracle/bluzelle-client";
import {times} from 'lodash'

describe('temp', () => {
    it('should create a bunch of transactions', () => {
        return Promise.all(times(200, idx => {
                const bz = getBzClient({mnemonic: getBzClient().generateBIP39Account()})
                console.log('===========', idx);
                return getBzClient().transferTokensTo(bz.address, 10, {gas_price: 0.002, max_gas: 100000})
                    .then(() =>
                        bz.create(`foo-${Date.now()}-${idx}`, 'testing', {gas_price: 0.002, max_gas: 10000000})
                    )
                    .then(console.log)
            }
        ))
    });
    it('should send to the /txs endpoint', () => {
        return fetch('http://localhost:1317/txs?page=1&limit=100&tx.minheight=1&tx.maxheight=5000000')
            .then(x => x.json())
            .then(x => x);

    })
});