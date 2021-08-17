import {bluzelle, BluzelleConfig} from "bluzelle";
import {memoize} from 'lodash'
import {GasInfo} from "bluzelle";

export const getBzClient = memoize((config: Partial<BluzelleConfig> = {}) =>
    bluzelle({
        mnemonic: "crater trade start fresh dance else leg other dwarf flavor talk enough interest sleep woman hotel myself diet fetch recycle remove range subject myself",
        endpoint: 'http://localhost:1317',
        uuid: 'uuid',
        ...config
    })
);

export const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 10, max_gas: 100000000, ...gasInfo})

