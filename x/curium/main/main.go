package main

import (
	"fmt"
	"github.com/bluzelle/curium/x/curium"
)

func main() {
	x, err := curium.GetNetInfo()
	fmt.Println(x, err)
}