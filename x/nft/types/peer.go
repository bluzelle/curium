package types

type Peer struct {
	Id      string `json:"id,omitempty"`
	Address string `json:"address,omitempty"`
	Port    uint64 `json:"port,omitempty"`
}
