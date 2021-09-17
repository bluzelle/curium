# Development Environment Setup

[prev](os.md) \| [next](build.md)

## Development Environment Setup

1. Curium uses Golang, in \*nix, run these commands in a terminal

   ```text
   wget https://golang.org/dl/go1.15.6.linux-amd64.tar.gz 
   sudo tar -C /usr/local -xzf go1.15.6.linux-amd64.tar.gz
   ```

   on macOS install the latest package from here: [https://golang.org/doc/install](https://golang.org/doc/install)

2. Make sure your Environment paths are set in your .profile file, for example, add the following to the end of your .profile, .\*rc file or equivalent

   ```text
   export GOPATH=$HOME/go
   export GOBIN=${GOPATH}/bin
   export PATH=$PATH:$GOBIN:/usr/local/go/bin
   ```

   GOPATH is where the golang project source files, packages and binaries are kept. Make sure that the Golang compiler folder _and_ the GOBIN are in the PATH.

   BE SURE to source the file that you added these paths to. For example, if it was to your ".profile" file, do the following:

   ```text
   source ~/.profile
   ```

3. Make the Golang working folders with the following commands in a terminal

   ```text
   mkdir -p ~/go/src/github.com/bluzelle
   mkdir ~/go/bin
   mkdir ~/go/pkg
   ```

4. In a terminal change directory to the the bluzelle directory

   ```text
   cd ~/go/src/github.com/bluzelle
   ```

5. Clone the Curium project from GitHub into the directory referenced above

   ```text
   git clone https://github.com/bluzelle/curium.git
   ```

6. Create an nft directory in your home directory

   ```text
   mkdir ~/nft
   ```

   CRITICAL: The "nft-base-dir" is where NFT files from the new Bluzelle NFT service will get stored to. It is vital that the volume this folder is in, be monitored and that it not fill up. NFT files can quickly overwhelm a small volume. If that volume happens to be the same one used by the blzd daemon, it can cause your node to crash completely, when full. In the case of a validator, your node could come down, and get slashed. It is recommended to keep this as a separate volume on a larger, monitored drive.

[prev](os.md) \| [next](build.md)

