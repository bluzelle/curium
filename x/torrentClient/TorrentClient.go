package torrentClient

import (
	"fmt"
	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/zeebo/bencode"
	"strings"
	"time"
)

type TorrentClient struct {
	Id       string
	DataDir  string
	Client   *torrent.Client
	Torrents []*torrent.Torrent
	Peers    []torrent.PeerInfo
}

func NewTorrentClient(dataDir string, port int) (*TorrentClient, error) {
	config := torrent.NewDefaultClientConfig()
	config.DataDir = dataDir
	config.Debug = true
	config.NoDHT = true
	config.DisablePEX = true
	config.ListenPort = port
	config.DisableIPv6 = true
	config.Seed = true

	cl, err := torrent.NewClient(config)
	if err != nil {
		return nil, err
	}

	tc := TorrentClient{
		DataDir: dataDir,
		Client:  cl,
		Peers: []torrent.PeerInfo{},
	}
	return &tc, nil
}

func (tc *TorrentClient) RetrieveFile(metaInfo *metainfo.MetaInfo) {
	tor, _ := tc.Client.AddTorrent(metaInfo)
	tc.Torrents = append(tc.Torrents, tor)
	tor.AddPeers(tc.Peers)
	go func() {
		<-tor.GotInfo()
		tor.DownloadAll()
	}()
}

func (tc *TorrentClient) SeedFile(filePath string) (*metainfo.MetaInfo, error) {
	private := true
	info := metainfo.Info{
		PieceLength: 32 * 1024,
		Private:     &private,
		Source:      "Bluzelle NFT",
	}

	info.BuildFromFilePath(tc.DataDir + "/" + filePath)
	infoBytes, err := bencode.EncodeBytes(info)
	if err != nil {
		return nil, err
	}
	meta := &metainfo.MetaInfo{
		InfoBytes:    infoBytes,
		Announce:     "",
		AnnounceList: nil,
		Nodes:        nil,
		CreationDate: time.Now().Unix(),
		Comment:      "",
		CreatedBy:    "",
		Encoding:     "utf-8",
		UrlList:      nil,
	}

	tor, _ := tc.Client.AddTorrent(meta)
	tc.Torrents = append(tc.Torrents, tor)
	tor.AddPeers(tc.Peers)
	return meta, nil
}

func (tc *TorrentClient) AddPeer(ip string, port int) {
	b := &strings.Builder{}
	b.WriteString(fmt.Sprintf("%s:%d", ip, port))

	peerInfo := torrent.PeerInfo{
		Id:                 [20]byte{},
		Addr:               b,
		Source:             torrent.PeerSourceDirect,
		SupportsEncryption: true,
		PexPeerFlags:       0,
		Trusted:            true,
	}

	tc.Peers = append(tc.Peers, peerInfo)
}
