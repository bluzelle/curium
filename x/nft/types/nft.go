package types

type Nft struct {
	Creator string
	Id   string
	Vendor string
	UserId string
	Hash string
	Mime string
	Meta string
	Size uint64
}

type NftInfo struct {
	Id string
	Vendor string
	UserId string
	Mime string
	Size uint64
}
