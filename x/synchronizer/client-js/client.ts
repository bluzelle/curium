import {bluzelle} from '@bluzelle/db-js'

const bz = bluzelle({
    mnemonic: '',
    uuid: 'binance-demouuid',
    endpoint: 'http://localhost:26657'
});

bz.keys()
    .then(x => x)
    .then(keys => keys[0])
    .then(key => bz.read(key))
    .then(console.log)
    .catch(console.log)