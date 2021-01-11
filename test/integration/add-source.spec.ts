import {expect} from 'chai'
import {API, bluzelle} from "bluzelle";

describe('add-source functions', () => {
    let bz: API
    beforeEach(() => {
        bz = bluzelle({
            mnemonic: 'bone soup garage safe hotel remove rebuild tumble usage marriage skin opinion banana scene focus obtain very soap vocal print symptom winter update hundred',
            endpoint: 'http://localhost:1317',
            uuid: 'uuid'
        })
    })
    it('should work', () => {
        const name = `source-${Date.now()}`
        return bz.sendMessage({
            type: 'oracle/addsource',
            value: {
                Name: name,
                Url: 'my-url',
                Property: 'my-property',
                Owner: bz.address
            }
        }, {gas_price: 0.002, max_gas: 10000000})
            .then(x => x)
    })
})