[prev](../../README.md) | [next](./devenv.md)
***

OS Setup for Curium
===================

Linux:
-----
1.  Install Ubuntu, open incoming tcp ports 26656 and 1317, these are the ports 
    that the daemon and http servers will use.

2.  Ensure that APT has the latest software packages:
   
        sudo apt-get update
   
    so that when we use apt to install the tools we need we will get the most 
    recent versions.

3.  Install the build-essential tools and jq for easy JSON parsing and pretty 
    printing

        sudo apt-get install build-essential jq
 

macOS:
------
1.  We use homebrew (https://brew.sh/) to install dependancies, ensure that 
    brew is installed and updated.

2.  Install jq (https://stedolan.github.io/jq/) to help process the json output 
    of the Curium client, use brew to install

        brew install jq

    jq will be used to pretty print or parse the json output from blzd and blzcli.
    

***
[prev](../../README.md) | [next](./devenv.md)