import {bluzelle} from "@bluzelle/sdk-js";
import {readFile} from "fs/promises";
import {localChain} from '../../ts/test/config'
import fetch from 'node-fetch'

bluzelle({
    mnemonic:  localChain.mnemonic,
    url: localChain.endpoint,
    gasPrice: 0.002,
    maxGas: 100000000
})
    .then(bz =>
        readFile("./test.tiff")
             .then(data => bz.helpers.nft.uploadNft({
                 mime: 'image/tiff',
                 meta: JSON.stringify({myMeta: 'something'})
             }, data))
             .then(({id}) => console.log('tiff id:', id))

            // .then(() => readFile('/Users/scott/Desktop/temp.mp4'))
            // .then(data => bz.helpers.nft.uploadNft({
            //     mime: 'video/mp4',
            //     meta: ''
            // }, data, (chunk, size) => console.log(chunk, size)))
            // .then(({id}) => console.log('video id:', id))
    )



