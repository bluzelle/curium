package keeper

import (
	"fmt"
	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/bluzelle/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/zeebo/bencode"
	"golang.org/x/time/rate"
	"strings"
	"time"
)

const PIECE_SIZE = 256
const RATE_LIMIT = 200

type TorrentClient struct {
	Id       string
	DataDir  string
	Client   *torrent.Client
	Torrents []*torrent.Torrent
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
	config.DropDuplicatePeerIds = true
	config.DropMutuallyCompletePeers = true
	config.DownloadRateLimiter = rate.NewLimiter(RATE_LIMIT* 1024 * 1024, PIECE_SIZE* 1024)
	config.UploadRateLimiter = rate.NewLimiter(RATE_LIMIT* 1024 * 1024, PIECE_SIZE* 1024)
	cl, err := torrent.NewClient(config)
	if err != nil {
		return nil, err
	}

	tc := TorrentClient{
		DataDir: dataDir,
		Client:  cl,
	}
	return &tc, nil
}

func (tc *TorrentClient) RetrieveFile(ctx sdk.Context, k Keeper,  metaInfo *metainfo.MetaInfo) {
	tor, _ := tc.Client.AddTorrent(metaInfo)
	tc.Torrents = append(tc.Torrents, tor)
	tor.AddPeers(getTcPeers(ctx, k))
	go func() {
		<-tor.GotInfo()
		tor.DownloadAll()
	}()
}

func getTcPeers(ctx sdk.Context, k Keeper) []torrent.PeerInfo {
	nftPeers := k.GetPeers(ctx)
	var tcPeers []torrent.PeerInfo
	for _, p := range(nftPeers) {
		tcPeers = append(tcPeers, nftPeerToTCPeer(p))
	}
	return tcPeers
}

func (tc TorrentClient) TorrentFromFile(filePath string) (*metainfo.MetaInfo, error) {
	private := true
	info := metainfo.Info{
		PieceLength: PIECE_SIZE * 1024,
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
	return meta, nil
}

func (tc *TorrentClient) SeedFile(meta *metainfo.MetaInfo) error {
	tor, _ := tc.Client.AddTorrent(meta)
	tc.Torrents = append(tc.Torrents, tor)
	return nil
}

func nftPeerToTCPeer(peer types.Peer) torrent.PeerInfo {
	b := &strings.Builder{}
	b.WriteString(fmt.Sprintf("%s:%d", peer.Address, peer.Port))

	var arr [20]byte
	copy(arr[:], peer.Id)
	return torrent.PeerInfo{
		Id:                 arr,
		Addr:               b,
		Source:             torrent.PeerSourceDirect,
		SupportsEncryption: true,
		PexPeerFlags:       0,
		Trusted:            true,
	}

}
