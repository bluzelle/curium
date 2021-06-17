export declare type ChunkCallback = (chunk: number, length: number) => unknown;
export interface NftHelpers {
    uploadNft: (url: string, data: Uint8Array, cb?: ChunkCallback) => Promise<UploadNftResult>;
}
export interface UploadNftResult {
    hash: string;
    mimeType: string;
}
export declare const nftHelpers: {
    uploadNft: (url: string, data: Uint8Array, cb?: ChunkCallback | undefined) => Promise<UploadNftResult>;
};
//# sourceMappingURL=nft-helpers.d.ts.map