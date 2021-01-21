import {API} from "../../../../../blzjs/client";

export const deleteSources = (bz: API) =>
    bz.abciQuery<any>( 'custom/oracle/listsources')
        .then((sources: any) => bz.withTransaction(() =>
                Promise.all(sources.result.map(source => deleteSource(bz, source.name)))
            )
        )
const deleteSource = (bz: API, name: string): Promise<any> =>
    bz.sendMessage({
        type: 'oracle/deletesource',
        value: {
            Name: name,
            Owner: bz.address
        }
    }, {gas_price: 0.002, max_gas: 10000000});