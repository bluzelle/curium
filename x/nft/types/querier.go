package types

type QueryResultGetNft struct {
	Nft  *Nft `json:"Nft,omitempty"`
}

type QueryCheckUploadCompleteReq struct {
	Hash string `json:"hash"`
	Size uint64 `json:"size"`
}

