import {bluzelle, BluzelleConfig} from "bluzelle";
import {memoize} from 'lodash'

export const getBzClient = memoize((config: Partial<BluzelleConfig> = {}) =>
    bluzelle({
        mnemonic: 'bone soup garage safe hotel remove rebuild tumble usage marriage skin opinion banana scene focus obtain very soap vocal print symptom winter update hundred',
        endpoint: 'http://localhost:1317',
        uuid: 'uuid',
        ...config
    })
);
