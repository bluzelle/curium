import {bluzelle, uploadNft} from "bluzelle";
import {sha256} from "js-sha256";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

Promise.resolve({
    bz: bluzelle({
        mnemonic: 'document found seminar giant wet surprise unhappy detail pilot waste spot duty cage bonus moon pass pool man library zero sister chimney flee river',
        endpoint: 'https://54.251.58.142:1317',
        uuid: ''
    }),
    data: new TextEncoder().encode('some nft data here - 3'),
    id: 'any-id-3'
})
    .then(ctx => ({...ctx, hash: sha256(ctx.data)}))
    .then(ctx =>
        ctx.bz.createNft({
            id: ctx.id,
            hash: ctx.hash,
            vendor: 'customer',
            userId: 'user-id',
            mime: 'text/plain',
            meta: 'meta',
            size: ctx.data.byteLength,
            gasInfo: {max_gas: 100_000_000, gas_price: 0.002}
        })
            .then(resp => ({...ctx, token: resp.token}))
    )
    .then(
        ctx => uploadNft(ctx.bz.url, ctx.data, ctx.token, 'customer')
            .then(() => ctx)
    ).then(ctx => console.log('HASH:',ctx.hash))
    .catch(e => console.log('ERROR:', e))

