# OS Setup for Curium

[prev](../) \| [next](devenv.md)

## OS Setup for Curium

### Linux:

1. Install Ubuntu, open incoming tcp ports 26656, 26657, and 1317. These are the ports that the daemon and http servers will use. This will vary depending on your setup. If you are setting up a validator+sentry configuration, the validator will typically only open up 26656. Sentries will open all three. If you are setting up a validator but want to have access to your RPC (26657) and REST (1317) services from outside, open these up according to your specific needs. Note that opening up these services may subject your server to more vectors for DoS/DDoS attack, something that is beyond the scope of this document and left to you. 
2. Ensure that APT has the latest software packages:

   ```text
   sudo apt-get update
   ```

   so that when we use apt to install the tools we need we will get the most recent versions.

3. Install the build-essential tools and jq for easy JSON parsing and pretty printing (you might have to use apt instead of apt-get, if the latter fails. If so, do the update with apt as well).

   ```text
   sudo apt-get install build-essential jq
   ```

4. Verify and increase your open file limits.

   Use the following commands to check your hard and soft limits:

   ```text
   ulimit -Hn 
   ulimit -Sn
   ```
   
   Without going into great depth \(please do your own research\), the soft limit is capped at the hard limit.

   To change your limits, edit the following file:

   ```text
   /etc/security/limits.conf
   ```

   For the example user "neeraj", add the following lines to set the hard and soft limits:

   ```text
   neeraj hard nofile 1048576
   neeraj soft nofile 65536
   ```

   We leave it to you to determine which values to use here, or even if you want to bother re-setting your open file limits. We have found that on machines where there is not much activity/traffic, the defaults often work. Mileage varies.

   Do note that you must logout and log back as the user, for these changes to apply to your session.

### macOS:

1. We use homebrew \([https://brew.sh/](https://brew.sh/)\) to install dependancies, ensure that brew is installed and updated.
2. Install jq \([https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)\) to help process the json output of the Curium client, use brew to install

   ```text
   brew install jq
   ```

   jq will be used to pretty print or parse the json output from blzd and blzcli.

3. Check your OS's open file limits. We leave this as an exercise to the user. On Linux, having too-low a limit can cause the daemon to crash if it has too many files and/or network connections opne.

[prev](../) \| [next](devenv.md)

