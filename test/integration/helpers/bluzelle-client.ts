import {bluzelle, BluzelleConfig} from "bluzelle";
import {memoize, times} from 'lodash'
import {GasInfo} from "bluzelle";
import {getSwarm} from "@bluzelle/testing/lib/helpers/swarmHelpers";
import {SwarmConfig} from "daemon-manager/lib/SwarmConfig";
import {entropyToMnemonic} from "bip39";
import {Some} from "monet";
import {passThrough} from "promise-passthrough";

export const getBzClient = memoize((config: Partial<BluzelleConfig> = {}) =>
    bluzelle({
        mnemonic: "vivid rack volume school expect tobacco hello paddle annual tobacco choice evoke consider fluid attract bind error setup depth wedding night shove note jazz",
        endpoint: 'https://localhost:1327',
        uuid: 'uuid',
        ...config
    })
);

export const getSwarmAndClient = () =>
    getSwarm([withTestUsers])
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

function withTestUsers (config: SwarmConfig): SwarmConfig {
    return Some({
        ...config,
        additionalUsers: times(4).map(n =>({
            name: `test-${n}`,
            mnemonic: entropyToMnemonic((n + 1).toString().repeat(30) + 'aa')
        }))
    } as SwarmConfig)
        .map(passThrough((config: SwarmConfig) => console.log("******** test users ******\n", config.additionalUsers)))
        .join()
}