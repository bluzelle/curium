import {bluzelle, BluzelleConfig} from "bluzelle";
import {memoize} from 'lodash'

export const getBzClient = memoize((config: Partial<BluzelleConfig> = {}) =>
    bluzelle({
        mnemonic: "crater trade start fresh dance else leg other dwarf flavor talk enough interest sleep woman hotel myself diet fetch recycle remove range subject myself",
        endpoint: 'http://localhost:1317',
        uuid: 'uuid',
        ...config
    })
);
