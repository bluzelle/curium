# Mainnet Upgrade Instructions: from `Bluzelle Soft MainNet` to `Bluzelle Production Mainnet`

Dear validators, you can now join the Bluzelle Production Mainnet by following [this guide](public-validator-+-sentry/buildvalidatorsentry.md)

**Please follow the instructions for the REHEARSAL path**. You will effectively be building new Mainnet nodes, but they will inherit the exact same state, accounts, etc as the existing Soft MainNet, as per a snapshot taken at a specific block height. Your new validator will in fact use the exact same consensus private key to sign blocks, as the old validator on the Soft MainNet. The new Mainnet will start all over again from block 0, but its starting state will be the state inherited from the snapshot taken from the Soft MainNet.

:warning: Please complete the process as soon as possible. Please read carefully before you begin the fork from the Bluzelle Soft Mainnet.

:warning: Just in case a revert could happen, please DO NOT delete your `Soft MainNet` validator and sentry machine(s) before you are instructed to do so. We expect the `Soft Mainnet` to be taken down on 4th February (tentatively).

:warning: As part of the process of forking the old network over to the new one, we **pre-jail** all validators. This means that your validator, while already existing in the new network, is in a jailed state. You have NOT been slashed. The validator is effectively "frozen", safe from being slashed as it is not yet running. However, you should still join soon because unbonding has started. If you wait too long, you will risk losing all your delegations.

:warning: If your Production Mainnet machines have a previous installation on them, you will need to remove those, before you continue. Please do all necessary cleanup on them to remove existing installation files, binaries, etc. It is recommended to conduct the rehearsal on a fresh machine, if possible.

Please watch out for any communications on our [Discord server](https://discord.gg/KRhcKE6qS6).