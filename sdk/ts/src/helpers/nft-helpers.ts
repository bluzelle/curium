import {MsgCreateNft, MsgCreateNftResponse} from "../codec/nft/tx";
import {BluzelleSdk, NftSdk} from "../bz-sdk/bz-sdk";
import {passThroughAwait} from "promise-passthrough";
import {chunk} from 'lodash'
import {createHash} from "crypto";

export type UploadNFTParams = Omit<MsgCreateNft, "creator" | "id">
export type ChunkCallback = (chunk: number, length: number) => unknown

export interface NftHelpers {
    uploadNft: (params: UploadNFTParams, data: Uint8Array, cb?: ChunkCallback) => Promise<MsgCreateNftResponse>
}

export const nftHelpers = (sdk: NftSdk) => ({
    uploadNft: uploadNft(sdk)
})

const uploadNft = (nft: NftSdk) => (params: UploadNFTParams, data: Uint8Array): Promise<MsgCreateNftResponse> => {
    const hash = createHash("sha256")
        .update("my-nft")
        .digest("hex")
    return fetch(`${nft.url.replace('26657', '1317')}/nft/upload/${hash}`, {
        method: 'POST',
        body: data,
        mode: 'cors'
    })
        .then(() => nft.tx.CreateNft({
            id: hash,
            creator: nft.address,
            ...params
        }))
};







