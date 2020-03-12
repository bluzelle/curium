[prev](./os.md) | [next](./build.md)
***

Development Environment Setup
=============================
1.  Curium uses Golang, in *nix, run these commands in a terminal

        wget https://dl.google.com/go/go1.14.linux-amd64.tar.gz 
        sudo tar -C /usr/local -xzf go1.14.linux-amd64.tar.gz

    on macOS install the latest package from here: https://golang.org/doc/install

2.  Make sure your Environment paths are set in your .profile file, for example, 
    add the following to the end of your .profile, .*rc file or equivalent

        export GOPATH=$HOME/go
        export GOBIN=${GOPATH}/bin
        export PATH=$PATH:$GOBIN:/usr/local/go/bin

    GOPATH is where the golang project source files, packages and binaries 
    are kept. Make sure that the Golang compiler is in the PATH

3.  Make the Golang working folders with the following commands in a terminal

        mkdir -p ~/go/src/github.com/bluzelle
        mkdir ~/go/bin
        mkdir ~/go/pkg

4.  In a terminal change directory to the the bluzelle directory

        cd ~/go/src/github.com/bluzelle

5.  Clone the Curium project from GitHub into the directory referenced above

        git clone https://github.com/bluzelle/curium.git


 
***
[prev](./os.md) | [next](./build.md)
