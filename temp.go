package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Date(
		time.Now().UTC().Year(),
		time.Now().UTC().Month(),
		time.Now().UTC().Day(),
		time.Now().UTC().Hour(),
		time.Now().UTC().Minute(),
		0,
		0,
		time.UTC,
	).UTC()
	fmt.Println(t)
	fmt.Println(time.Now().UTC())
}
