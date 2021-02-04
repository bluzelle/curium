import {API} from "../../../../../blzjs/client";

export const deleteSources = (bz: API) =>
    listSources(bz)
        .then((sources: any) => sources.length && bz.withTransaction(() =>
                sources.map(source => deleteSource(bz, source.name))
            )
        )

const deleteSource = (bz: API, name: string): Promise<any> =>
    bz.sendMessage({
        type: 'oracle/MsgOracleDeleteSource',
        value: {
            Name: name,
            Owner: bz.address
        }
    }, {gas_price: 0.002});

export const addSource = (bz: API, name: string, url: string, property: string, owner: string) =>
    bz.sendMessage({
        type: 'oracle/MsgOracleAddSource',
        value: {
            Name: name,
            Url: url,
            Property: property,
            Owner: owner
        }
    }, {gas_price: 0.002})

export const listSources = (bz: API) => bz.abciQuery<any>( 'custom/oracle/listsources')
    .then(s => s.result)

