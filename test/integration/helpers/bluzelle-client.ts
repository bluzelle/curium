import {bluzelle, BluzelleConfig} from "bluzelle";
import {memoize} from 'lodash'
import {GasInfo} from "bluzelle";
import {getSwarm} from "@bluzelle/testing/lib/helpers/swarmHelpers";

export const getBzClient = memoize((config: Partial<BluzelleConfig> = {}) =>
    bluzelle({
        mnemonic: "leaf yellow ride arrive garbage sniff park coral brave category resource gauge tired royal flee fall engine smooth couple hole craft unfair august suggest",
        endpoint: 'https://localhost:1327',
        uuid: 'uuid',
        ...config
    })
);

export const getSwarmAndClient = () =>
    getSwarm()
        .then(swarm => ({swarm}))
        .then(({swarm}) => swarm.getValidators()[0].getAuth().then(auth => ({swarm, auth})))
        .then(({swarm, auth}) =>
            ({
                swarm,
                auth,
                bz: bluzelle({
                    mnemonic: auth.mnemonic,
                    uuid: Date.now().toString(),
                    endpoint: `${swarm.getSwarmConfig().restProtocol}://localhost:${swarm.getSentries()[0].getRestPort()}`
                })
            })
        )

export const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 10, max_gas: 100000000, ...gasInfo})

