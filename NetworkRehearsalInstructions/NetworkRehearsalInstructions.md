# Network REHEARSAL Instructions from `Bluzelle Soft MainNet` to `Bluzelle Final TestNet`

:warning: Please read carefully before you begin the rehearsal. Also note. It is NOT INTENDED that you replace your existing SOFT MAINNET NODE(s) with Bluzelle Final TestNet node(s). 

The intention here is to run NEW node(s) as a REHEARSAL for the Final MainNet launch. Ideally, you run these new nodes in the same architectural configuration as on the Soft MainNet (ie: same # of sentries, etc). Please be sure to keep your existing Soft MainNet node(s) running.

All coordination efforts will be done in the [Discord server](https://discord.gg/KRhcKE6qS6).

:warning: Do not delete your `Soft MainNet` validator and sentry machine(s). You are rehearsing here for the actual Final MainNet Launch, which is to occur soon.

:warning: If your Final TestNet machines have a previous installation on them, you will need to remove those, before you continue. Please do all necessary cleanup on them to remove existing installation files, binaries, etc. It is recommended to conduct the rehearsal on a fresh machine, if possible. 

As part of the process of forking the old network over to the new TestNet, we **pre-jail** all validators. This means that your validator, while already existing in the new TestNet, is in a jailed state. You have NOT been slashed. The validator is effectively "frozen", safe from being slashed as it is not yet running. 
    
You typically have 21 days from the start of the new network to unjail your validator. After this time, your validator will unbond and all delegators (including your operator account) will get back their delegated tokens and the validator will cease to exist. You can determine the number of days of unbonding for the network with the following (assumes you already have a running network after following the steps below):
    
    ```
    blzcli q staking params | jq '.unbonding_time = (.unbonding_time | tonumber)/1000000000/3600/24' | jq '.unbonding_time'
    ```

You're probably familiar with the process of setting up a Bluzelle node by now:

https://github.com/bluzelle/curium/blob/devel/public-validator-+-sentry/buildvalidatorsentry.md

**Please follow the instructions for the REHEARSAL path**. You will effectively be building TestNet nodes, but they will inherit the exact same state, accounts, etc as the existing Soft MainNet, as per a snapshot taken at a specific block height. Your new validator will in fact use the exact same consensus private key to sign blocks, as the old validator on the Soft MainNet. The TestNet will start all over again from block 0, but its starting state will be the state inherited from the snapshot taken from the Soft MainNet. When in doubt, follow the instructions pertaining to **TestNet**.

The REHEARSAL path is similar to the (future) UPGRADE path you will follow when you ultimately upgrade to the Final MainNet, once that is launched. The notable difference here for the REHEARSAL, is it is expected you will keep your existing Soft MainNet node(s) running. Your Soft MainNet node(s) will be upgraded when the Final MainNet is launched. 
