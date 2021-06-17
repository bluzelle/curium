import {passThrough, passThroughAwait} from "promise-passthrough";
import {times} from 'lodash';
import {sha256} from 'js-sha256'

typeof window === undefined && ((global as any).fetch = require('node-fetch'))


export type ChunkCallback = (chunk: number, length: number) => unknown

export interface NftHelpers {
    uploadNft: (url: string, data: Uint8Array, cb?: ChunkCallback) => Promise<UploadNftResult>
}

interface Context {
    hash?: string
    data: ArrayBuffer
    chunks: ArrayBuffer[]
    mimeType?: string
}

export interface UploadNftResult {
    hash: string
    mimeType: string
}

const splitDataIntoChunks = (data: ArrayBuffer, chunkSize = 500 * 1024): Promise<ArrayBuffer[]> =>
    Promise.all<ArrayBuffer>(
        times(Math.ceil(data.byteLength / chunkSize)).map(chunkNum =>
            new Promise(resolve => setTimeout(() =>
                resolve(data.slice(chunkSize * chunkNum, chunkSize * chunkNum + chunkSize))
            ))
        )
    )


const uploadNft = (url: string, data: Uint8Array, cb?: ChunkCallback): Promise<UploadNftResult> =>
        splitDataIntoChunks(data)
            .then(chunks => ({data, chunks} as Context))
            .then(ctx => ({...ctx, hash: sha256(ctx.data)}))
            .then(passThroughAwait(ctx =>
                Promise.all(ctx.chunks.map((chunk, chunkNum) =>
                    fetch(`${url}/nft/upload/${ctx.hash}/${chunkNum}`, {
                        method: 'POST',
                        body: chunk
                    })
                        .then(passThrough(() => cb && cb(chunkNum,  ctx.chunks.length)))
                ))
            ))
            .then(({hash, mimeType}) => ({
                hash, mimeType
            } as UploadNftResult));





export const nftHelpers = {
    uploadNft: uploadNft
};





