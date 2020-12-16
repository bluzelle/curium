# Network REHEARSAL Instructions from `Bluzelle Soft MainNet` to `Bluzelle Final TestNet`

:warning: Please read carefully before you begin the rehearsal. Also note. It is NOT INTENDED that you replace your existing SOFT MAINNET NODE(s) with Bluzelle Final TestNet node(s). 

The intention here is to run ADDITIONAL node(s) as a REHEARSAL for the Final MainNet launch. Please be sure to keep your existing Soft MainNet node(s) running.

# Validators and optional Sentries

All coordination efforts will be done in the <Yingyao please fill in this link> channel in the Bluzelle Discord Channel.

:warning: Do not delete your `Soft MainNet` validator and sentry machine(s). You are rehearsing here for the actual Final MainNet Launch, which is to occur soon.

:warning: If your Final TestNet machines have a previous installation on them, you will need to remove those, before you continue. Please do all necessary cleanup on them to remove existing installation files, binaries, etc. It is recommended to conduct the rehearsal on a fresh machine, if possible. 

You're probably familiar with the process of setting up a Bluzelle node by now:

https://github.com/bluzelle/curium/blob/devel/public-validator-+-sentry/buildvalidatorsentry.md

Please follow the instructions for the REHEARSAL path. You will effectively be building TestNet nodes, but they will inherit the exact same state, accounts, etc as the existing Soft MainNet, as per a snapshot taken at a specific block height. The TestNet will start all over again from block 0, but its starting state will be the state inherited from the snapshot taken from the Soft MainNet. 

The REHEARSAL path is similar to the (future) UPGRADE path you will follow when you ultimately upgrade to the Final MainNet, once that is launched. The notable difference here for the REHEARSAL, is it is expected you will keep your existing Soft MainNet node(s) running. Your Soft MainNet node(s) will be upgraded when the Final MainNet is launched. 
