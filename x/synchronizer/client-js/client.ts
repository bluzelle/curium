import {bluzelle} from 'bluzelle'

const bz = bluzelle({
    mnemonic: 'firstuuid',
    uuid: 'binance-firstuuid',
    endpoint: 'http://localhost:26657'
});

bz.keys()
    .then(x => x)
    .then(keys => keys[0])
    .then(key => bz.read(key))
    .then(console.log)
    .catch(console.log)