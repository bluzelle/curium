[prev](../../README.md) | [next](./devenv.md)
***

OS Setup for Curium
===================

Linux:
-----
Install Ubuntu, open incoming tcp ports 26656 and 1317, these are the ports that the daemon and http servers will use.

Install the build-essential tools and jq for easy JSON parsing

`$ sudo apt-get install build-essential jq`
 

macOS:
------
We use homebrew (https://brew.sh/) to install dependancies, ensure that brew is installed and updated.


Install jq (https://stedolan.github.io/jq/) to help process the json output of the Curium client, use brew to install

`$ brew install jq`

we’ll use jq to parse blzd and blzcli output on the command line

***
[prev](../../README.md) | [next](./devenv.md)