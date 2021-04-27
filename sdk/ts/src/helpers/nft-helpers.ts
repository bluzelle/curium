import {MsgCreateNft, MsgCreateNftResponse} from "../codec/nft/tx";
import {BluzelleSdk, NftSdk} from "../bz-sdk/bz-sdk";
import {passThroughAwait} from "promise-passthrough";
import {chunk} from 'lodash'

export type UploadNFTParams = Omit<MsgCreateNft, "creator">
export type ChunkCallback = (chunk: number, length: number) => unknown

export interface NftHelpers {
    uploadNft: (params: UploadNFTParams, data: Uint8Array, cb?: ChunkCallback) => Promise<MsgCreateNftResponse>
}

export const nftHelpers = (sdk: NftSdk) => ({
    uploadNft: uploadNft(sdk)
})

const uploadNft = (nft: NftSdk) => (params: UploadNFTParams, data: Uint8Array, cb?: ChunkCallback) => {
    return nft.tx.CreateNft({
        creator: nft.address,
        ...params
    })
        .then(passThroughAwait(({id}) =>
            Promise.all(chunk(data, 500000).map((chunk, idx) => {
                    return nft.tx.Chunk({
                        creator: nft.address,
                        id,
                        chunk: idx,
                        data: new Uint8Array(chunk)
                    })
                        .then(() => cb && cb(idx, chunk.length))
                }
            ))

        ))
};







