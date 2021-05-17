package main

import (
	"github.com/bluzelle/curium/x/torrentClient"
	"log"
	"time"
)

var seederPort = 7754

func main() {

	seeder, err := torrentClient.NewTorrentClient("/Users/scott/temp/torrents", seederPort)
	if err != nil {
		panic(err)
	}

	meta, err := seeder.TorrentFromFile("PXL_20210319_171016803.jpg")
	if err != nil {
		panic(err)
	}
	err = seeder.SeedFile(meta)
	if err != nil {
		panic(err)
	}

	leacher, err := torrentClient.NewTorrentClient("/Users/scott/temp/leach", seederPort-1)
	if err != nil {
		panic(err)
	}

	leacher.AddPeer("127.0.0.1", seederPort)
	leacher.RetrieveFile(meta)
	// Watch the progress
	for range time.Tick(time.Second) {
		torrents := seeder.Torrents
		for _, torrent := range torrents {
			log.Printf("Seeder - Status: %s, Complete: %d, Missing: %d, Peers: %d, Seed: %t", torrent.Name(), torrent.BytesCompleted(), torrent.BytesMissing(), torrent.Stats().TotalPeers, torrent.Seeding())
		}

		torrents = leacher.Torrents
		for _, torrent := range torrents {
			log.Printf("Leacher - Status: %s, Complete: %d, Missing: %d, Peers: %d, Seed: %t", torrent.Name(), torrent.BytesCompleted(), torrent.BytesMissing(), torrent.Stats().TotalPeers, torrent.Seeding())
		}

	}

}
