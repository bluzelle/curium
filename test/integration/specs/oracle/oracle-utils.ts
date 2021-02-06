import {API} from "../../../../../blzjs/client";

const VALCONS = 'bluzellevalcons12345'

export const deleteVotes = (bz: API) =>
    bz.sendMessage({
        type: 'oracle/MsgOracleDeleteVotes',
        value: {
            Prefix: '2',
            Owner: bz.address
        }
    }, {gas_price: 0.002})

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

export const listSources = (bz: API) => bz.abciQuery<any>('custom/oracle/listsources')
    .then(s => s.result);

export const searchVotes = (bz: API, prefix) => bz.abciQuery("/custom/oracle/searchvotes", {
    Prefix: prefix
});

export const addVote = (bz: API, vote: any) =>
    bz.abciQuery('custom/oracle/calculateVoteProofHash', {
        Valcons: VALCONS,
        Value: vote.Value
    })
        .then(hash =>
            bz.sendMessage({
                type: 'oracle/MsgOracleVoteProof',
                value: {
                    ValidatorAddr: VALCONS,
                    VoteHash: hash.result,
                    Owner: bz.address,
                    SourceName: vote.SourceName
                }
            }, {gas_price: 0.002})
        )
        .then((x) =>
            bz.sendMessage({
                type: 'oracle/MsgOracleVote',
                value: {
                    ...vote,
                    Valcons: VALCONS,
                    Owner: bz.address,
                    Batch: ""
                }
            }, {gas_price: 0.002})
        )



