import {bluzelle} from "../../../../../blzjs/client";
import {memoize} from 'lodash'

export const getBzClient = memoize(() =>
    bluzelle({
        mnemonic: 'bone soup garage safe hotel remove rebuild tumble usage marriage skin opinion banana scene focus obtain very soap vocal print symptom winter update hundred',
        endpoint: 'http://localhost:1317',
        uuid: 'uuid'
    })
);
