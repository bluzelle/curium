import {Daemon, DaemonAuth} from "curium-control/daemon-manager/lib/Daemon";
import {Swarm} from "curium-control/daemon-manager/lib/Swarm";
import {bluzelle} from "../../../src/legacyAdapter/bluzelle-node";
import {bluzelle as bluzelleJS} from '../../../src/legacyAdapter/bluzelle-js';
import {API} from "../../../src/legacyAdapter/API";
import {APIOptions} from "../../../src/legacyAdapter/API";
import {range} from 'lodash'
import {getSwarm, SINGLE_SENTRY_SWARM} from "testing/lib/helpers/swarmHelpers";
import {browserProxy} from "./browserProxy";
import {pythonProxy} from "./pythonProxy";
import {rubyProxy} from "./rubyProxy";
import {goProxy} from "./goProxy";
import {localChain} from "../../config"
import {mnemonicToAddress, SDK} from "../../../src/client-lib/rpc"

export const DEFAULT_TIMEOUT = 800000;
import axios from 'axios'
import delay from "delay";
import {javaProxy} from "./javaProxy";
import {phpProxy} from "./phpProxy";
import {remoteProxy} from "./remoteProxy";
import {cSharpProxy} from "./cSharpProxy";
import {extend} from 'lodash'
import {GasInfo} from '../../../../../sdk/ts/src/legacyAdapter/types/GasInfo'
import {Some} from "monet";
import {newMnemonic} from "../../../src/bz-sdk/bz-sdk";
import {types} from "util";
import {Lease} from "../../../src/codec/crud/lease";

// Allow self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


export type APIAndSwarm = API & { swarm?: Swarm };

const useLocalClient = (): API | undefined => {
    return bluzelle({
        mnemonic: localChain.mnemonic,
        url: localChain.endpoint,
        gasPrice: 0.002,
        maxGas: 300000,
        uuid: Date.now().toString()
    })
}


export const sentryWithClient = async (extra: Partial<APIOptions> = {}, sdk: boolean = false): Promise<APIAndSwarm> => {

    if (useLocalClient()) {
        return Promise.resolve(useLocalClient()) as Promise<APIAndSwarm>
    }

    if (getServerToUse() === 'testnet') {
        const config: APIOptions = {

            mnemonic: "auction resemble there doll room uncle since gloom unfold service ghost beach cargo loyal govern orient book shrug heavy kit coil truly describe narrow",
            url: "http://client.sentry.testnet.public.bluzelle.com:1317",
            gasPrice: 0.002,
            maxGas: 300000,
            uuid: Date.now().toString()

        }
        return bluzelle(config)
    }

    if (getBluzelleClient() === 'remote') {
        const config: APIOptions = {

            mnemonic: "auction resemble there doll room uncle since gloom unfold service ghost beach cargo loyal govern orient book shrug heavy kit coil truly describe narrow",
            url: "http://client.sentry.testnet.public.bluzelle.com:1317",
            gasPrice: 0.002,
            maxGas: 300000,
            uuid: Date.now().toString()

        }
        return await remoteProxy(bluzelle(config))
    } else {
        const swarm: Swarm = await getSwarm([SINGLE_SENTRY_SWARM]);
        return extend(await getClient(swarm.getSentries()[0], swarm.getValidators()[0], extra), {swarm: swarm});
    }

};

export const getClient = async (sentry: Daemon, validator: Daemon, extra: Partial<APIOptions>): Promise<API> => {
    const auth: DaemonAuth = await validator.getAuth();

    const endpoint = ['ruby', 'python', 'go', 'java', 'php', 'c-sharp'].includes(getBluzelleClient() as string) ? `http://${await sentry.getIPAddress()}:1317` : `https://localhost:${sentry.getAdhocPort()}`;

    const vuserBz = await bluzelle({
        mnemonic: auth.mnemonic,
        url: endpoint,
        gasPrice: 0.002,
        maxGas: 300000,
        uuid: 'uuid'

    }).getClient();

    const bluzelleConfig: APIOptions = <APIOptions>{
        mnemonic: newMnemonic(),
        url: endpoint,
        gasPrice: 0.002,
        maxGas: 300000,
        uuid: 'uuid'
    };

    let bz: API = bluzelle({...bluzelleConfig, url: `https://localhost:${sentry.getAdhocPort()}`});

    // await mnemonicToAddress(bz.config.mnemonic || '')
    //     .then(address => vuserBz.transferTokensTo(address, 1000000, defaultGasParams()));

    getBluzelleClient() === 'c-sharp' && (bz = await cSharpProxy(bz, bluzelleConfig));
    getBluzelleClient() === 'php' && (bz = await phpProxy(bz, bluzelleConfig));
    getBluzelleClient() === 'java' && (bz = await javaProxy(bz, bluzelleConfig));
    getBluzelleClient() === 'python' && (bz = await pythonProxy(bz, bluzelleConfig));
    getBluzelleClient() === 'ruby' && (bz = await rubyProxy(bz, bluzelleConfig));
    getBluzelleClient() === 'go' && (bz = await goProxy(bz, bluzelleConfig));
    getBluzelleClient() === 'browser' && (bz = await browserProxy(bz, bluzelleConfig));
    getBluzelleClient() === 'js' && (bz = await bluzelleJS(bluzelleConfig));
    getBluzelleClient() === 'node' && (bz = bz);
    return bz;
};

export const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 0.004, max_gas: 100000000, ...gasInfo})

export const getBluzelleClient = (): string | undefined =>
    process.argv.find(it => it.includes('--bluzelle-client='))?.replace('--bluzelle-client=', '') || 'node';


export const getServerToUse = (): string | undefined =>
    process.argv.find(it => it.includes('--server'))?.replace('--server=', '')

export const createKeys = async (bz: API, count: number): Promise<{ keys: string[], values: string[] }> => {
    const keys = range(0, count).map(n => `key-${n}`);
    const values = range(0, count).map(n => `value-${n}`);
    //await bz.withTransaction(() => keys.map((key, idx) => bz.create(key, values[idx], defaultGasParams())));
    return {keys, values};
};

export const waitForProxyUp = (port: number) => {

    return new Promise<void>(resolve => {
        (async function loop() {
            axios.get(`https://localhost:${port}`)
                .then(() => {
                    console.log('Proxy up');
                    resolve();
                })
                .catch((e) => {
                    if (e.code) {
                        console.log('Waiting for proxy up', port);
                        delay(500).then(loop);
                    } else {
                        console.log('Proxy up');
                        resolve();
                    }
                })
        }())

    })
}

export const serializeRequests = (() => {
    let queue: Promise<any> = Promise.resolve();

    return (fn: () => Promise<any>): Promise<any> => {
        return new Promise((resolve, reject) => {
            queue = queue.then(() => fn().then(resolve).catch(reject));
        })
    }
})()

export const newBzClient = (bz: API): Promise<API> =>
    Some(bz.generateBIP39Account())
        .map(mnemonic => bluzelle({
            mnemonic,
            url: bz.config.url,
            uuid: bz.config.uuid,
            gasPrice: 0.002,
            maxGas: 300000,
        }))
        .map(async (newBz: API) => {
            await mnemonicToAddress(newBz.config.mnemonic || '')
            //.then(address => bz.transferTokensTo(address, 1000, defaultGasParams()));
            return newBz;
        })
        .join()


const LeaseGasRateDefaultValue = 1
const LeaseGasRateMaximumValue = 3
const LeaseGasRateParamB = 2.5
const LeaseGasRateParamC = 75
const LeaseGasRateParamG = 3

export const CalculateGasForLease = (lease: Lease, bytes: number): number => {
    const leaseDays = LeaseInDays(lease)
    const gasRate = leaseGasRatePerByte(leaseDays)
    return Math.round(gasRate * leaseDays * Math.max(bytes, 200000))
}
const LeaseInDays = (lease: Lease): number => {
    return (lease.days + lease.hours / 24 + lease.minutes / 60 + lease.seconds / 3600 + lease.years * 365) * 5.5
}

const leaseGasRatePerByte = (days: number) => {
    return LeaseGasRateDefaultValue + (LeaseGasRateMaximumValue - LeaseGasRateDefaultValue) /
        Math.pow(1.0 + Math.pow(days / LeaseGasRateParamC, LeaseGasRateParamB), LeaseGasRateParamG)
}

